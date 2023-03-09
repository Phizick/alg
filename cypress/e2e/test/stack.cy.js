
import {cyForm, cyInput, cySubmitBtn, cyRemoveBtn, cyClearBtn, circles} from "../../cyConst/cyConst";
import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";

describe('testing the correct operation of the stack component', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/stack')
    })

    it('inaccessibility of the submit button when the input value is empty', () => {
        cy.get(cyForm)
            .within(() => {
                cy.get(cyInput).should('have.value', '')
                cy.get(cySubmitBtn).should('be.disabled')
                // cy.get(cyRemoveBtn).should('be.disabled')
                // cy.get(cyClearBtn).should('be.disabled')
            })
    })

    const addItem = (value) => {
        cy.clock()
        cy.get(cyForm)
            .within(() => {
                cy.get(cyInput).type(value)
                // cy.get(cyRemoveBtn).should('be.disabled')
                // cy.get(cyClearBtn).should('be.disabled')
            })

        cy.get(cyForm)
            .within(() => {
                cy.get(cySubmitBtn).click()
                // cy.get(cyRemoveBtn).should('be.disabled')
                // cy.get(cyClearBtn).should('be.disabled')
            })
        cy.tick(SHORT_DELAY_IN_MS)
        cy.get(circles).contains(value).parent()
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_changing'))
        cy.tick(SHORT_DELAY_IN_MS)
    }

    it('check for adding items to the stack', () => {
        cy.clock()

        addItem('0')
        cy.get(circles)
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))

        addItem('1')
        cy.get(circles).then(item => {
            cy.get(item[0])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_default'))
            cy.get(item[0])
                .children().should('have.text', '0')
            cy.get(item[1])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_default'))
            cy.get(item[1])
                .children().should('have.text', '1')
        })

        addItem('2')
        cy.get(circles).then(item => {
            cy.get(item[0])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_default'))
            cy.get(item[0])
                .children().should('have.text', '0')
            cy.get(item[1])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_default'))
            cy.get(item[1])
                .children().should('have.text', '1')
            cy.get(item[2])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_default'))
            cy.get(item[2])
                .children().should('have.text', '2')
        })

    })






})