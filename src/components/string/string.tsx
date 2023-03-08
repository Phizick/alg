import React, {FC, FormEvent, useState} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import stylesStringPage from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import { delay } from "../../Utils/Utils";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../constants/delays";
import {setCircle, swapString} from "../../Utils/String";
import {useToggle} from "../../Utils/Hooks/useToggle";


export const StringComponent: FC = () => {

    const [inputLetters, setLetters] = useState<string>('')
    const [currentIndex, setIndex] = useState<number>(0)
    const [reversedArr, setArr] = useState<string[]>([])
    const [loader, setloader] = useToggle()

    const handleChange = (e: FormEvent<HTMLInputElement>): void => {
        setLetters(e.currentTarget.value.trim())
    };

    const reverseLetters = async (item: string) => {
        setloader()
        const startingArr = item.split('')
        setIndex( 0)
        setArr([...startingArr])
        await delay(DELAY_IN_MS)
        for (let i = 0; i < Math.floor(startingArr.length / 2); i++) {
            swapString(startingArr, i, startingArr.length - 1)
            setIndex((i: number) => i + 1)
            setArr([...startingArr])
            await delay(DELAY_IN_MS)
        }
        setIndex((i: number) => i + 1)
        setloader()
        return startingArr
    };

    const startingSort = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        reverseLetters(inputLetters)
        setLetters('')
    };

    return (
        <SolutionLayout title="Строка">
            <form onSubmit={startingSort} className={`${stylesStringPage.form}`} data-cy={'form'}>
                <div className={`${stylesStringPage.container}`}>
                    <Input placeholder={"Введите текст"}
                           extraClass={"input-style"}
                           isLimitText={true} maxLength={11}
                           onChange={handleChange}
                           value={inputLetters || ""}
                           data-cy={'input'}
                    />
                    <Button text={"Развернуть"}
                            extraClass={"button-style"}
                            onClick={startingSort}
                            isLoader={loader}
                            disabled={!inputLetters}
                            data-cy={'submit'}
                    />
                </div>
                <ul className={`${stylesStringPage.ul}`}>
                    {reversedArr &&
                        reversedArr?.map((item, index: number) => {
                            return (
                                <li className={`${stylesStringPage.li}`} key={index}>
                                    <Circle letter={item}
                                            index={index + 1}
                                            state={setCircle(currentIndex, index, reversedArr)}
                                    />
                                </li>
                            );
                        })}
                </ul>
            </form>
        </SolutionLayout>
    );
};
