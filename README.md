# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Environment Veriables
### Add the following into .env
```
POSTGRES_DRIVER=pg
POSTGRES_HOST=127.0.0.1
POSTGRES_PASSWORD=7717
POSTGRES_DB=e_commerce
POSTGRES_USER=myaccount
POSTGRES_DB_TEST=e_commerce_test
POSTGRES_USER_TEST=myaccount
BCRYPT_PASSWORD=QWER1234
SALT_ROUNDS=10
ENV=dev
TOKEN_SECRET=jwttoken123
```

## Postgres pgAdmin console
### Follow the environment variables in the previous section and create account and db on pgAdmin. 

## Setup
### Install packages: 
`yarn install`

To start the server: 
`yarn watch`

Visiting the following address in brower to create an admin account: 
`http://0.0.0.0/admin`

Visiting the following address in brower to add default test cases (optional): 
`http://0.0.0.0/testcase`