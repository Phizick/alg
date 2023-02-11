import { ElementStates } from "../types/element-states";
import {TStringArray} from "../components/string/string";


export const latterStates = (defaultIndex: number, currIndex: number, arr: number[] | string[]) => {
    let currLength = arr.length - 1;
}

export const swapArray = (arr: TStringArray[] | string[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
};
