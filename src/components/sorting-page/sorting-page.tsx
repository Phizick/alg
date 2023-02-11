import React, { FC } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stylesSortingPage from "./sortingPage.module.css";
import {RadioInput} from '../ui/radio-input/radio-input'
import {Button} from "../ui/button/button";
import {useForm} from "../../Utils/Hooks/useForm";

export const SortingPage: FC = () => {

    const { values, handleChange, setValues } = useForm({radioState: 'default', arr: [], loader: false});




  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${stylesSortingPage.container}`}>
          <div className={`${stylesSortingPage.radio}`}>
        <RadioInput label={'Выбор'}></RadioInput>
        <RadioInput label={'Пузырек'}></RadioInput>
          </div>
          <div className={`${stylesSortingPage.buttons}`}>
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
