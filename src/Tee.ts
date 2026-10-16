import { Transform } from "node:stream";
import Fs from "node:fs";
import type {
  TransformOptions,
  TransformCallback,
  Writable,
} from "node:stream";

export class Tee extends Transform {
  private readonly outputFile: Writable;

  constructor(path: string, options?: TransformOptions) {
    super({ ...options });
    this.outputFile = Fs.createWriteStream(path);
    this.outputFile.on("error", (err) => this.destroy(err));
  }

  override _transform(
    chunk: Buffer | string,
    _encoding: BufferEncoding,
    cb: TransformCallback,
  ): void {
    this.push(chunk);
    if (this.outputFile.write(chunk, _encoding)) cb();
    else this.outputFile.on("drain", cb);
  }

  override _flush(cb: TransformCallback) {
    this.outputFile.end(cb);
  }
}
