# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 'http://0.0.0.0:3000/products' [GET]
- Show: 'http://0.0.0.0:3000/products/:id' [GET] 
- Create [token required]: 'http://0.0.0.0:3000/products' [POST] 
<!-- - [OPTIONAL] Top 5 most popular products  -->
<!-- - [OPTIONAL] Products by category (args: product category) -->

#### Users
- Index [token required]: 'http://0.0.0.0:3000/users' [GET] 
- Show [token required]: 'http://0.0.0.0:3000/users/:id' [GET] 
- Create 'http://0.0.0.0:3000/users' [POST] 

#### Orders
- Current Order by user (args: user id)[token required]: 'http://0.0.0.0:3000/orders/:userid' [GET]
<!-- - [OPTIONAL] Completed Orders by user (args: user id)[token required] -->

## Data Shapes
#### Products
- id: int
- name: varchar
- price: double precision
<!-- - [OPTIONAL] category -->

#### Users
- id: int
- firstName: varchar
- lastName: varchar
- password: varchar

#### Orders
- id: int
- id of each product in the order: int [foreign key to Product.id]
- quantity of each product in the order: int
- user_id: int [foreign key to User.id]
- status: (active or complete): int