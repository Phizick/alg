import {cyForm, cyInput, cySubmitBtn, cyClearBtn, cyRemoveBtn, cyCircleHead, cyCircleTail} from "../../cyConst/cyConst";

describe('testing the correct operation of the queue component', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/queue')
    })

    it('inaccessibility of the submit button when the input value is empty', () => {
        cy.get(cyForm)
            .within(() => {
                cy.get(cyInput).should('have.value', '')
                cy.get(cySubmitBtn).should('be.disabled')
                cy.get(cyRemoveBtn).should('be.disabled')
                cy.get(cyClearBtn).should('be.disabled')
            })
    })

    it('check for adding items to the queue', () => {

    })


})