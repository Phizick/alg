import React, {FC, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import stylesListPage from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {initialArr, List, listArr} from "../../Utils/List";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {delay} from "../../Utils/Utils";
import {ElementStates} from "../../types/element-states";

export const ListPage: FC = () => {

    const [inputValue, setValue ] = useState('')
    const [listArray, setListArray] = useState(listArr)

    const itemsList = new List<string>(initialArr)

    const addToHead = async () => {
        itemsList.prepend(inputValue)
        setListArray([...listArray])
        await delay(SHORT_DELAY_IN_MS)
        listArray.unshift({
            ...listArray[0],
            value: inputValue,
            state: ElementStates.Modified
        })
        setListArray([...listArray])
        await delay(SHORT_DELAY_IN_MS)
        listArray[0].state = ElementStates.Default
        setListArray([...listArray])
        setValue('')
    }




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
