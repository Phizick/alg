import React, { FC } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stylesStringPage from "../string/string.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";

export const FibonacciPage: FC = () => {
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={`${stylesStringPage.container}`}>
        <Input
            placeholder={'Введите текст'}
            extraClass={'input-style'}
            isLimitText={true}
            maxLength={11}
            type={'num'}
            max={19}/>
        <Button text={'Рассчитать'}
                extraClass={'button-style'}/>
      </div>
     
    </SolutionLayout>
  );
};
