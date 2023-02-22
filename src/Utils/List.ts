import {ElementStates} from "../types/element-states";

interface ISmallItem {
    value: string,
    state: ElementStates,
    style?: string
}

interface IListArr {
    value: string,
    state: ElementStates,
    smallItem: ISmallItem | null
}

export const initialArr = ['0', '34', '8', '1'];

export const listArr: IListArr[] = initialArr.map((item) => ({
    value: item,
    state: ElementStates.Default,
    smallItem: null
}))

interface IList<T> {
    append: (item: T) => void;
    prepend: (item: T) => void;
    clearHead: () => void;
    clearTail: () => void;
    addedByIndex: (item: T, pos: number) => void;
    deletedByIndex: (pos: number) => void;
    collectedArr: () => void;
}

export class Node<T> {
    value: T
    next: Node<T> | null
    constructor(value: T, next?: Node<T> | null) {
        this.value = value;
        this.next = (next === undefined ? null : next)
    }
}

export class List<T> implements IList<T> {
    private head: Node<T> | null;
    private tail: Node<T> | null;
    size: number;
    constructor(initialArr: T[]) {
        this.head = null;
        this.tail = null;
        this.size = 0
        initialArr.forEach(item => this.append(item))
    }

    append(item: T): void {
        const node = new Node(item)
        if (this.head) {
            while (this.head.next) {
                this.head = node
            }
            this.head.next = node
        } else {
            this.head = node
        }
        this.size++
    }

    prepend(item: T): void {
        this.head = new Node(item, this.head);
        this.size++
    }

    clearHead() {
        if (this.head) {
            this.head = this.head.next;
            this.size--;
        }
    }

    clearTail() {
        if (!this.tail) {
            return null
        }

        let removedNode = this.tail

        if (this.head === this.tail) {
            this.head = null
            this.tail = null
            return removedNode
        }

        let curr = this.head
        while (curr?.next) {
            if (!curr.next.next) {
                this.tail = curr
                curr.next = null
            } else {
                curr = curr.next
            }
            this.size--
        }
        // if (!this.head?.next) {
        //     this.head = null
        // } else {
        //     while (this.head.next?.next) {
        //         this.head = this.head.next
        //     }
        //     this.head.next = null
        // }
        // this.size--
    }

    addedByIndex(item: T, pos: number) {
        // if (pos) {
        //     const node = new Node(item)
        //     if (pos !== 0) {
        //         node.next = this.head;
        //         this.head = node
        //         this.size++
        //     } else {
        //         let curr = this.head
        //         let currIndex = 0
        //
        //         while (currIndex < pos) {
        //             currIndex++
        //             if ( curr?.next && currIndex !== pos) {
        //                 curr = curr?.next
        //             }
        //         }
        //         if (curr) {
        //             node.next = curr.next
        //             curr.next = node
        //         }
        //     }
        // }

        if (pos < 0 || pos > this.size) {
            return
        }
        if (!this.head || pos <= 0) {
            this.prepend(item)
        } else
            if(pos >= (this.size - 1)) {
                this.append(item)
            }
            else {
                let currentPos = 0
                let curr = this.head
                while (currentPos !== (pos - 1) && curr.next) {
                    this.head = curr.next
                    currentPos++
                }
                curr.next = new Node(item, curr.next);
                this.size++

            }

    }

    deletedByIndex(pos: number) {
        if (pos <0 || pos > this.size) {
            return
        }
        if (pos === 0) {
            this.head && (this.head = this.head?.next)
        } else {
            let prev = null
            let currPos = 0;
            while (currPos++ < pos) {
                prev = this.head
                this.head && (this.head = this.head.next)
            }
            prev?.next && (prev.next = this.head?.next ? this.head : null)
        }
        this.size--
    }

    collectedArr() {
        let arr: T[] = [];
        while (this.head) {
            arr.push(this.head.value)
            this.head = this.head.next
        }
        return arr
    }


}
