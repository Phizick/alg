import React, {ChangeEvent, FC, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import stylesSortingPage from "./sortingPage.module.css";
import {RadioInput} from '../ui/radio-input/radio-input'
import {Button} from "../ui/button/button";
import {useForm} from "../../Utils/Hooks/useForm";
import {Column} from "../ui/column/column";
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {delay} from "../../Utils/Utils";
import {DELAY_IN_MS} from "../../constants/delays";
import {swapArray} from "../../Utils/String";
import {randomArray} from "../../Utils/Sorting";

export type TSortingArray = {
    state: ElementStates;
    item: number;
}


export const SortingPage: FC = () => {

    const { values, handleChange, setValues } = useForm({radioState: 'default', arr: null, loader: false, sortingEnumeration: null});


    const handleRadio = (e: any) => {
        setValues({radioState: e.target.value})
        console.log(values.radioState)
    };

    const selectionSort = async (arr: TSortingArray[], sortingEvnt: Direction) => {
        console.log(1)
        setValues({loader: true})
        for (let i = 0; i < arr?.length; i++) {
            let index = i;
            for (let p = i +1; p < arr?.length; p++) {
                arr[i].state = ElementStates.Changing;
                arr[p].state = ElementStates.Changing;
                setValues({arr: [...arr]});
                await delay(DELAY_IN_MS);
                if (sortingEvnt === Direction.Ascending) {
                    if (arr[p].item > arr[index].item) {
                        index = p;
                        swapArray(arr, p, index);
                        setValues({arr:[...arr]})
                    }
                }
                if (sortingEvnt === Direction.Descending) {
                    if (arr[p].state > arr[index].state) {
                        index = p;
                        swapArray(arr, p, index)
                        setValues({arr: [...arr]})
                    }
                }
                arr[i].state = ElementStates.Default;
                arr[p].state = ElementStates.Default;
                setValues({arr: [...arr]})
            }
            arr[index].state = ElementStates.Modified;
            swapArray(arr, i, index);
            setValues({arr:[...arr]})
        }
        setValues({loader: false})

    }

    const bubbleSort = async (arr: TSortingArray[], sortingEvnt: Direction) => {
        console.log(2)
        setValues({loader: true})
        for (let i = 0; i < arr?.length; i++) {
            for (let p = 0; p < arr?.length - i - 1; p++) {
                arr[p].state = ElementStates.Changing;
                arr[p + 1].state = ElementStates.Changing;
                setValues({arr: [...arr]});
                await delay(DELAY_IN_MS);
                if (sortingEvnt === Direction.Ascending) {
                    if (arr[p].item > arr[p + 1].item) {
                        swapArray(arr, p, p + 1);
                    }
                }
                if (sortingEvnt === Direction.Descending) {
                    if (arr[p].state > arr[p + 1].state) {
                        swapArray(arr, p, p + 1)
                    }
                }
                arr[p].state = ElementStates.Default;
                arr[p + 1].state = ElementStates.Default;
                setValues({arr: [...arr]})
            }
            arr[arr.length - i - 1].state = ElementStates.Modified;
            setValues({arr:[...arr]})
        }
        setValues({arr:[...arr]})
        setValues({loader: false})
    };

    const startingSort = (sorting: Direction) => {
        setValues({sortingEnumeration: sorting})
        console.log(values.radioState)
        values.radioState === 'bubble' ? selectionSort(values.arr, sorting) : bubbleSort(values.arr, sorting)
    }

    const getRandomArr = () => {
        setValues({arr: randomArray() })
    }


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
        <Button text={'По возрастанию'}
                extraClass={'button-style'}
        onClick={() => startingSort(Direction.Ascending)}
        />
        <Button text={'По убыванию'}
                extraClass={'button-style'}
                onClick={() => startingSort(Direction.Descending)}
        />
          </div>
      <Button text={'Новый массив'}
              extraClass={'button-style'}
              onClick={getRandomArr}

      />
    </form>
        <ul className={`${stylesSortingPage.columns}`}>
            { values.arr?.map((item: any, index: number) => {
                    return (
                        <li className={`${stylesSortingPage.li}`} key={index}>
                            <Column index={item.item} state={item.state}/>
                        </li>

                    )
                })}

        </ul>
    </SolutionLayout>
  );
};
