import { Order, OrderStore } from '../../models/Order'
import { User, UserStore } from '../../models/User'
import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)
const store = new OrderStore()

const user: User = {
    id: 15,
    firstname: 'test_firstname_15',
    lastname: 'test_lastname_15',
    password: 'test_password_15'
}

const order: Order = {
    id: 0,
    user_id: 15,
    status: 1
}

describe('Handler Orders: ', () => {
    beforeAll(async () => {
        const u: User = await new UserStore().create(user)
        user.id = u.id
    })

    afterAll(async () => {
        await new UserStore().delete(user.id.toString())
    })

    describe('Testing get method: /index /show: ', () => {
        beforeAll(async () => {
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

        it('show should return the specified element: ', async () => {
            await request.get(`/orders/${order.id.toString()}`)
            .expect('Content-Type', /json/)
            .then(data => {
                expect(data.body).toEqual(order)
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
            await request.post('/orders')
            .set('Authorization', `bearer ${token}`)
            .send(order)
            .expect('Content-Type', /json/)
            .then(data => {
                order.id = data.body.id
                expect(data.body).toEqual(order)
            })
        })
    })
})