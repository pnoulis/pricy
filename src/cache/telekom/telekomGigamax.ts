import * as Htmlparser2 from "htmlparser2/WritableStream";
import type { Writable, Readable } from "node:stream";
import Fs from "node:fs";

const RESOURCE_PATH =
  "../../../snapshots/telekom/Προγράμματα κινητής GIGAMAX _ Telekom.html";
const SKU_TARGETS = ["mtb_563", "mtb_570", "mtb_572", "mtb_573", "mtb_574"];

type TPlanMarkup = {
  raw: string;
  sku: string;
  skuTarget: number;
};

const plan: TPlanMarkup = { raw: "", sku: "", skuTarget: -1 };
const plans: TPlanMarkup[] = [];
let isWithinPlan: number = 0;

function isPlanStart(attribs: Record<string, string>) {
  return attribs.class?.startsWith("owl-item");
}

const parserPlanMarkup: Writable = new Htmlparser2.WritableStream({
  onopentag(tag: string, attribs: Record<string, string>) {
    if (!(isPlanStart(attribs) || isWithinPlan)) return;
    isWithinPlan++;
    plan.raw += `<${tag}`;
    for (const [k, v] of Object.entries(attribs)) {
      plan.raw += ` ${k}=${v}`;
      if (k !== "data-sku") continue;
      plan.sku = v;
      plan.skuTarget = SKU_TARGETS.findIndex((target) => target === v);
    }
  },
  ontext(text: string) {
    if (!isWithinPlan) return;
    plan.raw += text.trim();
  },
  onclosetag(tag: string) {
    if (!isWithinPlan) return;
    isWithinPlan--;
    plan.raw += `</${tag}>`;
    if (isWithinPlan) return;
    plans.push({ ...plan });
    plan.raw = "";
    plan.sku = "";
    plan.skuTarget = -1;
  },
});

function filterPlanMarkup() {
  const streamHTML: Readable = Fs.createReadStream(RESOURCE_PATH, {
    encoding: "utf-8",
  });
  streamHTML.pipe(parserPlanMarkup).on("finish", () => {
    console.log(plans);
  });
}

filterPlanMarkup();
