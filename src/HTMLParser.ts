import * as Htmlparser2 from "htmlparser2";
import * as Stream from "node:stream";
import * as StringDecoder from "node:string_decoder";
import type { THTMLAttributes } from "#src/HTMLNode.ts";

export enum EHTMLTokenType {
  OPEN_TAG,
  TEXT,
  CLOSE_TAG,
}

export type THTMLTokenOpenTag = {
  type: EHTMLTokenType.OPEN_TAG;
  tag: string;
  attributes: THTMLAttributes;
};

export type THTMLTokenText = {
  type: EHTMLTokenType.TEXT;
  text: string;
};

export type THTMLTokenCloseTag = {
  type: EHTMLTokenType.CLOSE_TAG;
  tag: string;
};

export type THTMLToken =
  THTMLTokenOpenTag | THTMLTokenText | THTMLTokenCloseTag;

export class HTMLParser extends Stream.Transform {
  private readonly htmlparser2: Htmlparser2.Parser;
  private readonly decoder = new StringDecoder.StringDecoder();

  constructor() {
    super({
      readableObjectMode: true,
      readableHighWaterMark: 256,
      writableHighWaterMark: 4096,
    });
    this.htmlparser2 = new Htmlparser2.Parser({
      onopentag: (tag: string, attributes: THTMLAttributes) => {
        this.push({
          type: EHTMLTokenType.OPEN_TAG,
          tag,
          attributes,
        });
      },
      ontext: (text: string) => {
        this.push({
          type: EHTMLTokenType.TEXT,
          text,
        });
      },
      onclosetag: (tag: string) => {
        this.push({
          type: EHTMLTokenType.CLOSE_TAG,
          tag,
        });
      },
      onerror: (er: Error) => {
        this.destroy(er);
      },
    });
  }

  override _transform(
    chunk: Buffer,
    _encoding: BufferEncoding,
    cb: Stream.TransformCallback,
  ): void {
    this.htmlparser2.write(this.decoder.write(chunk));
    cb();
  }

  override _flush(cb: Stream.TransformCallback): void {
    this.htmlparser2.end(this.decoder.end());
    cb();
  }
}
