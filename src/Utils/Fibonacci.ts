


export const getNumbers = (count: number) => {
    const fibonacciStartingNumbers = [1, 1];
    for (let i = 2; i <= count; i++) {
        const firstNumber = fibonacciStartingNumbers[i - 1];
        const nextNumber = fibonacciStartingNumbers[i - 2]
        fibonacciStartingNumbers.push(firstNumber + nextNumber)
    }
    return fibonacciStartingNumbers
}