import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stylesSortingPage from "./sortingPage.module.css";
import {RadioInput} from '../ui/radio-input/radio-input'
import {Button} from "../ui/button/button";

export const SortingPage: React.FC = () => {
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
