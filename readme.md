Simple Books API

This repo contains an example of cypress api project , with the tests written in Cypress.

There are 3 main api's in this project 

BOOKS_BASE_URL=https://simple-books-api.glitch.me/books
ORDERS_BASE_URL=https://simple-books-api.glitch.me/orders
TOKEN_BASE_URL=https://simple-books-api.glitch.me/api-clients/

Scenarios covered in the project are below:
Where Token api (TOKEN_BASE_URL) is for token creation for accessing remaining api calls 
And Books api (ORDERS_BASE_URL) is basically for 
GET the books in call, 
GET the maximum list, 
Error check on exceeding the limit 
And order api (TOKEN_BASE_URL) is for 
POST an Order1, 
POST another Order2, 
GET the order1, 
GET the order2,
PATCH an Order with update, 
Update and invaild order, 
Delete the order, 
Delete an invalid order

Created function files for books and orders seperatly for clear understanding ie booksObjects.ts and orderObjects.ts

# Installations and Project Setup
The steps below will take you all the way through Cypress. 

If you get stuck, here is more help:

Follow these instructions to install Cypress.

Clone this repo

## clone this repo to a local directory
git clone https://github.com/saikamal120/Cypress-API-Framework.git

## cd into the cloned repo
cd Cypress-API-Framework.git

## install the node_modules
npm install

## install cypress 
npm install cypress --save-dev

For all testcases combined, I've created one testrunner file e2eApiCalls.cy.ts 

we can run the file by executing "cypress open" upon selecting available browser or can be run directly on headless mode by executing "cypress run" 
