import {DELAY_IN_MS} from "../../../src/constants/delays";


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

    // it('check for correct string reversal',  () => {
    //     cy.clock()
    //     cy.get(cyForm)
    //         .within(() => {
    //             cy.get(cyInput).type('test')
    //             cy.get(cySubmitBtn).click()
    //         })
    //
    //
    // })

    it("button disabled on initial open", () => {
        cy.get(cySubmitBtn).should("be.disabled")
    })

    it("reverse string", () => {
        cy.clock()
        cy.get(cyInput).type("test")
        cy.get(cyInput).should("have.value", "test")
        cy.get(cySubmitBtn).click()
        cy.get('[data-cy="circles"]').as("circles")



        cy.get("@circles").should(($circle) => {
            expect($circle.eq(0)).to.have.text("t1").and.css("border-color", 'rgb(41, 41, 41)')
            expect($circle.eq(1)).to.have.text("e2").and.css("border-color", 'rgb(41, 41, 41)')
            expect($circle.eq(2)).to.have.text("s3").and.css("border-color", 'rgb(41, 41, 41)')
            expect($circle.eq(3)).to.have.text("t4").and.css("border-color", 'rgb(41, 41, 41)')
        })
        cy.tick(DELAY_IN_MS)
        cy.get("@circles").should(($circle) => {
            expect($circle.eq(0)).to.have.text("t1").and.css("border-color", 'rgb(41, 41, 41)')
            expect($circle.eq(1)).to.have.text("e2").and.css("border-color", 'rgb(41, 41, 41)')
            expect($circle.eq(2)).to.have.text("s3").and.css("border-color", 'rgb(41, 41, 41)')
            expect($circle.eq(3)).to.have.text("t4").and.css("border-color", 'rgb(41, 41, 41)')
        })
        cy.tick(DELAY_IN_MS)
        cy.get("@circles").should(($circle) => {
            expect($circle.eq(0)).to.have.text("t1").and.css("border-color", 'rgb(41, 41, 41)')
            expect($circle.eq(1)).to.have.text("s2").and.css("border-color", 'rgb(41, 41, 41)')
            expect($circle.eq(2)).to.have.text("e3").and.css("border-color", 'rgb(41, 41, 41)')
            expect($circle.eq(3)).to.have.text("t4").and.css("border-color", 'rgb(41, 41, 41)')
        })
    })


})