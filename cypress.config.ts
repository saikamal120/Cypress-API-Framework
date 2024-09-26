import { defineConfig } from 'cypress';

export default defineConfig({
    reporter: 'cypress-mochawesome-reporter',
    e2e: {
        supportFile: 'cypress/support/e2e.ts',
    },
    video: true,
    fixturesFolder: 'fixtures',
    env:{
        BOOKS_BASE_URL:'https://simple-books-api.glitch.me/books/',
        ORDERS_BASE_URL:'https://simple-books-api.glitch.me/orders',
        TOKEN_BASE_URL:'https://simple-books-api.glitch.me/api-clients/'
    }

})