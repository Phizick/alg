import {cyClearBtn, cyForm, cyInput, cyRemoveBtn, cySubmitBtn} from "../../cyConst/cyConst";

describe('testing the correct operation of the list component', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/list')
    })

    it('inaccessibility of the submit button when the input value is empty', () => {
        cy.get(cyForm)
            .within(() => {
                cy.get(cyInput).should('have.value', '')

            })
    })

})