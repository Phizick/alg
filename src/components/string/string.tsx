import React, {FC, FormEvent} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import stylesStringPage from './string.module.css'
import {useForm} from "../../Utils/Hooks/useForm";
import {ElementStates} from "../../types/element-states";
import {swapArray} from "../../Utils/String";
import {Circle} from "../ui/circle/circle";
import {delay} from "../../Utils/Utils";
import {DELAY_IN_MS} from "../../constants/delays";


export type TStringArray = {
    state: ElementStates;
    item?: string | number
}

export const StringComponent: FC = () => {
    const { values, setValues } = useForm({inputLetters: '', loader: false, currentIndex: null, reversedArr: []});

    const changeValue = (e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value
        setValues({inputLetters: value})
    };

    const reverseLetters = async (arr: TStringArray[]) => {
        setValues({loader: true});
        const arrMid = Math.ceil( arr?.length / 2);
        for (let i = 0; i < arrMid; i++) {
            let p = arr?.length - 1 - i
            if (arr?.length === 1) {
                arr[i].state = ElementStates.Modified
            } else if (i < p) {
                arr[i].state = ElementStates.Changing;
                arr[p].state = ElementStates.Changing;
                setValues({reversedArr: [...arr]});
                swapArray(arr, i, p)
                await delay(DELAY_IN_MS)
            }
            arr[i].state = ElementStates.Modified;
            arr[p].state = ElementStates.Modified;
            setValues({reversedArr: [...arr]});
            await delay(DELAY_IN_MS)
        }
        setValues({loader: false});
    };

    const formedArr = values.inputLetters?.split('').map((item: any) => ({ item, state: ElementStates.Default}))

    const getReverse = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        reverseLetters(formedArr);
        setValues({inputLetters: ''})
    };

        // console.log(values)

  return (
    <SolutionLayout title="Строка">
        <form onSubmit={getReverse} className={`${stylesStringPage.form}`}>
        <div className={`${stylesStringPage.container}`}>
      <Input
          placeholder={'Введите текст'}
          extraClass={'input-style'}
          isLimitText={true}
          maxLength={11}
      onChange={changeValue}/>
      <Button text={'Развернуть'}
              extraClass={'button-style'}
              onClick={getReverse}
      />
        </div>
            <ul className={`${stylesStringPage.ul}`}>
                { values.reversedArr &&
                    values.reversedArr?.map((item: any, index: number) => {
                        return (
                            <li className={`${stylesStringPage.li}`} key={index}>
                                <Circle letter={item.item} state={item.state} data-testid={'circle'}/>
                            </li>
                        )
                    })
                }

            </ul>
        </form>
    </SolutionLayout>
  );
};
