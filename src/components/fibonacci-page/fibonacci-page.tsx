import React, {  FC } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stylesStringPage from "../string/string.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {useForm} from "../../Utils/Hooks/useForm";

import { SHORT_DELAY_IN_MS } from '../../constants/delays'


export const FibonacciPage: FC = () => {
    const {values, handleChange, setValues} = useForm({inputValue: '', arr: [], loader: false});

    const delay = (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    };

    const fibonacciSequence = (n: number): number[] => {
        let arr: number[] = [1,1];
        for (let i = 2; i < n + 1; i++) {
            arr.push(arr[i - 2] + arr[i - 1]);
        }
        return arr;
    };


    // useEffect зайдет получше V

    const showCurrentSequence = async (inputValue: string) => {
        setValues({loader: true});
        await delay(SHORT_DELAY_IN_MS);
        const array = fibonacciSequence(Number(inputValue));
        for (let i = 0; i <= array.length; i++) {
            await delay(SHORT_DELAY_IN_MS);
            setValues({arr: array.slice(0,i)});
        }
        setValues({loader: false} );
        setValues({inputValue: ''});
    };

    const tookSequence = () => {
        showCurrentSequence(values).then(r => console.log(r))
    };


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
                onClick={tookSequence}
        />
      </div>
    </SolutionLayout>
  );
};
