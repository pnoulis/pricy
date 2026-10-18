import Fs from "node:fs";
import type { Readable } from "node:stream";
import Path from "node:path";
import { FilterHTML, extractFragmentMain } from "#src/FilterHTML.ts";
import { Tee } from "#src/Tee.ts";
import { HTMLParser } from "#src/HTMLParser.ts";
import { THTMLToken, EHTMLTokenType } from "#src/HTMLParser.ts";
import { appendLinkedList, createLinkedList } from "#src/LinkedList.ts";
import type { ILinkedList } from "#src/LinkedList.ts";
import { createHTMLNode } from "#src/HTMLNode.ts";
import type { THTMLNode } from "#src/HTMLNode.ts";
import { assertNever } from "#src/common.ts";

declare const __CACHEDIR__: string;

const RESOURCE_PATH =
  "../snapshots/telekom/Προγράμματα κινητής GIGAMAX _ Telekom.html";
// const RESOURCE_PATH = "../snapshots/telekom/sample-telekomGigamax.html";

// export const SKU_TARGETS = [
//   "mtb_563",
//   "mtb_570",
//   "mtb_572",
//   "mtb_573",
//   "mtb_574",
// ];

// export type TPlanMarkup = {
//   raw: string;
//   sku: string;
//   skuTarget: number;
//   tree: ILinkedList<THTMLNode>;
// };

const htmlStream: Readable = Fs.createReadStream(RESOURCE_PATH, {
  encoding: "utf8",
});

const path = Path.join(__CACHEDIR__, "telekoGigamax-main.html");

const extractMain = new FilterHTML(extractFragmentMain);

const cacheFragment = new Tee(path, { force: false });

const tokenizeHTML = new HTMLParser();

let token: THTMLToken | null;
const stack: THTMLNode[] = [];
const plans: ILinkedList<THTMLNode>[] = [];
let currentNode: THTMLNode;
let currentPlan: ILinkedList<THTMLNode>;

function isPlanStart(attribs: Record<string, string>) {
  return attribs.class?.startsWith("owl-item");
}

function isWithinPlan() {
  return stack.length > 0;
}

htmlStream
  .pipe(extractMain)
  .pipe(cacheFragment)
  .pipe(tokenizeHTML)
  .on("readable", () => {
    while ((token = tokenizeHTML.read())) {
      switch (token.type) {
        case EHTMLTokenType.OPEN_TAG:
          if (isPlanStart(token.attributes) && !isWithinPlan()) {
            currentNode = createHTMLNode(token.tag, token.attributes);
            currentPlan = createLinkedList(currentNode);
            plans.push(currentPlan);
            stack.push(currentNode);
          } else if (isWithinPlan()) {
            currentNode = createHTMLNode(token.tag, token.attributes);
            appendLinkedList(currentPlan, currentNode);
            stack.push(currentNode);
          }
          break;
        case EHTMLTokenType.TEXT:
          if (isWithinPlan()) {
            currentNode.text = token.text.trim();
          }
          break;
        case EHTMLTokenType.CLOSE_TAG:
          if (isWithinPlan()) {
            appendLinkedList(
              currentPlan,
              createHTMLNode(stack.pop()!.tag, null, "", true),
            );
          }
          break;
        default:
          assertNever(token);
      }
    }
  })
  .on("end", () => {
    for (const node of plans[0]!) {
      console.log(node);
    }
  });
