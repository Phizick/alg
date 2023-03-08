

describe('Application launch testing', () => {
    it('Application main page available', () => {
        cy.visit('http://localhost:3000/')
        cy.contains('МБОУ АЛГОСОШ')
    })

    it('Application string page available', () => {
        cy.visit('http://localhost:3000/recursion')
        cy.get("h3").should("have.text", "Строка")
    })

    it('Application fibonacci page available', () => {
        cy.visit('http://localhost:3000/fibonacci')
        cy.get("h3").should("have.text", "Последовательность Фибоначчи")
    })

    it('Application sorting page available', () => {
        cy.visit('http://localhost:3000/sorting')
        cy.get("h3").should("have.text", "Сортировка массива")
    })

    it('Application stack page available', () => {
        cy.visit('http://localhost:3000/stack')
        cy.get("h3").should("have.text", "Стек")
    })

    it('Application queue page available', () => {
        cy.visit('http://localhost:3000/queue')
        cy.get("h3").should("have.text", "Очередь")
    })

    it('Application list page available', () => {
        cy.visit('http://localhost:3000/list')
        cy.get("h3").should("have.text", "Связный список")
    })

})


