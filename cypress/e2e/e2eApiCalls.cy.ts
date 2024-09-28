import * as callsOnOrders from "../support/orderObjects";
import {APIRequest, submitOrder} from "../support/orderObjects";
import * as callsOnBooks from "../support/booksObjects";


describe('Simple Books API with list of books, new orders, update orders and delete orders', () => {
        var authToken: any;
        var orderNumber1: any;
        var orderNumber2: any;
        var orderNumber3: 'qwerty';

       before(("capture access token"), function () {
            //creating new token every time the script runs and pass token to next textcases
            const apiToken = new APIRequest();
            apiToken.makeLoginRequest().then(function ($token) {
                authToken = $token;
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
        //Negitive - error upon exceeding limit of book list
        callsOnBooks.getSingleBook(7,404);
       })
       it(("Submit an Order, orderNumber1"), () => {
            // Submit an order and fetch oder details and pass to next testcases
           const orderNum = new submitOrder(authToken,'1','RAM')
           orderNum.makeOrderSubmit().then(function ($order) {
               orderNumber1 = $order;
           })
       })
       it(("Submit an Order, orderNumber2"), () => {
            // Submit an order and fetch oder details and pass to next testcases
            const orderNum = new submitOrder(authToken,'1','ROM')
            orderNum.makeOrderSubmit().then(function ($order) {
            orderNumber2 = $order;
            })
       })
       it('Get all orders', () => {
            // Get all orders
            callsOnOrders.getAllOrders(authToken);
       })
       it('Get an order, order number 1', () => {
            //Getting an order response
            callsOnOrders.getOrder(authToken, orderNumber1, 'RAM',200);
       })
       it('Get an order, order number 2', () => {
             //Getting an order response
             callsOnOrders.getOrder(authToken, orderNumber2, 'ROM',200);
       })
       it('Update an order', () => {
            callsOnOrders.updatingAnOrder(authToken, orderNumber2, 'ROCK',204);
       })
       it('Update an order, with invalid order number', () => {
            callsOnOrders.updatingAnOrder(authToken, orderNumber3, 'ROCK',404);
       })
       it('Get an order after update', () => {
            callsOnOrders.getOrder(authToken, orderNumber2, 'ROCK',200);
       })
       it('Delete order after update', () => {
            callsOnOrders.deleteAnOrder(authToken, orderNumber2,204);
       })
       it('Delete order that is already deleted', () => {
            // Negitive case on delete call
            callsOnOrders.deleteAnOrder(authToken, orderNumber2,404);
       })
    })
