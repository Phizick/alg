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
}
