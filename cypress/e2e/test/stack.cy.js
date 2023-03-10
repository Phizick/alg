
import {CY_FORM, CY_INPUT, CY_SUBMIT_BTN, CIRCLES, CY_CLEAR_BTN, CY_REMOVE_BTN} from "../../cyConst/cyConst";
import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";

describe('testing the correct operation of the stack component', () => {

    beforeEach(() => {
        cy.visit('/stack')
    });

    it('inaccessibility of the submit button when the input value is empty', () => {
        cy.get(CY_FORM)
            .within(() => {
                cy.get(CY_INPUT).should('have.value', '');
                cy.get(CY_SUBMIT_BTN).should('be.disabled');
            })
    });

    const addItem = (value) => {
        cy.clock();
        cy.get(CY_FORM)
            .within(() => {
                cy.get(CY_INPUT).type(value)
                cy.wait(Number(SHORT_DELAY_IN_MS))
            });
        cy.get(CY_FORM)
            .within(() => {
                cy.get(CY_SUBMIT_BTN).click()
            });
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(CIRCLES).contains(value).parent()
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_changing'))
        cy.tick(SHORT_DELAY_IN_MS);
    };

    it('check for adding items to the stack', () => {
        cy.clock();
        addItem('0');
        cy.get(CIRCLES)
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'))

        addItem('1');
        cy.get(CIRCLES).then(item => {
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
        });

        addItem('2');
        cy.get(CIRCLES).then(item => {
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
        });
    });

    it('check for remove items to the stack', () => {
        cy.clock();
        addItem('1');
        cy.tick(SHORT_DELAY_IN_MS);
        addItem('2');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(CY_REMOVE_BTN).click();
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(CIRCLES).then(item => {
            cy.get(item[0])
                .invoke('attr', 'class')
                .then(classList => expect(classList).contains('circle_default'));
            cy.get(item[0])
                .children().should('have.text', '1');
        });
    });

    it('check for clear stack', () => {
        cy.clock();
        addItem('1');
        cy.tick(SHORT_DELAY_IN_MS);
        addItem('2');
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(CY_CLEAR_BTN).click();
        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(CIRCLES).should('have.length', 0);
    });
})