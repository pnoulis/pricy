export interface INode {
  next: null | INode;
}

export interface ILinkedList<TNode extends INode> extends Iterable<TNode> {
  head: null | TNode;
  tail: null | TNode;
  size: number;
}

export function appendLinkedList<TNode extends INode>(
  linkedList: ILinkedList<TNode>,
  node: TNode,
): ILinkedList<TNode> {
  if (!linkedList.size) {
    linkedList.head = node;
    linkedList.tail = node;
  } else {
    (linkedList.tail as TNode).next = node;
    linkedList.tail = node;
  }
  linkedList.size++;
  return linkedList;
}

export function createLinkedList<TNode extends INode>(
  node?: TNode,
): ILinkedList<TNode> {
  const linkedList: ILinkedList<TNode> = {
    head: null,
    tail: null,
    size: 0,
    [Symbol.iterator]: function* () {
      let current = this.head;
      while (current) {
        yield current;
        current = current.next as TNode | null;
      }
    },
  };
  return node ? appendLinkedList<TNode>(linkedList, node) : linkedList;
}
