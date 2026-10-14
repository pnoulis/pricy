import { Transform } from "node:stream";
import type { TransformOptions, TransformCallback } from "node:stream";

export type TSearchFragment = (
  html: string,
  lookForTerminal?: boolean,
) => number;

export class FilterHTML extends Transform {
  private readonly searchFragment: TSearchFragment;
  private fragmentStart: number;
  private fragmentEnd: number;
  public fragmentCount: number;

  constructor(searchFragment: TSearchFragment, options?: TransformOptions) {
    super({ ...options });
    this.searchFragment = searchFragment;
    this.fragmentStart = -1;
    this.fragmentEnd = -1;
    this.fragmentCount = 0;
  }

  override _transform(
    chunk: Buffer | string,
    _encoding: string,
    cb: TransformCallback,
  ): void {
    try {
      const html = chunk.toString();
      if (this.fragmentStart === -1) {
        this.fragmentStart = this.searchFragment(html);
        if (this.fragmentStart !== 1) {
          this.fragmentEnd = this.searchFragment(html, true);
          if (this.fragmentEnd === -1) {
            this.push(html.slice(this.fragmentStart));
          } else {
            this.push(html.slice(this.fragmentStart, this.fragmentEnd));
            this.fragmentStart = -1;
            this.fragmentEnd = -1;
            this.fragmentCount++;
          }
        }
      } else {
        this.fragmentEnd = this.searchFragment(html, true);
        if (this.fragmentEnd !== -1) {
          this.push(html.slice(0, this.fragmentEnd));
          this.fragmentStart = -1;
          this.fragmentEnd = -1;
          this.fragmentCount++;
        }
      }
      cb();
    } catch (err) {
      cb(err as Error);
    }
  }
}
