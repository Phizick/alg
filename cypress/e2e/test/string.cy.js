
const cyInput = '[data-cy="input"]'
const cySubmitBtn = '[data-cy="submit"]'
const cyForm = '[data-cy="form"]'

describe('testing the correct operation of the sting reversal', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/recursion')
    })

    it('inaccessibility of the submit button when the input value is empty', () => {
        cy.get(cyForm)
            .within(() => {
                cy.get(cyInput).should('have.value', '')
                cy.get(cySubmitBtn).should('be.disabled')
            })
    })
})