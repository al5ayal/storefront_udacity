# StoreFront API

online storefront to showcase products

## Installation

### Copy .env.example to .env
edit the database/server information
### install Packages
install using npm or yarn.
```bash
npm install
```

### run migrations
```
npx db-migrate up
```

## Available Scripts
### Build and start server from the build directory
```bash
npm run start
```
### Starting dev server from src folder
```bash
npm run dev
```
### Build The project (default output dist folder in the root directory)
```bash
npm run build
```
### Unit Testing
```bash
npm run test
```

## Main End Points
### Auth End Points
#### POST /api/login
Log the user in requires request body of
```
{
    "login": "", // can be username or email
    "password": ""
}
```
#### POST /api/register
register new user requires request body of
```
{
    "first_name": "",
    "last_name": "",
    "username": "",
    "email": "",
    "password": ""
}
```
### Users ENDPOINTS [requires token provided by login endpoint]
#### GET /api/users
return list of available users
#### GET /api/users/id [parameter user id]
return the matched user information
#### POST /api/users 
creates a new user requires request body of
```
{
    "first_name": "",
    "last_name": "",
    "username": "",
    "email": "",
    "password": ""
}
```
#### DELETE /api/users/[userid]
deletes the selected user

### Product Category ENDPOINTS
#### GET /api/category
return list of available categories
#### GET /api/category/id [parameter category id]
return the matched category information
#### POST /api/category 
creates a new category requires request body of
```
{
    "name":"",
    "description": ""
}
```
#### DELETE /api/category/[categoryid]
deletes the selected category

### Products ENDPOINTS
#### GET /api/Products
return list of available categories
#### GET /api/Products/id [parameter Product id]
return the matched Product information
#### POST /api/Products 
creates a new Product requires request body of
```
{
    "name": "",
    "category_id": , //should be already exist or added in the previous endpoint
    "price": ,
    "description": ""
}
```
#### DELETE /api/Products/[Products id]
deletes the selected Product

### orders ENDPOINTS [requires token provided by login endpoint]
#### GET /api/orders
return list of available logged in user orders
#### GET /api/orders/id [parameter order id]
return the matched order information
#### POST /api/orders 
creates a new order for the current authenticated User[token] requires request body of
```
{
    "order_details": [
        {
            "product_id": 6,
            "quantity": 2
        },
        {
            "product_id": 7,
            "quantity": 3
        },
        {
            "quantity": 5,
            "product_id": 8
        }
    ]
}
```
#### PUT /api/orders/[order id]
update the matched order requires request body
```
{
   "status":"active|completed"
}
```
#### GET /api/orders/[completed
return a list of completed orders
#### DELETE /api/orders/[order id]
deletes the selected orders

## Tests Avaiable
### Test All above end Points
### Tests for all Models methods

## Dependencies used
### bcrypt
### cors
### db-migrate
### db-migrate-pg
### dotenv
### express
### helmet
### jsonwebtoken
### morgan
### pg
### pg-format