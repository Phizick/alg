import {reverseStringForTest} from '../../../Utils/String'

describe('String component testing', () => {

    it('reversing a string with an even number of items', () => {
        expect(reverseStringForTest('012345')).toEqual(['5','4','3','2','1','0']);
    });

    it('reversing a string with an odd number of items', () => {
        expect(reverseStringForTest('01234')).toEqual(['4','3','2','1','0']);
    });

    it('reversing a string with an one item', () => {
        expect(reverseStringForTest('0')).toEqual(['0']);
    });

    it('empty line reversal', () => {
        expect(reverseStringForTest('')).toEqual([]);
    });
})