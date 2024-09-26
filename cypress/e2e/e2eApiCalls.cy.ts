import * as callsOnOrders from "../support/orderObjects";
import {APIRequest, submitOrder} from "../support/orderObjects";
import * as callsOnBooks from "../support/booksObjects";


describe('Simple Books API with list of books, new orders, update orders and delete orders', () => {
        var authToken: any;
        var orderNumber: any;

        before(("capture access token"), function () {
            //creating new token every time the script runs and pass token to next textcases
            const apiToken = new APIRequest();
            apiToken.makeLoginRequest().then(function ($token) {
                cy.log("test token", $token);
                authToken = $token;
                console.log(authToken);
            })
        })
       it(("Submit an Order"), () => {
            // Submit an order and fetch oder details and pass to next testcases
           const orderNum = new submitOrder(authToken)
           orderNum.makeOrderSubmit().then(function ($order) {
               cy.log("order number", $order);
               orderNumber = $order;
               console.log(orderNumber);
           })
        })
        it('List of books', () => {
            //List of books available in API
            callsOnBooks.getListOfBooks(200,6);
        })
        it('Get a single book', () => {
            //get single book information based on bookid
            callsOnBooks.getSingleBook(1,200);
        })
        it('Error on exceeding the list ', () => {
            //error upon exceeding limit of book list
            callsOnBooks.getSingleBook(7,404);

        })
        it('Get all orders', () => {
             // Get all orders
             callsOnOrders.getAllOrders(authToken);
         })
        it('Get an order', () => {
             //Getting an order response
              callsOnOrders.getOrder(authToken, orderNumber, 'SAIKA');
         })
        it('Update an order', () => {
            //Getting response
            callsOnOrders.updatingAnOrder(authToken, orderNumber, 'SAI');
        })
        it('Get an order after update', () => {
            //Getting response
            callsOnOrders.getOrder(authToken, orderNumber, 'SAI');
        })
        it('Delete order after update', () => {
            //Getting response
            callsOnOrders.deleteAnOrder(authToken, orderNumber);
        })
    })