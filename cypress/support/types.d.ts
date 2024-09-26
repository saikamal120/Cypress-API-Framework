
declare namespace Cypress {
    interface Chainable<Subject> {
        propagate(token: string): void;
    }
}