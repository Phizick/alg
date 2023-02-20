
export const initialArr = ['0', '34', '8', '1'];

interface IList<T> {
    append: (item: T) => void;
    prepend: (item: T) => void;
    clearHead: () => void;
    clearTail: () => void;
    addedIndex: (item: T, pos: number) => void;
    deletedIndex: (pos: number) => void;
    collectedArr: () => void;
}

export class Node<T> {
    value: T
    next: Node<T>
    constructor(value: T, next: Node<T>) {
        this.value = value;
        this.next = (next)
    }
}

export class List<T> implements IList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    length: number;
    constructor(initialArr: T[]) {
        this.head = null;
        this.tail = null;
        this.length = 0
        initialArr.forEach(item => this.append(item))
    }

    append(item: T): void {
        const node = new Node(item)
}
}
