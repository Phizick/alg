export interface IStack<T> {
    push: any;
    pop: () => void;
    clear: () => void;
    collectedArr: () => T[];
    peak: () => number;
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];
    collectedArr = (): T[] => this.container


    get size(): number {
        return this.container.length
    }

    push = (item: T): void => {
        this.container.push(item)
        console.log(this.container)
    };

    pop = (): void => {
        this.container.pop()
    };

    clear = (): void => {
        this.container = []
    };

    peak = (): number => {
        return this.size - 1
    }
}