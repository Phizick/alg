import {
    cyForm,
    cyInput,
    cySubmitBtn,
    cyClearBtn,
    cyRemoveBtn,
    cyCircleHead,
    cyCircleTail,
    circles
} from "../../cyConst/cyConst";
import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";



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

        cy.get(cyInput).type('0')
        cy.get(cySubmitBtn).click()
        cy.wait(SHORT_DELAY_IN_MS)

        cy.get(cyCircleHead).should($div => {
            expect($div).to.have.text('head')
        })

        cy.get(cyCircleTail).should($div => {
            expect($div).to.have.text('tail')
        })

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get(cyInput).type('1')
        cy.get(cySubmitBtn).click()
        cy.get(cyCircleHead)
            .first()
            .should($div => {
                expect($div).to.have.text('head')
            })
        cy.get(circles).contains('1').parent()
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_changing'))

        cy.get(cyCircleTail)
            .eq(1)
            .should($div => {
            expect($div).to.have.text('tail')
        })

        cy.get(circles).contains('0').parent()
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get(cyInput).type('2')
        cy.get(cySubmitBtn).click()
        cy.get(cyCircleHead)
            .first()
            .should($div => {
                expect($div).to.have.text('head')
            })
        cy.get(circles).contains('2').parent()
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_changing'))

        cy.get(cyCircleTail)
            .eq(2)
            .should($div => {
                expect($div).to.have.text('tail')
            })

        cy.get(circles).contains('1').parent()
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))



    })

    it('check for remove items to the queue', () => {

        cy.get(cyInput).type('0')
        cy.get(cySubmitBtn).click()
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get(cyInput).type('1')
        cy.get(cySubmitBtn).click()
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get(cyInput).type('2')
        cy.get(cySubmitBtn).click()

        cy.get(cyCircleHead)
            .first()
            .should($div => {
                expect($div).to.have.text('head')
            })
        cy.get(cyCircleTail)
            .eq(2)
            .should($div => {
                expect($div).to.have.text('tail')
            })

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get(cyRemoveBtn).click()

        cy.get(circles)
            .first()
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_changing'))

        cy.wait(SHORT_DELAY_IN_MS)

        cy.get(circles)
            .first()
            .should($div => {
                expect($div).to.have.text('')
            })
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))

    })

    it('queue cleanup check', () => {

        cy.get(cyInput).type('0')
        cy.get(cySubmitBtn).click()
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get(cyInput).type('1')
        cy.get(cySubmitBtn).click()
        cy.wait(SHORT_DELAY_IN_MS)
        cy.get(cyInput).type('2')
        cy.get(cySubmitBtn).click()

        cy.get(cyClearBtn).click()
        cy.wait(SHORT_DELAY_IN_MS)

        cy.get(circles).each($item => {
            expect($item).to.have.text('')
            expect($item).to.have.attr('class').contains('circle_default')
        })
    })



})