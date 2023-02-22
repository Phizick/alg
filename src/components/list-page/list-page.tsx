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
import {useToggle} from "../../Utils/Hooks/useToggle";

export const ListPage: FC = () => {

    const [inputValue, setValue ] = useState('');
    const [inputIndex, setIndex ] = useState(0);
    const [listArray, setListArray] = useState(listArr);
    const [loader, setLoader] = useToggle();
    const [delLoader, setDelLoader] = useToggle();
    const [indexLoader, setIndexLoader] = useToggle();

    const itemsList = new List<string>(initialArr)

    const handleInputValue = (e: FormEvent<HTMLInputElement>): void => {
        setValue((e.currentTarget.value).trim())
    };

    const handleIndexInputValue = (e: FormEvent<HTMLInputElement>): void => {
        setIndex(Number(e.currentTarget.value))
    };

    const addToHead = async () => {
        setLoader()
        itemsList.prepend(inputValue)
        if (listArray.length >= 0) {
            listArray[0].smallItem = {
                value: inputValue,
                state: ElementStates.Changing,
                style: 'added'
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
        setLoader()
    };

    const addToTail = async () => {
        itemsList.append(inputValue)
        listArray[listArray.length - 1] = {
            ...listArray[listArray.length - 1],
            smallItem: {
                value: inputValue,
                state: ElementStates.Changing,
                style: 'added'
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
    };

    const deleteFromHead = async () => {
        setDelLoader()
        listArray[0] = {
            ...listArray[0],
            value: '',
            smallItem: {
                value: listArray[0].value,
                state: ElementStates.Changing,
                style: 'deleted'
            }
        }
        itemsList.clearHead()
        setListArray([...listArray])
        await delay(SHORT_DELAY_IN_MS)
        listArray.shift()
        setListArray([...listArray])
        setDelLoader()
    };

    const deleteFromTail = async () => {
        setDelLoader()
        listArray[listArray.length - 1] = {
            ...listArray[listArray.length - 1],
            value: '',
            smallItem: {
                value: listArray[listArray.length - 1].value,
                state: ElementStates.Changing,
                style: 'deleted'
            }
        }
        itemsList.clearTail()
        setListArray([...listArray])
        await delay(SHORT_DELAY_IN_MS)
        listArray.pop()
        setListArray([...listArray])
        setDelLoader()
    };

    const addByIndex = async () => {
        setIndexLoader()
        itemsList.addedByIndex(inputValue, inputIndex)
        for (let i = 0; i <= inputIndex; i++) {
            console.log(listArray)
            listArray[i] = {
                ...listArray[i],
                state: ElementStates.Changing,
                smallItem: {
                    value: inputValue,
                    state: ElementStates.Changing,
                    style: 'added'
                }
            }
            await delay(SHORT_DELAY_IN_MS)
            setListArray([...listArray])
            if (i > 0) {
                listArray[i - 1] = {
                    ...listArray[i - 1],
                    smallItem: null
                }
            }
            setListArray([...listArray])
        }
        await delay(SHORT_DELAY_IN_MS)
        listArray[inputIndex] = {
            ...listArray[inputIndex],
            state: ElementStates.Default,
            smallItem: null
        }
        listArray.splice(inputIndex, 1, {
            value: inputValue,
            state: ElementStates.Modified,
            smallItem: null
        })
        setListArray([...listArray])
        listArray[inputIndex].state = ElementStates.Default
        listArray.forEach((item: any) => {
            item.state = ElementStates.Default
        })
        await delay(SHORT_DELAY_IN_MS)
        setListArray([...listArray])
        setIndex(0)
        setIndexLoader()
    };

    const removeByIndex = async () => {
        setIndexLoader()
        itemsList.deletedByIndex(inputIndex)
        for (let i = 0; i <= inputIndex; i++) {
            listArray[i] = {
                ...listArray[i],
                state: ElementStates.Changing
            }
            await delay(SHORT_DELAY_IN_MS)
            setListArray([...listArray])
        }
        listArray[inputIndex] = {
            ...listArray[inputIndex],
            value: '',
            smallItem: {
                value: listArray[inputIndex].value,
                state: ElementStates.Changing,
                style: 'deleted'
            }
        }
        await delay(SHORT_DELAY_IN_MS)
        setListArray([...listArray])
        listArray.splice(inputIndex, 1)
        if (inputIndex === 0) {
            listArray[inputIndex - 1] = {
                ...listArray[inputIndex - 1],
                value: listArray[inputIndex].value,
                state: ElementStates.Modified,
                smallItem: null
            }
        }
        listArray[inputIndex - 1] = {
            ...listArray[inputIndex - 1],
            value: listArray[inputIndex - 1].value,
            state: ElementStates.Modified,
            smallItem: null
        }
        await delay(SHORT_DELAY_IN_MS)
        setListArray([...listArray])
        listArray.forEach((item) => {
            item.state = ElementStates.Default
        })
        await delay(SHORT_DELAY_IN_MS)
        setListArray([...listArray])
        setIndex(1)
        setIndexLoader()
    };

    const minimalInputIndexValue = 0;
    const maxInputIndexValue = listArray.length + 1;
    const limitedInputValues = !(minimalInputIndexValue <= inputIndex && inputIndex <= maxInputIndexValue);

  return (
    <SolutionLayout title="Связный список">
      <form className={`${stylesListPage.container}`} onSubmit={(e) => e.preventDefault()}>
      <div className={`${stylesListPage.buttons}`}>
      <Input
          placeholder={'Введите символ'}
          extraClass={'input-style'}
          isLimitText={true}
          type={'num'}
          maxLength={4}
          max={`4 знака`}
          onChange={handleInputValue}
          value={inputValue}
      />
      <Button text={'Добавить в head'}
              extraClass={'button-style'}
              onClick={addToHead}
              disabled={!inputValue || listArray.length === 0}
              isLoader={loader}
      />
        <Button text={'Добавить в tail'}
                extraClass={'button-style'}
                onClick={addToTail}
                disabled={!inputValue}
                isLoader={loader}
               />
      <Button text={'Удалить из head'}
              extraClass={'button-style'}
              onClick={deleteFromHead}
              disabled={loader || listArray.length === 0}
              isLoader={delLoader}
      />
        <Button text={'Удалить из tail'}
                extraClass={'button-style'}
                onClick={deleteFromTail}
                isLoader={delLoader}
                disabled={loader || listArray.length === 0}
        />
    </div>
      <div className={`${stylesListPage.buttons}`}>
        <Input
            placeholder={'Введите индекс'}
            extraClass={'input-style'}
            isLimitText={true}
            max={listArray.length + 1}
            type={'num'}
            onChange={handleIndexInputValue}
            value={inputIndex}
        />
        <Button text={'Добавить по индексу'}
                extraClass={'button-style'}
                linkedList={'big'}
                onClick={addByIndex}
                disabled={limitedInputValues}
                isLoader={indexLoader}

        />
        <Button text={'Удалить по индексу'}
                extraClass={'button-style'}
                linkedList={'big'}
                onClick={removeByIndex}
                isLoader={indexLoader}
        />
    </div>
      </form>
        <ul className={`${stylesListPage.ul}`}>
            {listArray.map((item: any, index: number) => {
                // console.log(listArray)
                return (
                    <li className={`${stylesListPage.li}`}>
                        {item.smallItem && (
                            <Circle
                                letter={item.smallItem.value}
                                state={item.smallItem.state}
                                isSmall
                                extraClass={`${stylesListPage[`${item.smallItem.style}`]}`}
                            />
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
