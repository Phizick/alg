import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stylesStringPage from "../stack-page/stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";

export const QueuePage: React.FC = () => {
  return (
    <SolutionLayout title="Очередь">
      <div className={`${stylesStringPage.container}`}>
        <div className={`${stylesStringPage.buttons}`}>
          <Input
              placeholder={'Введите текст'}
              extraClass={'input-style'}
              isLimitText={true}
              maxLength={4}
              type={'text'}
              />
          <Button text={'Добавить'}
                  extraClass={'button-style'}/>
          <Button text={'Удалить'}
                  extraClass={'button-style'}/>
        </div>
        <Button text={'Очистить'}
                extraClass={'button-style'}/>
      </div>

    </SolutionLayout>
  );
};