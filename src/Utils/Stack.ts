export interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    clear: () => void;
    collectedArr: () => T[];
    peak: () => number;
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];
    collectedArr = (): T[] => {
        return this.container
    };

    getSize(): number {
        return this.container.length
    };

    push = (item: T): void => {
        this.container.push(item)
    };

    pop = (): void => {
        this.container.pop()
    };

    clear = (): void => {
        this.container = []
    };

    peak = (): number => {
        return this.getSize() - 1
    };
}