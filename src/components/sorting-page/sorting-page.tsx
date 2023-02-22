import React, {ChangeEvent, FC, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import stylesSortingPage from "./sortingPage.module.css";
import {RadioInput} from '../ui/radio-input/radio-input'
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import {Direction} from "../../types/direction";
import {ElementStates} from "../../types/element-states";
import {delay, randomNumber} from "../../Utils/Utils";
import {TSorrtArray} from "../../types/Array";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {swapArray} from "../../Utils/Swap";
import {useToggle} from "../../Utils/Hooks/useToggle";


export const SortingPage: FC = () => {

    const [arr, setArr] = useState<TSorrtArray[]>([]);
    const [radioState, setRadioState] = useState('default');
    const [loader, setLoader] = useToggle()
    const [isCheck, setCheck] = useToggle()

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
        setArr(getRandomArr(0, 100))
    };

    const handleRadio = (e: ChangeEvent<HTMLInputElement>): void => {

            setCheck()
            setRadioState(e.target.value)


    };

    const selectionSorting = async (arr: TSorrtArray[], direction: boolean) => {
        setLoader()
        for (let i = 0; i < arr.length; i++) {
            let maxIndex = i
            arr[maxIndex].state = ElementStates.Changing;
            for (let p = i + 1; p < arr.length; p++) {
                arr[p].state = ElementStates.Changing
                setArr([...arr])
                await delay(SHORT_DELAY_IN_MS)
                if (direction ? arr[p].item < arr[maxIndex].item : arr[p].item > arr[maxIndex].item) {
                    maxIndex = p
                    arr[p].state = ElementStates.Changing
                    arr[maxIndex].state = p === maxIndex ? ElementStates.Changing : ElementStates.Default
                }
                if (p !== maxIndex) {
                    arr[p].state = ElementStates.Default
                }
                setArr( [...arr])
            }
            swapArray(arr, maxIndex, i)
            arr[maxIndex].state = ElementStates.Default
            arr[i].state = ElementStates.Modified
            setArr([...arr])
        }
        setLoader()
        return arr
    };

    const bubbleSotring = async (arr: TSorrtArray[], direction: boolean) => {
        setLoader()
        for (let i = 0; i < arr.length; i++) {
            for (let p = 0; p < arr.length - i - 1; p++) {
                const rightItem = arr[p + 1].item
                const leftItem = arr[p].item
                arr[p].state = ElementStates.Changing
                arr[p + 1].state = ElementStates.Changing
                setArr([...arr])
                await delay(SHORT_DELAY_IN_MS)
                if (direction ? leftItem > rightItem : leftItem < rightItem) {
                    arr[p].item = rightItem
                    arr[p + 1].item = leftItem
                }
                arr[p].state = ElementStates.Default
                arr[p + 1] && (arr[p + 1].state = ElementStates.Default)
                setArr([...arr])
            }
            arr[arr.length - i - 1].state = ElementStates.Modified
            setArr([...arr])
        }
        setLoader()
        return arr
    };

    const startSorting = async (direction: string) => {
        const match = direction === 'Direction.Ascending';
        radioState === 'default' ? setArr([...await selectionSorting(arr, match)]) : setArr([...await bubbleSotring(arr, match)])
    };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={`${stylesSortingPage.container}`}>
          <div className={`${stylesSortingPage.radio}`}>
        <RadioInput
            label={'Выбор'}
            value={'default'}
            defaultChecked
            onChange={handleRadio}
            disabled={loader}
            checked={!isCheck}
        />
        <RadioInput
            label={'Пузырек'}
            value={'bubble'}
            onChange={handleRadio}
            disabled={loader}
            checked={isCheck}
        />
          </div>
          <div className={`${stylesSortingPage.buttons}`}>
        <Button text={'По возрастанию'}
                onClick={() => startSorting('Direction.Ascending')}
                sorting={Direction.Ascending}
                isLoader={loader}
                extraClass={`${stylesSortingPage.btn}`}
        />
        <Button text={'По убыванию'}
                onClick={() => startSorting('Direction.Descending')}
                sorting={Direction.Descending}
                isLoader={loader}
                extraClass={`${stylesSortingPage.btn}`}
        />
          </div>
      <Button text={'Новый массив'}
              onClick={setNewRandomArr}
              disabled={loader}

      />
    </div>
        <ul className={`${stylesSortingPage.columns}`}>
            { arr?.map((item, index: number) => {
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
