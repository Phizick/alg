import React, { FC, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import stylesFiboPage from "./fibonacci-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useForm } from "../../Utils/Hooks/useForm";
import { getNumbers } from "../../Utils/Fibonacci";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../Utils/Utils";
import { Circle } from "../ui/circle/circle";

type TFibValues = {
    values: {
        inputValue: number,
        fibArr: number[],
        loader: boolean,
        end: string,
    },
    setValues: (arg: any) => void
};

const minimalInputValue = 1;
const maxInputValue = 19;

export const FibonacciPage: FC = () => {
    const { values, setValues }: TFibValues = useForm({
        inputValue: null,
        fibArr: [],
        loader: false
    });

    const onChange = (e: FormEvent<HTMLInputElement>): void => {
        setValues({ inputValue: e.currentTarget.value });
    };

    const limitedInputValues = !(minimalInputValue <= values.inputValue && values.inputValue <= maxInputValue);

    const getArr = async (value: number) => {
        const arr = getNumbers(value);
        for (let i = 0; i <= arr.length; i++) {
            await delay(SHORT_DELAY_IN_MS);
            setValues({ fibArr: arr.slice(0, i + 1), loader: true });
        }
        setValues({ inputValue: null, loader: false });
    };

    const handleClick = (e: FormEvent<HTMLFormElement> | FormEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        getArr(values.inputValue);
        setValues({ inputValue: null });
    };

    return (
        <SolutionLayout title="Последовательность Фибоначчи">
            <form className={`${stylesFiboPage.container}`} onSubmit={handleClick} data-cy={'form'}>
                <div className={`${stylesFiboPage.input}`}>
                    <Input
                        placeholder={"Введите число"}
                        isLimitText={true}
                        maxLength={2}
                        type={"num"}
                        onChange={onChange}
                        value={values.inputValue || ""}
                        max={19}
                        data-cy={'input'}

                    />
                    <Button
                        text={"Рассчитать"}
                        extraClass={"button-style"}
                        onClick={handleClick}
                        isLoader={values.loader}
                        disabled={limitedInputValues}
                        data-cy={'submit'}
                    />
                </div>
                <ul className={`${stylesFiboPage.ul}`}>
                    {values.fibArr &&
                        values.fibArr.map((item, index: number) => {
                            return (
                                <li className={`${stylesFiboPage.li}`} key={index}>
                                <Circle letter={String(item)} key={index} />
                                </li>
                            );
                        })}
                </ul>
            </form>
        </SolutionLayout>
    );
};
