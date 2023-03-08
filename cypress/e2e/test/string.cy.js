import {DELAY_IN_MS} from "../../../src/constants/delays";


const cyInput = '[data-cy="input"]'
const cySubmitBtn = '[data-cy="submit"]'
const cyForm = '[data-cy="form"]'
const circles = 'div[class*="circle_circle"]'


describe('testing the correct operation of the sting reversal component', () => {

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

    it('checking correct string reversal',  () => {
        cy.clock()
        cy.get(cyForm)
            .within(() => {
                cy.get(cyInput).type('test')
                cy.get(cySubmitBtn).click()
            })
        cy.get(circles).then((item) => {
            cy.get(item[0])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_changing'))
            cy.get(item[0])
                .children().should('have.text', 't')
            cy.get(item[1])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_default'))
            cy.get(item[1])
                .children().should('have.text', 'e')
            cy.get(item[2])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_default'))
            cy.get(item[2])
                .children().should('have.text', 's')
            cy.get(item[3])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_changing'))
            cy.get(item[3])
                .children().should('have.text', 't')
        })

        cy.tick(DELAY_IN_MS)

        cy.get(circles).then((item) => {
            cy.get(item[0])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_modified'))
            cy.get(item[0])
                .children().should('have.text', 't')
            cy.get(item[1])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_changing'))
            cy.get(item[1])
                .children().should('have.text', 'e')
            cy.get(item[2])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_changing'))
            cy.get(item[2])
                .children().should('have.text', 's')
            cy.get(item[3])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_modified'))
            cy.get(item[3])
                .children().should('have.text', 't')
        })

        cy.tick(DELAY_IN_MS)

        cy.get(circles).then((item) => {
            cy.get(item[0])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_modified'))
            cy.get(item[0])
                .children().should('have.text', 't')
            cy.get(item[1])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_modified'))
            cy.get(item[1])
                .children().should('have.text', 's')
            cy.get(item[2])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_modified'))
            cy.get(item[2])
                .children().should('have.text', 'e')
            cy.get(item[3])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_modified'))
            cy.get(item[3])
                .children().should('have.text', 't')
        })



    })


})