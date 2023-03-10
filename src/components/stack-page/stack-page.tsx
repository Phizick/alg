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
        loaderAdd: boolean,
        loaderDel: boolean,
    },
    setValues: (arg: any) => void
}

const stack = new Stack<string>();

export const StackPage: FC = () => {

    const { values, setValues }: TValues = useForm({
        inputValue: null,
        stackArr: null,
        currentIndex: null,
        loaderAdd: false,
        loaderDel: false
    });

    const handleInput = (e: FormEvent<HTMLInputElement>): void => {
        setValues({
            inputValue: (e.currentTarget.value).trim(),
            stackArr: [...stack.collectedArr()]})
    };

    const peak = () => {
        return stack.peak();
    };

    const push = async (item: string) => {
        stack.push(item);
        await delay(SHORT_DELAY_IN_MS)
        setValues({
            currentIndex: stack.getSize() - 1,
            stackArr: [...stack.collectedArr()],
            loaderAdd: true})
        await delay(SHORT_DELAY_IN_MS)
        setValues({
            currentsIndex: 0,
            stackArr: [...stack.collectedArr()]})
    };

    const pop = async () => {
        setValues({
            currentIndex: stack.getSize() - 1,
            loaderDel: true,
            stackArr: [...stack.collectedArr()]})
        await delay(SHORT_DELAY_IN_MS)
        stack.pop()
        await delay(SHORT_DELAY_IN_MS)
        setValues({stackArr: [...stack.collectedArr()]})
    };

    const clear = () => {
        stack.clear()
        setValues({
            stackArr: [],
            currentIndex: 0})
    };

    const clearedArray = values.stackArr?.reduce((sum: any, item): any => sum + item, 0);

    return (
        <SolutionLayout title="????????">
            <form className={`${stylesStringPage.container}`} onSubmit={(e) => e.preventDefault()} data-cy={'form'}>
                <div className={`${stylesStringPage.buttons}`}>
                    <Input
                        placeholder={'?????????????? ??????????'}
                        isLimitText={true}
                        maxLength={4}
                        type={'text'}
                        onChange={handleInput}
                        value={values.inputValue || ''}
                        data-cy={'input'}
                    />
                    <Button text={'????????????????'}
                            extraClass={'button-style'}
                            onClick={() => push(values.inputValue)}
                            disabled={!Boolean(values.inputValue)}
                            isLoader={values.loaderAdd}
                            data-cy={'submit'}
                    />
                    <Button text={'??????????????'}
                            extraClass={'button-style'}
                            onClick={() => pop()}
                            disabled={clearedArray === 0}
                            isLoader={values.loaderDel}
                            data-cy={'remove'}
                    />
                </div>
                <Button text={'????????????????'}
                        extraClass={'button-style'}
                        onClick={() => clear()}
                        disabled={clearedArray === 0}
                        data-cy={'clear'}
                />
            </form>
            <ul className={`${stylesStackPage.ul}`}>
                { values.stackArr?.map((item, index: number) => {
                    return (
                        <li className={`${stylesStackPage.li}`} key={index} data-cy={'circles'}>
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
