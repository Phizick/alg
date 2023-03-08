import {testingSelectionSort, testingBubbleSort} from "../../../Utils/Sorting";
import {ElementStates} from "../../../types/element-states";
import {initialTestArr, resultedTestArr} from "../../../constants/arraysForTests";



describe('Sorting component testing', () => {

    it('Bubble sort on an empty array works correctly', () => {
        expect(testingBubbleSort([])).toEqual([])
    })

    it('Selection sort on an empty array works correctly', () => {
        expect(testingSelectionSort([])).toEqual([])
    })

    it('Bubble sort on an one element array works correctly', () => {
        expect(testingBubbleSort([{item: 5, state: ElementStates.Default}])).toEqual([{item: 5, state: ElementStates.Default}])
    })

    it('Selection sort on an one element array works correctly', () => {
        expect(testingSelectionSort([{item: 5, state: ElementStates.Default}])).toEqual([{item: 5, state: ElementStates.Default}])
    })

    it('Bubble sort on an many element array works correctly', () => {
        expect(testingBubbleSort(initialTestArr)).toEqual(resultedTestArr)
    })

    it('Selection sort on an many element array works correctly', () => {
        expect(testingSelectionSort(initialTestArr)).toEqual(resultedTestArr)
    })
})