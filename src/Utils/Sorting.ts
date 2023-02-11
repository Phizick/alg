import { randomNumber } from "./Utils";
import {TStringArray} from "../components/string/string";
import {ElementStates} from "../types/element-states";

export const randomArray = (): TStringArray[] => {
    let arr: TStringArray[] = [];
    const minLen = 3;
    const maxLen = 17;
    let length = randomNumber(minLen, maxLen);
    for (let i = 0; i < length; i++) {
        arr.push({ item: randomNumber(0, 100), state: ElementStates.Default });
    }
    return arr;
};