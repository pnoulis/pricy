import type { ILinkedList } from "#src/LinkedList.ts";
import type { THTMLNode } from "#src/HTMLNode.ts";

export type TFlatMarkupList = ILinkedList<THTMLNode>;

export function serializeFlatMarkupList(
  flatMarkupList: TFlatMarkupList,
): string {
  let html: string = "";

  // TODO: Support markup that does not need a closing </tag>
  for (const node of flatMarkupList) {
    if (node.isEndTag) {
      html += `</${node.tag}>`;
      continue;
    }

    html += `<${node.tag}`;
    for (const [k, v] of Object.entries(node.attributes)) {
      html += ` ${k}="${v}"`;
    }
    html += ">";
  }

  return html;
}
