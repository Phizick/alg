import React, {FC, useEffect, useRef, MouseEvent} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stylesStringPage from "../string/string.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {useForm} from "../../Utils/Hooks/useForm";

import { SHORT_DELAY_IN_MS } from '../../constants/delays'


export const FibonacciPage: FC = () => {
    const {values, handleChange, setValues} = useForm({inputValue: null, arr: [], loader: false});

    const ref = useRef<ReturnType<typeof setTimeout> | undefined>();

    useEffect(() => {
        return () => {
            ref.current && clearTimeout(ref.current)
        }
    }, []);

    useEffect(() => {
        if (values.inputValue) {
            if(values.inputValue) {
                    ref.current = setTimeout(() => {
                        setValues((arr: any) => [...arr, 1]);
                    }, SHORT_DELAY_IN_MS)
                } else {
                    ref.current = setTimeout(() => {
                        setValues((arr: any) => [...arr, arr[arr.length -1] + arr[arr.length - 2]])
                    }, SHORT_DELAY_IN_MS)
                }
            }

    }, [values.arr.length, values.loader])

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        if (values.inputValue) {
            if (values.inputValue > 19) {
                console.log('to many symbols')
                setValues({inputValue: 0})
                return;
            }
        }
        setValues({loader: true})
    }

    console.log(values)








  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={`${stylesStringPage.container}`}>
        <Input
            placeholder={'Введите текст'}
            extraClass={'input-style'}
            isLimitText={true}
            maxLength={11}
            type={'num'}
            max={19}
            onChange={handleChange}/>
        <Button text={'Рассчитать'}
                extraClass={'button-style'}
                onClick={handleClick}

        />
      </div>
    </SolutionLayout>
  );
};
