
// @ts-ignore
export const getListOfBooks = (status, length) => {
    cy.request({
        method: 'GET',
        url: Cypress.env("BOOKS_BASE_URL"),
    }).then((response) =>{
        expect(response.status).to.eq(status);
        expect(response.body).has.length(length);
        cy.log('Response body structure:', JSON.stringify(response.body, null, 2))
    })
}
// @ts-ignore
export const getSingleBook = (bookid, status) => {
    cy.request({
        method: 'GET',
        url: Cypress.env("BOOKS_BASE_URL")+bookid,
        failOnStatusCode: false
    }).then((response) =>{
        expect(response.status).to.eq(status);
        cy.log('Response body structure:', JSON.stringify(response.body, null, 2))
    })
}
