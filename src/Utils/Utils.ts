
export const delay = (ms: number) => new Promise<void>(
    resolve => setTimeout(resolve, ms)
);

export const randomNumber = (startNumber: number, lastNumber: number): number => {
    return Math.floor(Math.random() * (lastNumber - startNumber + 1)) + startNumber;
};