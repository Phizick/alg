import {useState, useCallback} from "react";


export const useToggle = (initialValue = false): any => {

    const [value, setValue] = useState(initialValue)
    const toggleValue = useCallback(() => setValue(val => !val), [])
    return [value, toggleValue, setValue] as const
}