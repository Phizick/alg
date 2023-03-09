import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";
import {CY_INPUT, CY_SUBMIT_BTN, CY_FORM, CIRCLES} from '../../cyConst/cyConst'

const referenceSequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];

describe('testing the correct operation of the fibonacci sequence component', () => {

    beforeEach(() => {
        cy.visit('/fibonacci')
    });

    it('inaccessibility of the submit button when the input value is empty', () => {
        cy.get(CY_FORM)
            .within(() => {
                cy.get(CY_INPUT).should('have.value', '');
                cy.get(CY_SUBMIT_BTN).should('be.disabled');
            });
    });

    it('checking correct number generation', {defaultCommandTimeout: SHORT_DELAY_IN_MS}, () => {
        const number = 11;
        cy.get(CY_INPUT).type(String(11));
        cy.wait(Number(SHORT_DELAY_IN_MS));
        cy.get(CY_SUBMIT_BTN).click();
        cy.get(CIRCLES)
            .should('have.length', number === 11 ? 1 : number + 1)
            .should(($circle) => {
                for (let i = 0; i < $circle.length; i++) {
                    expect($circle.eq(i)).to.have.text(String(referenceSequence[i]))
                }
            });
    });
})