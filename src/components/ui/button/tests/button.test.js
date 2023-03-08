import {Button} from "../button";
import TestRenderer from 'react-test-renderer';
import {Direction} from "../../../../types/direction";

describe('Button component testing', () => {

    it('Button with text works correctly', () => {
        const btn = TestRenderer
            .create(<Button text={'text'}/>)
            .toJSON()
        expect(btn).toMatchSnapshot()
    })

    it('Button without text works correctly', () => {
        const btn = TestRenderer
            .create(<Button />)
            .toJSON()
        expect(btn).toMatchSnapshot()
    })

    it('Button with ascending sorting works correctly', () => {
        const btn = TestRenderer
            .create(<Button sorting={Direction.Ascending}/>)
            .toJSON()
        expect(btn).toMatchSnapshot()
    })

    it('Button with descending sorting works correctly', () => {
        const btn = TestRenderer
            .create(<Button sorting={Direction.Descending}/>)
            .toJSON()
        expect(btn).toMatchSnapshot()
    })

    it('small size Button works correctly', () => {
        const btn = TestRenderer
            .create(<Button linkedList={'small'}/>)
            .toJSON()
        expect(btn).toMatchSnapshot()
    })

    it('big size Button works correctly', () => {
        const btn = TestRenderer
            .create(<Button linkedList={'big'}/>)
            .toJSON()
        expect(btn).toMatchSnapshot()
    })

    it('loader Button works correctly', () => {
        const btn = TestRenderer
            .create(<Button isLoader={true}/>)
            .toJSON()
        expect(btn).toMatchSnapshot()
    })

    it('disabled Button works correctly', () => {
        const btn = TestRenderer
            .create(<Button disabled/>)
            .toJSON()
        expect(btn).toMatchSnapshot()
    })


})

