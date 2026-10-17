import Fs from "node:fs";
import type { Readable } from "node:stream";
import Path from "node:path";
import { FilterHTML, extractFragmentMain } from "#src/FilterHTML.ts";
import { Tee } from "#src/Tee.ts";

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

const teeFragment = new Tee(path, { force: false });

htmlStream
  .pipe(extractMain)
  .pipe(teeFragment)
  .on("data", (chunk) => {
    console.log(chunk.toString());
  });

// filter.on("finish", () => {
//   console.log("completely done");
//   console.log(filter.fragmentCount);
// });

// (async () => {
//   for await (const chunk of filter) {
//     console.log(chunk.toString());
//   }
// })();

// // extractPlanMarkup(markupStream, (plans: ILinkedList<THTMLNode>[]) => {
// //   // for (const node of plans[0]!) console.log(node);
// //   // console.log(plans);
// //   console.log(serializeMarkup(plans[0]!));
// //   // for (const node of plans[0]!) {
// //   //   console.log(node);
// //   // }
// // });

// // // // Orchestrator function (entry point)
// // // function compilePlan(plan: TBasePlan) {
// // // }
