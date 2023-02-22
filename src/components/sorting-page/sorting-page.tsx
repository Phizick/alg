import React, {ChangeEvent, FC} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import stylesSortingPage from "./sortingPage.module.css";
import {RadioInput} from '../ui/radio-input/radio-input'
import {Button} from "../ui/button/button";
import {useForm} from "../../Utils/Hooks/useForm";
import {Column} from "../ui/column/column";
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {delay, randomNumber} from "../../Utils/Utils";
import {TSorrtArray} from "../../types/Array";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../constants/delays";
import {swapArray} from "../../Utils/Swap";

type TSorting = {
    values: {
        radioState: string,
        arr: TSorrtArray[],
        sortingEnumeration: string | null
    },
    setValues: (arg: any) => void
}


export const SortingPage: FC = () => {

    const { values, setValues }: TSorting = useForm({
        radioState: 'default',
        arr: null,
        sortingEnumeration: null
    });

    const minLength = 3;
    const maxLength = 17;

    const getRandomArr = (min: number, max: number, minLen = minLength, maxLen = maxLength): TSorrtArray[] => {
        const arrLength = randomNumber(minLen, maxLen)
        const randomArr: TSorrtArray[] = []
        for (let i = 0; i <= arrLength; i++) {
            randomArr.push({
                item: randomNumber(min, max),
                state: ElementStates.Default
                })
        }
        return randomArr
    };

    const setNewRandomArr = (): void => {
        setValues({arr: getRandomArr(0, 100)})
    };

    const handleRadio = (e: ChangeEvent<HTMLInputElement>): void => {
        setValues({radioState: e.target.value})
    };

    const selectionSorting = async (arr: TSorrtArray[], direction: boolean) => {
        for (let i = 0; i < arr.length; i++) {
            let maxIndex = i
            arr[maxIndex].state = ElementStates.Changing;
            for (let p = i + 1; p < arr.length; p++) {
                arr[p].state = ElementStates.Changing
                setValues({arr: [...arr]})
                await delay(SHORT_DELAY_IN_MS)
                if (direction ? arr[p].item < arr[maxIndex].item : arr[p].item > arr[maxIndex].item) {
                    maxIndex = p
                    arr[p].state = ElementStates.Changing
                    arr[maxIndex].state = p === maxIndex ? ElementStates.Changing : ElementStates.Default
                }
                if (p !== maxIndex) {
                    arr[p].state = ElementStates.Default
                }
                setValues({arr: [...arr]})
            }
            swapArray(arr, maxIndex, i)
            arr[maxIndex].state = ElementStates.Default
            arr[i].state = ElementStates.Modified
            setValues({arr: [...arr]})
        }
        return arr
    };

    const bubbleSotring = async (arr: TSorrtArray[], direction: boolean): Promise<TSorrtArray[]> => {
        console.log(arr)
        for (let i = 0; i < arr.length; i++) {
            for (let p = 0; p < arr.length - i - 1; p++) {
                const rightItem = arr[p + 1].item
                const leftItem = arr[p].item
                arr[p].state = ElementStates.Changing
                arr[p + 1].state = ElementStates.Changing
                setValues({arr: [...arr]})
                await delay(SHORT_DELAY_IN_MS)
                if (direction ? leftItem > rightItem : leftItem < rightItem) {
                    arr[p].item = rightItem
                    arr[p + 1].item = leftItem
                }
                arr[p].state = ElementStates.Default
                arr[p + 1] && (arr[p + 1].state = ElementStates.Default)
                setValues({arr:[...arr]})
            }
            arr[arr.length - i - 1].state = ElementStates.Modified
            setValues({arr:[...arr]})
        }
        return arr
    };

    const startSorting = async (direction: string) => {
        const match = direction === 'Direction.Ascending';
        if (values.radioState === 'default') {
            setValues({arr: [...await selectionSorting(values.arr, match)]})
        } else {
            setValues({arr:[...await bubbleSotring(values.arr, match)]})
        }
    }



  return (
    <SolutionLayout title="Сортировка массива">
      <form className={`${stylesSortingPage.container}`}>
          <div className={`${stylesSortingPage.radio}`}>
        <RadioInput
            label={'Выбор'}
            value={'default'}
            defaultChecked
            onChange={handleRadio}
        />
        <RadioInput
            label={'Пузырек'}
            value={'bubble'}
            onChange={handleRadio}
        />
          </div>
          <div className={`${stylesSortingPage.buttons}`}>
        <Button text={'По возрастанию'}
                extraClass={'button-style'}
        onClick={() => startSorting('Direction.Ascending')}
                sorting={Direction.Ascending}
        />
        <Button text={'По убыванию'}
                extraClass={'button-style'}
                onClick={() => startSorting('Direction.Descending')}
                sorting={Direction.Descending}
        />
          </div>
      <Button text={'Новый массив'}
              extraClass={'button-style'}
              onClick={setNewRandomArr}

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
