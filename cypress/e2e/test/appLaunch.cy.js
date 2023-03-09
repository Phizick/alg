

describe('Application launch testing', () => {
    it('Application main page available', () => {
        cy.visit('/')
        cy.contains('МБОУ АЛГОСОШ')
    });

    it('Application string page available', () => {
        cy.visit('/recursion')
        cy.get("h3").should("have.text", "Строка")
    });

    it('Application fibonacci page available', () => {
        cy.visit('/fibonacci')
        cy.get("h3").should("have.text", "Последовательность Фибоначчи")
    });

    it('Application sorting page available', () => {
        cy.visit('/sorting')
        cy.get("h3").should("have.text", "Сортировка массива")
    });

    it('Application stack page available', () => {
        cy.visit('/stack')
        cy.get("h3").should("have.text", "Стек")
    });

    it('Application queue page available', () => {
        cy.visit('/queue')
        cy.get("h3").should("have.text", "Очередь")
    });

    it('Application list page available', () => {
        cy.visit('/list')
        cy.get("h3").should("have.text", "Связный список")
    });
})


