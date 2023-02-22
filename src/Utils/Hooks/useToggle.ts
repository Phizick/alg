import {useState, useCallback} from "react";

export const useToggle = (initialValue = false): readonly [boolean, (() => void), ((value: (((prevState: boolean) => boolean) | boolean)) => void)] => {
    const [value, setValue] = useState(initialValue)
    const toggleValue = useCallback(() => setValue(val => !val), [])
    return [value, toggleValue, setValue] as const
}