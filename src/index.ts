import Fs from "node:fs";
import type { Readable } from "node:stream";
import { extractPlanMarkup } from "#src/cache/telekom/telekomGigamax.ts";
import { telekomGigamax } from "#src/providers/telekom.ts";
import type { ILinkedList } from "#src/LinkedList.ts";
import type { THTMLNode } from "#src/HTMLNode.ts";

const RESOURCE_PATH =
  "../snapshots/telekom/Προγράμματα κινητής GIGAMAX _ Telekom.html";

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

const markupStream: Readable = Fs.createReadStream(RESOURCE_PATH, {
  encoding: "utf-8",
});

extractPlanMarkup(markupStream, (plans: ILinkedList<THTMLNode>[]) => {
  for (const node of plans[0]!) {
    console.log(node.text);
  }
});

// // Orchestrator function (entry point)
// function compilePlan(plan: TBasePlan) {
// }
