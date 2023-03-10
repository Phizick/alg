import {Circle} from "../circle";
import TestRenderer from 'react-test-renderer';
import {ElementStates} from "../../../../types/element-states";


describe('Circle component testing', () => {

    it('Circle without text works correctly', () => {
        const circle = TestRenderer
            .create(<Circle />)
            .toJSON()
        expect(circle).toMatchSnapshot()
    });

    it('Circle with text works correctly', () => {
        const circle = TestRenderer
            .create(<Circle letter={'1'}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    });

    it('Circle with head works correctly', () => {
        const circle = TestRenderer
            .create(<Circle head={'H'}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    });

    it('Circle with react-element in head works correctly', () => {
        const circle = TestRenderer
            .create(<Circle head={<Circle/>}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    });

    it('Circle with tail works correctly', () => {
        const circle = TestRenderer
            .create(<Circle tail={'T'}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    });

    it('Circle with react-element in tail works correctly', () => {
        const circle = TestRenderer
            .create(<Circle tail={<Circle/>}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    });

    it('Circle with index works correctly', () => {
        const circle = TestRenderer
            .create(<Circle index={0}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    });

    it('Circle with isSmall-prop true value works correctly', () => {
        const circle = TestRenderer
            .create(<Circle isSmall={true}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    });

    it('Circle with Default state works correctly', () => {
        const circle = TestRenderer
            .create(<Circle state={ElementStates.Default}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    });

    it('Circle with Changing state works correctly', () => {
        const circle = TestRenderer
            .create(<Circle state={ElementStates.Changing}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    });

    it('Circle with Modified state works correctly', () => {
        const circle = TestRenderer
            .create(<Circle state={ElementStates.Modified}/>)
            .toJSON()
        expect(circle).toMatchSnapshot()
    });
})