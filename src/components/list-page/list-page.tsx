import React, {FC, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import stylesListPage from "./list-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {initialArr, List, listArr} from "../../Utils/List";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {delay} from "../../Utils/Utils";
import {ElementStates} from "../../types/element-states";
import {Circle} from "../ui/circle/circle";
import {ArrowIcon} from "../ui/icons/arrow-icon";

export const ListPage: FC = () => {

    const [inputValue, setValue ] = useState('')
    const [inputIndex, setIndex ] = useState(0)
    const [listArray, setListArray] = useState(listArr)

    console.log(listArray)

    const itemsList = new List<string>(initialArr)

    const handleInputValue = (e: FormEvent<HTMLInputElement>): void => {
        setValue(e.currentTarget.value)
    }

    const addToHead = async () => {
        itemsList.prepend(inputValue)
        if (listArray.length > 0) {
            listArray[0].smallItem = {
                value: inputValue,
                state: ElementStates.Changing
            }
        }
        setListArray([...listArray])
        await delay(SHORT_DELAY_IN_MS)
        listArray[0].smallItem = null
        listArray.unshift({
            ...listArray[0],
            value: inputValue,
            state: ElementStates.Modified,
        })
        setListArray([...listArray])
        await delay(SHORT_DELAY_IN_MS)
        listArray[0].state = ElementStates.Default
        setListArray([...listArray])
        setValue('')
    }

    const addToTail = async () => {
        itemsList.append(inputValue)
        listArray[listArray.length - 1] = {
            ...listArray[listArray.length - 1],
            smallItem: {
                value: inputValue,
                state: ElementStates.Changing
            }
        }
        setListArray([...listArray])
        await delay(SHORT_DELAY_IN_MS)
        listArray[listArray.length - 1] = {
            ...listArray[listArray.length - 1],
            smallItem: null
        }
        listArray.push({
            value: inputValue,
            state: ElementStates.Modified,
            smallItem: null
        })
        setListArray([...listArray])
        await delay(SHORT_DELAY_IN_MS)
        listArray[listArray.length - 1].state = ElementStates.Default
        setListArray([...listArray])
    }

    const deleteFromHead = async () => {
        listArray[0] = {
            ...listArray[0],
            value: '',
            smallItem: {
                value: listArray[0].value,
                state: ElementStates.Changing
            }
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
            value: '',
            smallItem: {
                value: listArray[listArray.length - 1].value,
                state: ElementStates.Changing
            }
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
          onChange={handleInputValue}
      />
      <Button text={'Добавить в head'}
              extraClass={'button-style'}
              onClick={addToHead}
      />
        <Button text={'Добавить в tail'}
                extraClass={'button-style'}
                onClick={addToTail}
               />
      <Button text={'Удалить из head'}
              extraClass={'button-style'}
              onClick={deleteFromHead}
      />
        <Button text={'Удалить из tail'}
                extraClass={'button-style'}
                onClick={deleteFromTail}
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
        <ul className={`${stylesListPage.ul}`}>
            {listArray.map((item: any, index: number) => {
                console.log(item)
                return (
                    <li className={`${stylesListPage.li}`}>
                        {item.smallItem && (
                            <Circle letter={item.smallItem.value} state={item.smallItem.state} isSmall/>
                        )}
                        <Circle
                            letter={item.value}
                            index={index}
                            head={index === 0 && !item.smallItem ? 'head' : ''}
                            tail={index === listArray.length - 1 && !item.smallItem ? 'tail' : ''}
                            state={item.state}

                        />
                        {index < listArray.length - 1 &&
                        <ArrowIcon fill={item.state !== ElementStates.Changing ? '#0032FF' : '#D252E1'}/>
                        }


                    </li>
                )
            })}

        </ul>
    </SolutionLayout>
  );
};
