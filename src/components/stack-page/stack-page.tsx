import React, {FC, FormEvent} from "react";
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

type TValues = {
    values: {
        inputValue: string,
        stackArr: string[],
        currentIndex: number,
        isLoader: boolean,
        add: boolean,
        delete: boolean,
        clear: boolean
    },
    setValues: any
}

const stack = new Stack<string>();

export const StackPage: FC = () => {

    const { values, setValues }: TValues = useForm({
        inputValue: null,
        stackArr: null,
        currentIndex: null,
        isLoader: false,
        add: false,
        delete: false,
        clear: false
    })


    const handleInput = (e: FormEvent<HTMLInputElement>): void => {
        setValues({inputValue: e.currentTarget.value, stackArr: stack.collectedArr()})
    }

    const peak = () => {
        return stack.peak();
    };

    const push = async (item: string) => {
        stack.push(item);
        await delay(SHORT_DELAY_IN_MS)
        setValues({currentIndex: values.currentIndex + 1})
        setValues({stackArr: stack.collectedArr()})
    };

    const pop = async () => {
        setValues({currentIndex: stack.getSize() - 1})
        await delay(SHORT_DELAY_IN_MS)
        stack.pop()
        setValues({stackArr: [...stack.collectedArr()]})
    };

    // const clear = () => {
    //     stack.clear()
    //     setStack(stack.collectedArr())
    //     setIndex(0)
    // }


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
            value={values.inputValue || ''}
            />
        <Button text={'Добавить'}
                extraClass={'button-style'}
        onClick={() => push(values.inputValue)}
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
            { values.stackArr?.map((item, index: number) => {
                    return (
                        <li className={`${stylesStackPage.li}`} key={index}>
                            <Circle
                                index={index}
                                letter={item}
                                head={peak() === index ? 'top' : ''}
                                state={index === values.currentIndex ? ElementStates.Changing : ElementStates.Default}
                                />
                        </li>
                    )
                })

            }
        </ul>
    </SolutionLayout>
  );
};
