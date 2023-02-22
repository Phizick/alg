import {TArray} from "../types/Array";

export const swapArray = (arr: TArray[] | string[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};
