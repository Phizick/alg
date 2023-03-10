import {TSorrtArray} from "../types/Array";
import {swapArray} from "./Swap";

export const testingSelectionSort = (arr: TSorrtArray[]) => {
    for (let i = 0; i < arr.length; i++) {
        let maxIndex = i;
        for (let p = i + 1; p < arr.length; p++) {
            arr[maxIndex].item < arr[p].item && (maxIndex = p)
        }
        maxIndex !== i && swapArray(arr, i, maxIndex)
    }
    return arr
};

export const testingBubbleSort = (arr: TSorrtArray[]) => {
    for (let i = 0; i < arr.length; i++) {
        for (let p = 0; p < arr.length - i - 1; p++) {
            const rightItem = arr[p + 1].item
            const leftItem = arr[p].item
            if(leftItem < rightItem) {
                arr[p].item = rightItem;
                arr[p + 1].item = leftItem;
            }
        }
    }
    return arr
};