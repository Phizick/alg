import React, {MouseEvent, useEffect, useRef, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import stylesStringPage from './string.module.css'
import {useForm} from "../../Utils/Hooks/useForm";

import {Circle} from "../ui/circle/circle";


export const StringComponent: React.FC = () => {
    const { values, handleChange, setValues } = useForm({inputLetters: null});




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
      />
            <div className={`${stylesStringPage.latters}`}>
                     <Circle letter={`5`} key={1}  data-testid={'circle'}/>
            </div>

        </div>
    </SolutionLayout>
  );
};
