import React, {ChangeEvent, FC} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stylesSortingPage from "./sortingPage.module.css";
import {RadioInput} from '../ui/radio-input/radio-input'
import {Button} from "../ui/button/button";
import {useForm} from "../../Utils/Hooks/useForm";
import {Column} from "../ui/column/column";
import {randomArray} from "../../Utils/Sorting";

export const SortingPage: FC = () => {

    const { values, handleChange, setValues } = useForm({radioState: null, arr: [], loader: false, isRadio: false});

    const handleRadio = (e: ChangeEvent<HTMLInputElement>): void => {
        setValues({radioState: e.target.value})
        // e.target.value === 'default' ? setValues({isRadio: true}) : setValues({isRadio: false})
        console.log(e.target.value)
    };






  return (
    <SolutionLayout title="Сортировка массива">
      <form className={`${stylesSortingPage.container}`}>
          <div className={`${stylesSortingPage.radio}`}>
        <RadioInput
            label={'Выбор'}
            value={'default'}
            checked={values.radioState === 'default'}
            onChange={handleRadio}
        />
        <RadioInput
            label={'Пузырек'}
            value={'bubble'}
            onChange={handleRadio}
            checked={values.radioState === 'bubble'}
        />
          </div>
          <div className={`${stylesSortingPage.buttons}`}>
        <Button text={'Добавить'}
                extraClass={'button-style'}/>
        <Button text={'Удалить'}
                extraClass={'button-style'}/>
          </div>
      <Button text={'Очистить'}
              extraClass={'button-style'}/>
    </form>
        <ul className={`${stylesSortingPage.columns}`}>
            <Column index={85}></Column>
        </ul>
    </SolutionLayout>
  );
};
