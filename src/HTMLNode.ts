import { INode } from "#src/LinkedList.ts";

export type THTMLAttributes = Record<string, string>;

export type THTMLNode = INode & {
  tag: string;
  attributes: THTMLAttributes;
  text: string;
  isEndTag: boolean;
};

export function createHTMLNode(
  tag?: string,
  attributes?: Record<string, string> | null,
  text?: string,
  isEndTag?: boolean,
): THTMLNode {
  return Object.defineProperties(
    {},
    {
      tag: { value: tag || "", writable: true, enumerable: true },
      attributes: {
        value: attributes || {},
        writable: true,
        enumerable: true,
      },
      text: { value: text || "", writable: true, enumerable: true },
      isEndTag: { value: isEndTag || false, writable: true, enumerable: true },
      next: { value: null, writable: true, enumerable: false },
    },
  ) as THTMLNode;
}
