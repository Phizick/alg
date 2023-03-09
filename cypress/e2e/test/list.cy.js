import {
    cyForm,
    cyListInput,
    cyIndexRemoveBtn,
    cyListIndexInput,
    cyHeadAddBtn,
    cyIndexAddBtn,
    cyHeadRemoveBtn,
    cyTailAddBtn,
    cyTailRemoveBtn,
    circles, cyCircleHead,
    cyCircleTail
} from "../../cyConst/cyConst";
import {DELAY_IN_MS, SHORT_DELAY_IN_MS} from "../../../src/constants/delays";

describe('testing the correct operation of the list component', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000/list')
    })

    it('inaccessibility of the submit button when the input value is empty', () => {
        cy.get(cyForm)
            .within(() => {
                cy.get(cyListInput).should('have.value', '')
                cy.get(cyHeadAddBtn).should('be.disabled')
                cy.get(cyTailAddBtn).should('be.disabled')
            })
    })

    it('checking the rendering of the default list', () => {
        cy.get(circles).should('have.length', 4)
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))
        cy.get(cyCircleHead)
            .first()
            .should($div => {
                expect($div).to.have.text('head')
            })
        cy.get(cyCircleTail)
            .eq(3)
            .should($div => {
                expect($div).to.have.text('tail')
            })
        cy.get(circles).then(item => {
            cy.get(item[0])
                .children().should('have.text', '0')
            cy.get(item[1])
                .children().should('have.text', '34')
            cy.get(item[2])
                .children().should('have.text', '8')
            cy.get(item[3])
                .children().should('have.text', '1')
        })
        cy.wait(DELAY_IN_MS)
    })

    it('checking the correct addition of the item to the head', () => {
        cy.get(cyListInput).type('0')
        cy.get(cyHeadAddBtn).click()

        cy.wait(SHORT_DELAY_IN_MS)
        cy.get(circles).then(item => {
            cy.get(item[0])
                .children().should('have.text', '0')
            cy.get(item[0])
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_modified'))
        })
        cy.wait(DELAY_IN_MS)
    })

    it('checking the correct addition of the item to the tail', () => {
        cy.get(cyListInput).type('9')
        cy.get(cyTailAddBtn).click()

        cy.wait(SHORT_DELAY_IN_MS)
        cy.get(circles).then(item => {
            cy.get(item[4])
                .children().should('have.text', '9')
            cy.get(item[4])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_modified'))
        })
        cy.wait(DELAY_IN_MS)
    })

    it('checking correct removal of the item from the head', () => {
        cy.get(cyHeadRemoveBtn).click()
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get(circles).then(item => {
            cy.get(item[0])
                .children().should('have.text', '34')
            cy.get(item[1])
                .children().should('have.text', '8')
            cy.get(item[2])
                .children().should('have.text', '1')
        })
        cy.wait(DELAY_IN_MS)
    })

    it('checking correct removal of the item from the tail', () => {
        cy.get(cyTailRemoveBtn).click()
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get(circles).then(item => {
            cy.get(item[0])
                .children().should('have.text', '0')
            cy.get(item[1])
                .children().should('have.text', '34')
            cy.get(item[2])
                .children().should('have.text', '8')
        })
        cy.wait(DELAY_IN_MS)
    })



    it('check for adding an item by index', () => {
        cy.get(cyListIndexInput).type(2)
        cy.get(cyListInput).type('4')
        cy.get(cyIndexAddBtn).click()
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get(circles).then(item => {
            cy.get(item[0])
                .children().should('have.text', '4')
            cy.get(item[0])
                .invoke('attr','class')
                .then(classList => expect(classList).contains('circle_changing'))
            cy.get(item[1])
                .children().should('have.text', '0')
            cy.get(item[1])
                .invoke('attr','class')
                .then(classList => expect(classList).contains('circle_changing'))
            cy.get(item[2])
                .children().should('have.text', '34')
            cy.get(item[2])
                .invoke('attr','class')
                .then(classList => expect(classList).contains('circle_default'))
        })
    })

    it('check for removing an item by index', () => {
        cy.get(cyListIndexInput).type(2)
        cy.get(cyIndexRemoveBtn).click()
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get(circles).then(item => {
            cy.get(item[0])
                .children().should('have.text', '0')
            cy.get(item[0])
                .invoke('attr','class')
                .then(classList => expect(classList).contains('circle_changing'))
            cy.wait(SHORT_DELAY_IN_MS)
            cy.get(item[1])
                .children().should('have.text', '34')
            cy.get(item[1])
                .invoke('attr','class')
                .then(classList => expect(classList).contains('circle_changing'))
            cy.wait(SHORT_DELAY_IN_MS)
            cy.get(item[2])
                .children().should('have.text', '1')
            cy.get(item[2])
                .invoke('attr','class')
                .then(classList => expect(classList).contains('circle_default'))
        })
    })

})