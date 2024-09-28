
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
export const getOrder = (authToken, orderNumber, status) => {
    cy.request({
        method: 'GET',
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
    bookingId: any;
    customerName: any;
    stausCode: number;
    constructor(authToken: string, bookingId: string, customerName: string, statusCode: number )
    {
        this.authToken  = authToken,
        this.bookingId = bookingId,
        this.customerName = customerName,
        this.stausCode = statusCode
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
                "bookId": this.bookingId,
                "customerName": this.customerName
            },
            failOnStatusCode:false
        }).then(response => {
            expect(response.status).to.eq(this.stausCode);
            cy.wrap(response.body.orderId).as("orderNumber")
        })
        return cy.get("@orderNumber");
    }
}
