import * as callsOnOrders from "../support/orderObjects";
import {APIRequest, submitOrder} from "../support/orderObjects";

describe('Simple Books API with list of books, new orders, update orders and delete orders', () => {
    var authToken: any;

    before(("capture access token"), function () {
        //creating new token every time the script runs and pass token to next textcases
        const apiToken = new APIRequest();
        apiToken.makeLoginRequest().then(function ($token) {
            authToken = $token;
        })
    })
    function getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    it(("Complex successful test case to submit three Orders, get all orders then update third order, then Get it, then delete second order and then Get all remaining orders"), () => {
    // Submit an order and fetch oder details and pass to next testcases
    let orderNumber2: any;
    let cypressTestUser = 'CypressTestUser_';
    const orderNum1 = new submitOrder(authToken,'1', cypressTestUser+ getRandomNumber(1,10),201)
    const orderNum2 = new submitOrder(authToken,'1',cypressTestUser+ getRandomNumber(1,10),201)
    const orderNum3 = new submitOrder(authToken,'1',cypressTestUser+ getRandomNumber(1,10),201)
    orderNum1.makeOrderSubmit().then(function ($order) {
        orderNum2.makeOrderSubmit().then(function ($order) {
            orderNumber2 = $order;
            orderNum3.makeOrderSubmit().then(function ($order) {
                callsOnOrders.getAllOrders(authToken);
                callsOnOrders.updatingAnOrder(authToken, $order, 'Sam', 204);
                callsOnOrders.getOrder(authToken, $order, 200);
            })
            callsOnOrders.deleteAnOrder(authToken, orderNumber2, 204);
            callsOnOrders.getAllOrders(authToken);
        })
    })
    })

})
