import { INode } from "#src/LinkedList.ts";

export type THTMLNode = INode & {
  tag: string;
  attributes: Record<string, string>;
  text: string;
};

export function createHTMLNode(
  tag?: string,
  attributes?: Record<string, string>,
  text?: string,
): THTMLNode {
  return {
    tag: tag || "",
    attributes: attributes || {},
    text: text || "",
    next: null,
  };
}
