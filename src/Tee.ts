import { Transform } from "node:stream";
import Fs from "node:fs/promises";
import type {
  TransformOptions,
  TransformCallback,
  Writable,
} from "node:stream";
import type { TErrorCallback } from "#src/common.ts";

export type TTeeOptions = TransformOptions & {
  force?: boolean;
};

export class Tee extends Transform {
  private readonly force: boolean;
  private readonly path: string;
  private file: Writable | null;

  constructor(path: string, options?: TTeeOptions) {
    super({ ...options });
    this.force = options?.force ?? true;
    this.path = path;
    this.file = null;
  }

  override async _construct(cb: TErrorCallback) {
    try {
      const fh = await Fs.open(this.path, this.force ? "w" : "wx");
      this.file = fh.createWriteStream();
      this.file.on("error", (er: Error) => this.destroy(er));
      cb();
    } catch (er: unknown) {
      if ((er as NodeJS.ErrnoException).code === "EEXIST") cb();
      else cb(er as Error);
    }
  }

  override _transform(
    chunk: Buffer | string,
    _encoding: BufferEncoding,
    cb: TransformCallback,
  ): void {
    this.push(chunk);
    if (!this.file) cb();
    else if (this.file.write(chunk, _encoding)) cb();
    else this.file.once("drain", cb);
  }

  override _flush(cb: TransformCallback) {
    if (this.file) this.file.end(cb);
    else cb();
  }

  override _destroy(er: Error | null, cb: TErrorCallback) {
    if (this.file) this.file.destroy();
    cb(er);
  }
}
