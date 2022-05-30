import { Product, ProductStore } from '../../models/Product'
import { User, UserStore } from '../../models/User'
import supertest from 'supertest'
import app from '../../server'
import bcrypt from 'bcrypt'

const request = supertest(app)
const store = new ProductStore()
const product: Product = {
    id: 0,
    name: 'test_product_1',
    price: 10.1
}

describe('Handler Products: ', () => {
    describe('Testing get method: /index /show: : ', () => {
        beforeAll(async () => {
            const p: Product = await store.create(product)
            product.id = p.id
        })
    
        afterAll(async () => {
            await store.delete(product.id.toString())
        })

        it('index should return all elements: ', async () => {
            await request.get('/products')
            .expect('Content-Type', /json/)
            .then(data => {
                expect(data.body).toEqual([product])
            })
        })

        it('show should return the specified element: ', async () => {
            await request.get(`/products/${product.id.toString()}`)
            .expect('Content-Type', /json/)
            .then(data => {
                expect(data.body).toEqual(product)
            })
        })
    })

    describe('all should fail when not being authenticated', () => {
        it('create should fail: ', async () => {
            await request.post('/products')
            .send(product)
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
            await store.delete(product.id.toString())
            await new UserStore().delete(admin.id.toString())
        })

        it('create should create an element: ', async () => {
            await request.post('/products')
            .set('Authorization', `bearer ${token}`)
            .send(product)
            .expect('Content-Type', /json/)
            .then(data => {
                product.id = data.body.id
                expect(data.body).toEqual(product)
            })
        })
    })
})