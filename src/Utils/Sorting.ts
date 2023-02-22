import {TSorrtArray} from "../types/Array";
import {swapArray} from "./Swap";

export const selectSort = (arr: TSorrtArray[]) => {
    for (let i = 0; i < arr.length; i++) {
        let maxIndex = i;
        for (let p = i + 1; p < arr.length; p++) {
                arr[maxIndex].item < arr[p].item && (maxIndex = p)
            }
        maxIndex !== i && swapArray(arr, i, maxIndex)
        }
    return arr
};

export const bubbleSort = (arr: TSorrtArray[]) => {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            const rightItem = arr[j + 1].item
            const leftItem = arr[j].item
            if (leftItem < rightItem) {
                arr[j].item = rightItem;
                arr[j + 1].item = leftItem
            }
        }
    }
    return arr
}