import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";
import {cyInput, cySubmitBtn, cyForm, circles} from '../../cyConst/cyConst'

const referenceSequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]

describe('testing the correct operation of the fibonacci sequence component', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/fibonacci')
    })

    it('inaccessibility of the submit button when the input value is empty', () => {
        cy.get(cyForm)
            .within(() => {
                cy.get(cyInput).should('have.value', '')
                cy.get(cySubmitBtn).should('be.disabled')
            })
    })

    it('checking correct number generation', {defaultCommandTimeout: SHORT_DELAY_IN_MS}, () => {
        const number = 11
        cy.get(cyInput).type(11)
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get(cySubmitBtn).click()
        cy.get(circles)
            .should('have.length', number === 11 ? 1 : number + 1)
            .should(($circle) => {
                for (let i = 0; i < $circle.length; i++) {
                    expect($circle.eq(i)).to.have.text(String(referenceSequence[i]))
                }
            })
    })
})