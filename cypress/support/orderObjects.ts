
// @ts-ignore
export const getAllOrders = (authToken) => {
    cy.request({
        method: 'GET',
        url: Cypress.env("ORDERS_BASE_URL"),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    }).then((response) =>{
        expect(response.status).to.eq(200);
    })
}

// @ts-ignore
export const getOrder = (authToken, orderNumber, customerName, status) => {
    cy.request({
        method: 'GET',
        url: (Cypress.env("ORDERS_BASE_URL") +'/'+ orderNumber),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        }
    }).then((response) =>{
        expect(response.status).to.eq(status);
        expect(response.body.customerName).to.eq(customerName);
    })
}

// @ts-ignore
export const updatingAnOrder = (authToken, orderNumber, customerName, status) => {
    cy.request({
        method: 'PATCH',
        url: Cypress.env("ORDERS_BASE_URL") +'/'+ orderNumber,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
        body:{
            "bookId": 1,
            "customerName": customerName
        },
        failOnStatusCode: false
    }).then((response) =>{
        expect(response.status).to.eq(status)
    })
}

// @ts-ignore
export const deleteAnOrder = (authToken, orderNumber, status) => {
    cy.request({
        method: 'DELETE',
        url: (Cypress.env("ORDERS_BASE_URL") +'/'+ orderNumber),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + authToken
        },
        failOnStatusCode: false
    }).then((response) =>{
        expect(response.status).to.eq(status);
    })
}

export class APIRequest {
    makeLoginRequest(){
        cy.request({
            method: 'POST',
            url: Cypress.env("TOKEN_BASE_URL"),
            headers: {'Content-Type': 'application/json'},
            body: {
                "clientName": 1,
                "clientEmail": Math.random().toString(5).substring(2) + "@gmail.com"
            },
        }).then(response => {
            expect(response.status).to.eq(201);
            //console.log(response.body.accessToken);
            expect(response.body).to.have.property('accessToken');
            cy.wrap(response.body.accessToken).as("token")
        })
        return cy.get("@token");
    }
}

export class submitOrder {
    authToken: string;
    bookingid: any;
    customerName: any;
    constructor(authToken: string, bookingid: string, customerName: string )
    {
        this.authToken  = authToken,
        this.bookingid = bookingid,
        this.customerName = customerName
    }
    makeOrderSubmit(){
        cy.request({
            method: 'POST',
            url: Cypress.env("ORDERS_BASE_URL"),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.authToken
            },
            body: {
                "bookId": this.bookingid,
                "customerName": this.customerName
            }
        }).then(response => {
            expect(response.status).to.eq(201);
            expect(response.body.created).to.eq(true);
            cy.wrap(response.body.orderId).as("orderNumber")
        })
        return cy.get("@orderNumber");
    }
}
