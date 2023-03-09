import {ElementStates} from "../types/element-states";


export const setCircle = (index: number, currentIndex: number, arr: string[]) => {
    let arrLength = arr.length - 1
    if (currentIndex < index || currentIndex > arrLength - index) {
        return ElementStates.Modified
    }
    if (currentIndex === index || currentIndex === arrLength - index) {
        return ElementStates.Changing
    }
    return ElementStates.Default
};

export const swapString = (arr: string[], firstIndex: number, secondIndex: number): void => {
    [arr[firstIndex], arr[secondIndex - firstIndex]] = [arr[secondIndex - firstIndex], arr[firstIndex]];
};

export const reverseStringForTest = (string: string): string[] => {
    const arr = string.split('')
    for (let i = 0; i < Math.floor(arr.length / 2); i++) {
        swapString(arr, i, arr.length - 1)
    }
    return arr
};