import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import stylesStringPage from './string.module.css'

export const StringComponent: React.FC = () => {
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
