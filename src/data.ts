// data for test purpose
import { User } from './models/User'
import { Product } from './models/Product'
import { Order } from './models/Order'

const users: User[] = [
    {
        id: 1001, 
        firstname: 'test_firstname_1001',
        lastname: 'test_lastname_1001',
        password: 'test_password_1001'
    },
    {
        id: 1002, 
        firstname: 'test_firstname_1002',
        lastname: 'test_lastname_1002',
        password: 'test_password_1002'
    }
]

const products: Product[] = [
    {
        id: 1001,
        name: 'test_product_1001',
        price: 1001.1
    },
    {
        id: 1002,
        name: 'test_product_1002',
        price: 1002.1
    },
    {
        id: 1003,
        name: 'test_product_1003',
        price: 1003.1
    },
    {
        id: 1004,
        name: 'test_product_1004',
        price: 1004.1
    },
    {
        id: 1005,
        name: 'test_product_1005',
        price: 1005.1
    }
]

const orders: Order[] = [
    {
        id: 1001,
        product_id: 1001,
        quantity: 1,
        user_id: 1001,
        status: 1
    },
    {
        id: 1002,
        product_id: 1002,
        quantity: 2,
        user_id: 1001,
        status: 1
    },
    {
        id: 1003,
        product_id: 1003,
        quantity: 3,
        user_id: 1001,
        status: 0
    },
    {
        id: 1004,
        product_id: 1004,
        quantity: 4,
        user_id: 1002,
        status: 1
    },
    {
        id: 1005,
        product_id: 1005,
        quantity: 5,
        user_id: 1002,
        status: 0
    }
]

export { users, products, orders }