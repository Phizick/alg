import React, { FC, useRef } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stylesStringPage from "./stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Stack} from "../../Utils/Stack";
import {useForm} from "../../Utils/Hooks/useForm";

type TValues = {
    values: {
        inputValue: string
        stackArr: []
        currentIndex: number
        isLoader: boolean
        add: boolean
        delete: boolean
        clear: boolean
    }
    setValues: () => void
}


export const StackPage: FC = () => {

    const { values, setValues }: TValues = useForm({
        inputValue: null,
        stackArr: null,
        currentIndex: null,
        isLoader: false,
        add: false,
        delete: false,
        clear: false
    })

    const stack = useRef<Stack<string>>(new Stack());










  return (
    <SolutionLayout title="Стек">
      <div className={`${stylesStringPage.container}`}>
        <div className={`${stylesStringPage.buttons}`}>
        <Input
            placeholder={'Введите текст'}
            extraClass={'input-style'}
            isLimitText={true}
            maxLength={11}
            type={'text'}
            />
        <Button text={'Добавить'}
                extraClass={'button-style'}/>
        <Button text={'Удалить'}
                extraClass={'button-style'}/>
        </div>
        <Button text={'Очистить'}
                extraClass={'button-style'}/>
      </div>
    </SolutionLayout>
  );
};
