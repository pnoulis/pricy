import * as Htmlparser2 from "htmlparser2/WritableStream";
import type { Writable, Readable } from "node:stream";
import Fs from "node:fs";

const RESOURCE_PATH = "../../../snapshots/telekom/Προγράμματα κινητής GIGAMAX _ Telekom.html";

const parserStream: Writable = new Htmlparser2.WritableStream({
  onopentag(name: string, attribs: Record<string, string>) {
    console.log(name);
  },
  ontext(text: string) {},
  onclosetag(tagname: string) {},
});

function filterRawHTML() {
  const rawHtmlStream: Readable = Fs.createReadStream(RESOURCE_PATH, { encoding: "utf-8" });
  rawHtmlStream.pipe(parserStream).on("finish", () => console.log("finished"));
}

filterRawHTML();
