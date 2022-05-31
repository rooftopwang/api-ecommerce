import { Order, OrderStore } from '../../models/Order'
import { User, UserStore } from '../../models/User'
import { Product, ProductStore } from '../../models/Product'
import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)
const store = new OrderStore()

const user: User = {
    id: 150,
    firstname: 'test_firstname_150',
    lastname: 'test_lastname_150',
    password: 'test_password_150'
}

const product: Product = {
    id: 300,
    name: 'test_product_300',
    price: 233
}

const order: Order = {
    id: 180,
    product_id: 300,
    quantity: 666, 
    user_id: 150,
    status: 1
}

describe('Handler Orders: ', () => {
    beforeAll(async () => {
        const u: User = await new UserStore().create(user)
        user.id = u.id
        const p: Product = await new ProductStore().create(product)
        product.id = p.id
    })

    afterAll(async () => {
        await new UserStore().delete(user.id.toString())
        await new ProductStore().delete(product.id.toString())
    })

    describe('Testing get method: /index: ', () => {
        beforeAll(async () => {
            order.product_id = product.id
            order.user_id = user.id
            const o: Order = await store.create(order)
            order.id = o.id
        })
    
        afterAll(async () => {
            await store.delete(order.id.toString())
        })

        it('index should return all elements: ', async () => {
            await request.get('/orders')
            .expect('Content-Type', /json/)
            .then(data => {
                expect(data.body).toEqual([order])
            })
        })
    })

    describe('all should fail when not being authenticated', () => {
        it('create should fail: ', async () => {
            await request.post('/orders')
            .send(order)
            .expect(401)
        })
    })

    describe('all should pass when being authenticated: ', () => {
        let token = ''
        const admin: User = {
            id: 1, 
            firstname: 'admin_firstname', 
            lastname: 'admin_lastname',
            password: 'admin_password'
        }

        beforeAll(async () => {
            const u = await new UserStore().create(admin)
            admin.id = u.id

            await request.post('/authenticate')
            .send({
                firstname: admin.firstname, 
                lastname: admin.lastname,
                password: admin.password
            })
            .then(data => {
                token = data.body.toString()
            })
        })
    
        afterAll(async () => {
            await store.delete(order.id.toString())
            await new UserStore().delete(admin.id.toString())
        })

        it('create should create an element: ', async () => {
            order.product_id = product.id
            order.user_id = user.id

            await request.post('/orders')
            .set('Authorization', `bearer ${token}`)
            .send(order)
            .expect('Content-Type', /json/)
            .then(data => {
                order.id = data.body.id
                expect(data.body).toEqual(order)
            })
        })

        it('show should return all orders by user: ', async () => {
            await request.get(`/orders/${user.id.toString()}`)
            .set('Authorization', `bearer ${token}`)
            .expect('Content-Type', /json/)
            .then(data => {
                expect(data.body).toEqual([order])
            })
        })
    })
})