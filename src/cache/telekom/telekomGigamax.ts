import * as Htmlparser2 from "htmlparser2/WritableStream";
import type { Writable, Readable } from "node:stream";
import { appendLinkedList, createLinkedList } from "#src/LinkedList.ts";
import type { ILinkedList } from "#src/LinkedList.ts";
import { createHTMLNode } from "#src/HTMLNode.ts";
import type { THTMLNode } from "#src/HTMLNode.ts";

const stack: THTMLNode[] = [];
const plans: ILinkedList<THTMLNode>[] = [];
let currentNode: THTMLNode;
let currentPlan: ILinkedList<THTMLNode>;

function isPlanStart(attribs: Record<string, string>) {
  return attribs.class?.startsWith("owl-item");
}

const planMarkupExtractor: Writable = new Htmlparser2.WritableStream({
  onopentag(name: string, attributes: Record<string, string>) {
    if (isPlanStart(attributes) && !stack.length) {
      currentNode = createHTMLNode(name, attributes);
      currentPlan = createLinkedList(currentNode);
      plans.push(currentPlan);
      stack.push(currentNode);
    } else if (stack.length) {
      currentNode = createHTMLNode(name, attributes);
      appendLinkedList(currentPlan, currentNode);
      stack.push(currentNode);
      if (isPlanStart(attributes)) {
        // TODO: Warn of nested plans
      }
    }
  },
  ontext(text: string) {
    if (!stack.length) return;
    currentNode.text += text.trim();
  },
  onclosetag() {
    if (!stack.length) return;
    stack.pop();
  },
});

export function extractPlanMarkup(
  markupStream: Readable,
  cb: (plans: ILinkedList<THTMLNode>[]) => void,
) {
  markupStream.pipe(planMarkupExtractor).on("finish", () => cb(plans));
}
