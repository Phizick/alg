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

    const addToTail = async () => {
        itemsList.append(inputValue)
        setListArray([...listArray])
        await delay(SHORT_DELAY_IN_MS)
        listArray.push({
            value: inputValue,
            state: ElementStates.Modified
        })
        setListArray([...listArray])
        await delay(SHORT_DELAY_IN_MS)
        listArray[listArray.length - 1].state = ElementStates.Default
        setListArray([...listArray])
    }

    const deleteFromHead = async () => {
        listArray[0] = {
            ...listArray[0],
            value: ''
        }
        itemsList.clearHead()
        setListArray([...listArray])
        await delay(SHORT_DELAY_IN_MS)
        listArray.shift()
        setListArray([...listArray])
    }

    const deleteFromTail = async () => {
        listArray[listArray.length - 1] = {
            ...listArray[listArray.length - 1],
            value: ''
        }
        itemsList.clearTail()
        setListArray([...listArray])
        await delay(SHORT_DELAY_IN_MS)
        listArray.pop()
        setListArray([...listArray])

    }










  return (
    <SolutionLayout title="Связный список">
      <form className={`${stylesListPage.container}`} onSubmit={(e) => e.preventDefault()}>
      <div className={`${stylesListPage.buttons}`}>
      <Input
          placeholder={'Введите символ'}
          extraClass={'input-style'}
          isLimitText={true}
          maxLength={4}
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
      </form>


    </SolutionLayout>
  );
};
