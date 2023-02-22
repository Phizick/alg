import {useState} from "react";

export const useForm = (inputValues: any): any => {
    const [values, setValues] = useState(inputValues);
    return {values, setValues};
}