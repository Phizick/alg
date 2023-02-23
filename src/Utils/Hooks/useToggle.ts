import {useState, useCallback} from "react";

type TToggle = readonly [
    boolean,
    (() => void),
    ((value: (((prevState: boolean) => boolean) | boolean)) => void)
]

export const useToggle = (initialValue = false): TToggle => {
    const [value, setValue] = useState(initialValue)
    const toggleValue = useCallback(() => setValue(val => !val), [])
    return [value, toggleValue, setValue] as const
}