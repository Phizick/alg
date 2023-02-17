import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stylesListPage from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";

export const ListPage: React.FC = () => {


  return (
    <SolutionLayout title="Связный список">
      <div className={`${stylesListPage.container}`}>
      <div className={`${stylesListPage.buttons}`}>
      <Input
          placeholder={'Введите символ'}
          extraClass={'input-style'}
          isLimitText={true}
          maxLength={4}
          type={undefined}
      />
      <Button text={'Добавить в head'}
              extraClass={'button-style'}
      />
        <Button text={'Добавить в tail'}
                extraClass={'button-style'}
               />
      <Button text={'Удалить из head'}
              extraClass={'button-style'}
      />
        <Button text={'Удалить из tail'}
                extraClass={'button-style'}
        />
    </div>
      <div className={`${stylesListPage.buttons}`}>
        <Input
            placeholder={'Введите индекс'}
            extraClass={'input-style'}
            isLimitText={false}
        />
        <Button text={'Добавить по индексу'}
                extraClass={'button-style'}
                linkedList={'big'}
        />
        <Button text={'Удалить по индексу'}
                extraClass={'button-style'}
                linkedList={'big'}
        />
    </div>
      </div>


    </SolutionLayout>
  );
};
