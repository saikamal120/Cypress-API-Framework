import { defineConfig } from 'cypress';

export default defineConfig({
    reporter: 'cypress-mochawesome-reporter',
    e2e: {
        supportFile: 'cypress/support/e2e.ts',
    },
    video: true,
    fixturesFolder: 'fixtures',
    env:{
        URL: 'https://simple-books-api.glitch.me'
    }

})
