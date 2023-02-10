import React, {useEffect, useRef} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import stylesStringPage from './string.module.css'
import {useForm} from "../../Utils/Hooks/useForm";
import {ElementStates} from "../../types/element-states";


export const StringComponent: React.FC = () => {
    const { values, handleChange, setValues } = useForm({inputLetters: ''});
    const timeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const moveRef = useRef<boolean>(false);

    let arrToString: { element: string; type: ElementStates }[] = [];

    const arrayElementsReverse = (defaultArr: { element: string; type: ElementStates }[], firstElement: number, lastElement: number) => {
        if (!firstElement) {
            defaultArr[firstElement] = { ...defaultArr[firstElement], type: ElementStates.Changing};
            defaultArr[lastElement] = { ...defaultArr[lastElement], type: ElementStates.Changing};
        }
    }



    useEffect(() => {
        return () => {
            timeRef.current && clearTimeout(timeRef.current)
        }
    }, []);

    const listReverse = ()



  return (
    <SolutionLayout title="Строка">
        <div className={`${stylesStringPage.container}`}>
      <Input
          placeholder={'Введите текст'}
          extraClass={'input-style'}
          isLimitText={true}
          maxLength={11}/>
      <Button text={'Развернуть'}
              extraClass={'button-style'}/>
        </div>
    </SolutionLayout>
  );
};
