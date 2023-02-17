import React, {FC, FormEvent} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stylesFiboPage from "./fibonacci-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {useForm} from "../../Utils/Hooks/useForm";
import {getNumbers} from "../../Utils/Fibonacci";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {delay} from "../../Utils/Utils";
import {Circle} from "../ui/circle/circle";




export const FibonacciPage: FC = () => {
    const {values, setValues} = useForm({inputValue: '', fibArr: [], loader: false});

    const onChange = (e: FormEvent<HTMLInputElement>): void => {
        const number = e.currentTarget.value
        setValues({inputValue: number})
    };

    const getArr = async (value: number) => {
        setValues({loader: true})
        const arr = getNumbers(value)
        for (let i = 0; i <= arr.length; i++) {
            await delay(SHORT_DELAY_IN_MS)
            setValues({fibArr: arr.slice(0, i + 1)})
        }
        // setValues({loader: false})



    }

    const handleClick = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        console.log(values)
        getArr(Number(values.inputValue))
        setValues({inputValue: ''})
    }



  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={`${stylesFiboPage.container}`} onSubmit={handleClick}>
          <div className={`${stylesFiboPage.input}`}>
        <Input
            placeholder={'Введите текст'}
            extraClass={'input-style'}
            isLimitText={true}
            maxLength={11}
            type={'num'}
            max={19}
            onChange={onChange}/>
        <Button text={'Рассчитать'}
                extraClass={'button-style'}
                onClick={handleClick}
        />
          </div>
          <ul className={`${stylesFiboPage.ul}`}>
              {values.fibArr && values.fibArr.map((item: number, index: number) => {
                  return (
                      <Circle letter={`${item}`} key={index}/>
                  )
              })}
          </ul>
      </form>
    </SolutionLayout>
  );
};
