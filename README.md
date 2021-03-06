# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Environment Veriables
### Add the following into .env
```
POSTGRES_DRIVER=pg
POSTGRES_HOST=127.0.0.1
POSTGRES_PASSWORD=123123
POSTGRES_DB=e_commerce
POSTGRES_USER=myaccount
POSTGRES_DB_TEST=e_commerce_test
POSTGRES_USER_TEST=myaccount
BCRYPT_PASSWORD=QWER1234
SALT_ROUNDS=10
ENV=dev
TOKEN_SECRET=jwttoken123
DB_PORT=5432
```

## Setup
### Install packages: 
`yarn install`

## Setup DataBase
`CREATE USER myaccount WITH PASSWORD '123123'; `
`CREATE DATABASE e_commerce; `
`CREATE DATABASE e_commerce_test; `
`GRANT ALL PRIVILEGES ON DATABASE e_commerce TO myaccount`
`GRANT ALL PRIVILEGES ON DATABASE e_commerce_test TO myaccount`

## Set DB
`db-migrate up`

### To start the server: 
`yarn watch`

### To run test
`yarn test`

### Take advantage of the following token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJmaXJzdG5hbWUiOiJ0ZXN0X2ZpcnN0TmFtZV8yIiwibGFzdG5hbWUiOiJ0ZXN0X2xhc3ROYW1lXzIiLCJwYXNzd29yZCI6IiQyYiQxMCRoVHBNeS5oTjBiZDFSeHhSaG9ZamJPWEhTVTd4YUt2eTFXeDliYTZROGdDUXJSNDRsWGp5NiJ9LCJpYXQiOjE2NTQwNDc4MTB9.ylppsUXKw_G6FY6pW1yda8jxr3VY8BPtFI2wTOtZAMs

### Visiting the following address in brower to create an admin account: 
`http://0.0.0.0:3000/admin`

### Visiting the following address in brower to add default test cases (optional): 
`http://0.0.0.0:3000/testcase`

### Test is doing well
![alt text](./screenshot.png "screenshot")
