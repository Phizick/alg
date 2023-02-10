import React, {MouseEvent, useEffect, useRef, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import stylesStringPage from './string.module.css'
import {useForm} from "../../Utils/Hooks/useForm";
import {ElementStates} from "../../types/element-states";
import {DELAY_IN_MS} from "../../constants/delays";
import {Circle} from "../ui/circle/circle";


export const StringComponent: React.FC = () => {
    const { values, handleChange, setValues } = useForm({inputLetters: null});
    const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const moveRef = useRef<boolean>(false);

    let arrToString: { element: string; type: ElementStates }[] = [];

    const arrayElementsReverse = (defaultArr: { element: string; type: ElementStates }[], firstElement: number, lastElement: number) => {
        if (!firstElement) {
            defaultArr[firstElement] = { ...defaultArr[firstElement], type: ElementStates.Changing};
            defaultArr[lastElement] = { ...defaultArr[lastElement], type: ElementStates.Changing};
        } else {
            defaultArr[firstElement] = { ...defaultArr[firstElement], type: ElementStates.Changing};
            defaultArr[lastElement] = { ...defaultArr[lastElement], type: ElementStates.Changing};
            let value = defaultArr[firstElement - 1].element;
            defaultArr[firstElement - 1] = { element: defaultArr[lastElement +1].element, type: ElementStates.Modified};
            defaultArr[lastElement + 1] = {  element: value, type: ElementStates.Modified};
        }
        return defaultArr
    }

    const [ reversedArr, setReverseArr ] = useState(arrToString)



    useEffect(() => {
        return () => {
            timeRef.current && clearTimeout(timeRef.current)
        }
    }, []);

    const listReverse = (arr: typeof arrToString, firstItem: number, nextItem: number) => {
        arr = arrayElementsReverse(arr, firstItem, nextItem)
        setReverseArr(() => [...arr])

        nextItem = nextItem - 1;
        firstItem = firstItem +1;

        if (nextItem + 1 >= firstItem) {
            timeRef.current = setTimeout(() => {
                listReverse(arr, firstItem, nextItem)
            }, DELAY_IN_MS)
        } else {
            timeRef.current = setTimeout(() => {
                arr = arr.map((item) => {
                    return { ...item, type: ElementStates.Modified}
                })
                setReverseArr(() => [...arr])
                moveRef.current = false
            }, DELAY_IN_MS)
        }
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        moveRef.current = true;
        let lettersArr = Array.from(values.inputLetters as string)
        let start = 0;
        let end = lettersArr.length - 1
        arrToString = lettersArr.map((item) => {
            return { element: item, type: ElementStates.Default}
        })
        setReverseArr(() => [...arrToString])
        timeRef.current = setTimeout(() => {
            listReverse([...arrToString], start, end)
        }, DELAY_IN_MS)
    }

    console.log(values.inputLetters)



  return (
    <SolutionLayout title="Строка">
        <div className={`${stylesStringPage.container}`}>
      <Input
          placeholder={'Введите текст'}
          extraClass={'input-style'}
          isLimitText={true}
          maxLength={11}
      onChange={handleChange}/>
      <Button text={'Развернуть'}
              extraClass={'button-style'}
      onClick={handleClick}/>
            <div className={`${stylesStringPage.latters}`}>
                {!!reversedArr.length
                ? reversedArr.map((item, index) => {
                    return <Circle letter={item.element} key={index} state={item.type} data-testid={'circle'}/>
                    })
                : null}
            </div>

        </div>
    </SolutionLayout>
  );
};
