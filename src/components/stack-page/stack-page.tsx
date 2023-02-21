import React, {FC, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import stylesStringPage from "./stack-page.module.css";
import stylesStackPage from "./stack-page.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Stack} from "../../Utils/Stack";
import {useForm} from "../../Utils/Hooks/useForm";
import {delay} from "../../Utils/Utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";

// type TValues = {
//     values: {
//         inputValue: string
//         stackArr: []
//         currentIndex: number
//         isLoader: boolean
//         add: boolean
//         delete: boolean
//         clear: boolean
//     }
//     setValues: any
// }

const stack = new Stack<string>();

export const StackPage: FC = () => {

    // const { values, setValues }: TValues = useForm({
    //     inputValue: '',
    //     stackArr: [],
    //     currentIndex: null,
    //     isLoader: false,
    //     add: false,
    //     delete: false,
    //     clear: false
    // })

    const [inputValue, setInputValue] = useState('')
    const [stackArr, setStack] = useState<string[]>()
    const [currIndex, setIndex] = useState(0)






    const handleInput = (e: FormEvent<HTMLInputElement>): void => {
        setInputValue(e.currentTarget.value)
    }

    const peak = () => {
        return stack.peak();
    };

    const push = async (item: string) => {
        stack.push(item);
        setStack(stack.collectedArr())
        setInputValue('')
        await delay(SHORT_DELAY_IN_MS)
        setIndex(currIndex + 1)

    };

    const pop = async () => {
        setIndex(stack.getSize() - 1)
        await delay(SHORT_DELAY_IN_MS)
        stack.pop()
        setStack([...stack.collectedArr()])

    };

    const clear = () => {
        stack.clear()
        setStack(stack.collectedArr())
        setIndex(0)
    }




  return (
    <SolutionLayout title="Стек">
      <form className={`${stylesStringPage.container}`} onSubmit={(e) => e.preventDefault()}>
        <div className={`${stylesStringPage.buttons}`}>
        <Input
            placeholder={'Введите текст'}
            extraClass={'input-style'}
            isLimitText={true}
            maxLength={11}
            type={'text'}
            onChange={handleInput}
            value={inputValue}
            />
        <Button text={'Добавить'}
                extraClass={'button-style'}
        onClick={() => push(inputValue)}
        />
        <Button text={'Удалить'}
                extraClass={'button-style'}
        onClick={() => pop()}/>
        </div>
        <Button text={'Очистить'}
                extraClass={'button-style'}
        // onClick={() => clear()}
          />
      </form>
        <ul className={`${stylesStackPage.ul}`}>
            { stackArr?.map((item:any, index: number) => {
                console.log(stack.collectedArr)
                    return (
                        <li className={`${stylesStackPage.li}`} key={index}>
                            <Circle
                                index={index}
                                letter={item}
                                head={peak() === index ? 'top' : ''}
                                state={index === currIndex ? ElementStates.Changing : ElementStates.Default}
                                />
                        </li>
                    )
                })

            }
        </ul>
    </SolutionLayout>
  );
};
