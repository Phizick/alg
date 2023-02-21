import React, {FC, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stylesFiboPage from "./fibonacci-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {useForm} from "../../Utils/Hooks/useForm";
import {getNumbers} from "../../Utils/Fibonacci";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {delay} from "../../Utils/Utils";
import {Circle} from "../ui/circle/circle";

type TFibValues = {
    values: {
        inputValue: number,
        fibArr: number[],
        loader: boolean
    },
    setValues: any
};

export const FibonacciPage: FC = () => {
    const {values, setValues}: TFibValues = useForm({inputValue: null, fibArr: [], loader: false });

    const onChange = (e: FormEvent<HTMLInputElement>): void => {
        setValues({inputValue: e.currentTarget.value})
    };

    const limitedInputValues = !(1 <= values.inputValue && values.inputValue <= 19)

    const getArr = async (value: number) => {
        const arr = getNumbers(value)
        for (let i = 0; i <= arr.length; i++) {
            await delay(SHORT_DELAY_IN_MS)
            setValues({fibArr: arr.slice(0, i + 1), loader: true})
        }
        setValues({inputValue: null, loader: false})
    }

    const handleClick = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        getArr(values.inputValue)
        setValues({inputValue: null})
    }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={`${stylesFiboPage.container}`} onSubmit={handleClick}>
          <div className={`${stylesFiboPage.input}`}>
        <Input
            placeholder={'Введите число'}
            isLimitText={true}
            maxLength={11}
            type={'num'}
            max={19}
            onChange={onChange}
        value={values.inputValue || ''}

        />
        <Button text={'Рассчитать'}
                extraClass={'button-style'}
                onClick={handleClick}
                isLoader={values.loader}
                disabled={limitedInputValues}

        />
          </div>
          <ul className={`${stylesFiboPage.ul}`}>
              {values.fibArr && values.fibArr.map((item ,index: number) => {
                  return (
                      <Circle letter={`${item}`} key={index}/>
                  )
              })}
          </ul>
      </form>
    </SolutionLayout>
  );
};
