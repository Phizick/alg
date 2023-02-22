import React, {FC, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import stylesQueuePage from "./queue.module.css";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Queue} from "../../Utils/Queue";
import {useForm} from "../../Utils/Hooks/useForm";
import {delay} from "../../Utils/Utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {useToggle} from "../../Utils/Hooks/useToggle";

type TQueue = {
    values: {
        inputValues: string,
        currentIndex: number
    },
    setValues: (arg: any) => void
}

export const QueuePage: FC = () => {

    const [queue] = useState(new Queue<string>(7));
    const [queueArray, setQueueArray] = useState<(string | undefined)[]>(queue.collectedArr());
    const [head, setHead] = useState<number>(queue.getHead());
    const [tail, setTail] = useState<number>(queue.getTail());
    const [addLoader, setAddLoader] = useToggle();
    const [delLoader, setDelLoader] = useToggle();

    const {values, setValues}: TQueue = useForm({
        inputValues: '',
        currentIndex: -1,
    });

    const onChange = (e: FormEvent<HTMLInputElement>): void => {
        e.preventDefault()
        setValues({inputValues: (e.currentTarget.value).trim()})
    };

    const getEnqueue = async (item: string) => {
        setAddLoader();
        queue.enqueue(item);
        setValues({inputValues: ''});
        setQueueArray([...queue.collectedArr()]);
        setTail(queue.getTail());
        setValues({currentIndex: tail % queue.getSize()});
        await delay(SHORT_DELAY_IN_MS);
        setValues({currentIndex: -1});
        setAddLoader();
    };

    const getDequeue = async () => {
        setDelLoader();
        if (queue) {
            queue.dequeue()
            setQueueArray([...queue.collectedArr()]);
            setValues({currentIndex: (head & queue.getSize())});
            await delay(SHORT_DELAY_IN_MS)
            setHead(queue.getHead());
            setValues({currentIndex: -1});
        }
        setDelLoader();
    };

    const clear = () => {
        queue.clear();
        setQueueArray(queue.collectedArr());
        setHead(queue.getHead());
        setTail(queue.getTail());
    };

    const clearedArray = queue.collectedArr().reduce((sum: any, item): any => sum + item, 0);

    return (
        <SolutionLayout title="Очередь">
            <form className={`${stylesQueuePage.container}`}>
                <div className={`${stylesQueuePage.buttons}`}>
                    <Input
                        placeholder={'Введите текст'}
                        isLimitText={true}
                        maxLength={4}
                        type={'text'}
                        max={'4'}
                        onChange={onChange}
                        value={values.inputValues || ''}
                    />
                    <Button text={'Добавить'}
                            onClick={() => getEnqueue(values.inputValues)}
                            disabled={!values.inputValues || queueArray.length === 6}
                            isLoader={addLoader}
                    />
                    <Button text={'Удалить'}
                            onClick={() => getDequeue()}
                            disabled={!Boolean(clearedArray)}
                            isLoader={delLoader}
                    />
                </div>
                <Button text={'Очистить'}
                        onClick={() => clear()}
                        disabled={!Boolean(clearedArray)}
                />
            </form>
            <ul className={`${stylesQueuePage.ul}`}>
                {queueArray
                    .map((item, index: number) => {
                        return (
                            <Circle key={index}
                                    letter={item}
                                    index={index}
                                    head={(index === head && !queue.isEmpty()) ? 'head' : ''}
                                    tail={(index === tail - 1 && !queue.isEmpty()) ? 'tail' : ''}
                                    state={index === values.currentIndex ? ElementStates.Changing : ElementStates.Default}
                            />
                        )
                    })}
            </ul>
        </SolutionLayout>
    );
};
