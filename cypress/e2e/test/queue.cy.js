import {
    CY_FORM,
    CY_INPUT,
    CY_SUBMIT_BTN,
    CY_CLEAR_BTN,
    CY_REMOVE_BTN,
    CY_CIRCLE_HEAD,
    CY_CIRCLE_TAIL,
    CIRCLES
} from "../../cyConst/cyConst";
import {SHORT_DELAY_IN_MS} from "../../../src/constants/delays";

describe('testing the correct operation of the queue component', () => {

    beforeEach(() => {
        cy.visit('/queue')
    });

    it('inaccessibility of the submit button when the input value is empty', () => {
        cy.get(CY_FORM)
            .within(() => {
                cy.get(CY_INPUT).should('have.value', '');
                cy.get(CY_SUBMIT_BTN).should('be.disabled');
                cy.get(CY_REMOVE_BTN).should('be.disabled');
                cy.get(CY_CLEAR_BTN).should('be.disabled');
            });
    });

    it('check for adding items to the queue', () => {

        cy.clock();
        cy.get(CY_INPUT).type('0');
        cy.get(CY_SUBMIT_BTN).click();
        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(CY_CIRCLE_HEAD).should($div => {
            expect($div).to.have.text('head')
        });

        cy.get(CY_CIRCLE_TAIL).should($div => {
            expect($div).to.have.text('tail')
        });

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(CY_INPUT).type('1');
        cy.get(CY_SUBMIT_BTN).click();
        cy.get(CY_CIRCLE_HEAD)
            .first()
            .should($div => {
                expect($div).to.have.text('head')
            });
        cy.get(CIRCLES).contains('1').parent()
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_changing'));

        cy.get(CY_CIRCLE_TAIL)
            .eq(1)
            .should($div => {
            expect($div).to.have.text('tail')
        });

        cy.get(CIRCLES).contains('0').parent()
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'));

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(CY_INPUT).type('2');
        cy.get(CY_SUBMIT_BTN).click();
        cy.get(CY_CIRCLE_HEAD)
            .first()
            .should($div => {
                expect($div).to.have.text('head')
            });
        cy.get(CIRCLES).contains('2').parent()
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_changing'));

        cy.get(CY_CIRCLE_TAIL)
            .eq(2)
            .should($div => {
                expect($div).to.have.text('tail')
            });

        cy.get(CIRCLES).contains('1').parent()
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'));
    });

    it('check for remove items to the queue', () => {
        cy.clock();
        cy.get(CY_INPUT).type('0');
        cy.get(CY_SUBMIT_BTN).click();

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(CY_INPUT).type('1');
        cy.get(CY_SUBMIT_BTN).click();

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(CY_INPUT).type('2');
        cy.get(CY_SUBMIT_BTN).click();

        cy.get(CY_CIRCLE_HEAD)
            .first()
            .should($div => {
                expect($div).to.have.text('head')
            });
        cy.get(CY_CIRCLE_TAIL)
            .eq(2)
            .should($div => {
                expect($div).to.have.text('tail')
            });

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(CY_REMOVE_BTN).click();

        cy.get(CIRCLES)
            .first()
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_changing'));

        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(CIRCLES)
            .first()
            .should($div => {
                expect($div).to.have.text('')
            })
            .invoke('attr', 'class')
            .then(classList => expect(classList).contains('circle_default'));
    });

    it('queue cleanup check', () => {
        cy.clock();
        cy.get(CY_INPUT).type('5');
        cy.get(CY_SUBMIT_BTN).click();

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(CY_INPUT).type('8');
        cy.get(CY_SUBMIT_BTN).click();

        cy.tick(SHORT_DELAY_IN_MS);
        cy.get(CY_INPUT).type('22');
        cy.get(CY_SUBMIT_BTN).click();

        cy.get(CY_CLEAR_BTN).click();
        cy.tick(SHORT_DELAY_IN_MS);

        cy.get(CIRCLES).each($item => {
            expect($item).to.have.text('');
            expect($item).to.have.attr('class').contains('circle_default');
        });
    });
})