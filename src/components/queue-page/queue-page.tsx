import React, {FC, FormEvent, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import stylesQueuePage from "./queue.module.css";
import stylesStringPage from '../string/string.module.css'
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {Queue} from "../../Utils/Queue";
import {useForm} from "../../Utils/Hooks/useForm";
import {delay} from "../../Utils/Utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";


export const QueuePage: FC = () => {

    // const [ queue ] = useState(new Queue<string>(7))
    // const { values, setValues } = useForm({
    //     inputValue: '',
    //     currentIndex: 0,
    //     head: queue.getHead(),
    //     tail: queue.getTail(),
    //     queueArr: queue.collectedArr()
    // })

    const [inputValue, setInputValue] = useState<string>('');
    const [currentIndex, setCurrentIndex] = useState<number>(-1);
    const [queue] = useState(new Queue<string>(7));
    const [queueArray, setQueueArray] = useState<(string | undefined)[]>(queue.collectedArr());
    const [head, setHead] = useState<number>(queue.getHead());
    const [tail, setTail] = useState<number>(queue.getTail());


    const onChange = (e: FormEvent<HTMLInputElement>): void => {
        setInputValue(e.currentTarget.value)
    }



    const getEnqueue = async (item: string) => {
        queue.enqueue(item);
        setInputValue('')
        setQueueArray([...queue.collectedArr()]);
        setTail(queue.getTail());
        setCurrentIndex(tail % queue.getSize());
        // setValues({inputValue: '', queueArr: [...queue.collectedArr()], tail: queue.getTail(), currentIndex: values.tail % queue.getSize()});
        await delay(SHORT_DELAY_IN_MS)
        // setValues({currentIndex: -1})
        setCurrentIndex(-1);
    };

    const getDequeue = async () => {
        if (queue) {
            queue.dequeue()
            setQueueArray([...queue.collectedArr()]);
            setCurrentIndex((head & queue.getSize()));
            // setValues({arr: [...queue.collectedArr()], currentIndex: values.head & queue.getSize()})
            await delay(SHORT_DELAY_IN_MS)
            setHead(queue.getHead());
            setCurrentIndex(-1);
            // setValues({head: queue.getHead(), currentIndex: -1})
        }
    }

    const clear = () => {
        queue.clear();
        setQueueArray(queue.collectedArr());
        setHead(queue.getHead());
        setTail(queue.getTail());
        // setValues({arr: queue.collectedArr(), head: queue.getHead(), tail: queue.getTail()})
    }

  return (
    <SolutionLayout title="Очередь">
      <form className={`${stylesStringPage.container}`}>
        <div className={`${stylesStringPage.buttons}`}>
          <Input
              placeholder={'Введите текст'}
              extraClass={'input-style'}
              isLimitText={true}
              maxLength={4}
              type={'text'}
              onChange={onChange}
              />
          <Button text={'Добавить'}
                  extraClass={'button-style'}
          onClick={() => getEnqueue(inputValue)}/>
          <Button text={'Удалить'}
                  extraClass={'button-style'}
          onClick={() => getDequeue()}
          />
        </div>
        <Button text={'Очистить'}
                extraClass={'button-style'}
                onClick={() => clear()}
        />
      </form>
        <ul className={`${stylesQueuePage.ul}`}>
            {queueArray
                .map((item: any, index: number) => {
                    console.log(queueArray)
                    return (
                        <Circle key={index}
                                letter={item}
                                index={index}
                                head={(index === head && !queue.isEmpty()) ? 'head' : ''}
                                tail={(index === tail - 1 && !queue.isEmpty()) ? 'tail' : ''}
                                state={index === currentIndex ? ElementStates.Changing : ElementStates.Default}

                        />

                    )
                })}
        </ul>

    </SolutionLayout>
  );
};
