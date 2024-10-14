// @ts-ignore
export const getListOfBooks = (status, length) => {
    cy.request({
        method: 'GET',
        url: Cypress.env("URL") + "/books",
    }).then((response) =>{
        expect(response.status).to.eq(status);
        expect(response.body).has.length(length);
        cy.log('Response body structure:', JSON.stringify(response.body, null, 2))
        cy.log(response.body[0].name)
    })
}
// @ts-ignore
export const getSingleBook = (bookid, status) => {
    cy.request({
        method: 'GET',
        url: Cypress.env("URL") + "/books" + "/" + bookid,
        failOnStatusCode: false
    }).then((response) =>{
        expect(response.status).to.eq(status);
        cy.log('Response body structure:', JSON.stringify(response.body, null, 2))
        cy.log(response.body.name)
    })
}
