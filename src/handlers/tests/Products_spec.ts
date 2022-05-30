import { Product, ProductStore } from '../../models/Product'
import supertest from 'supertest'
import app from '../../server'
import bcrypt from 'bcrypt'

const request = supertest(app)
const store = new ProductStore()
const product: Product = {
    id: 0,
    name: 'test_product',
    price: 10.1
}

describe('Handler Products: ', () => {
    describe('Testing get method: /index /show: : ', () => {
        beforeAll(async (done) => {
            const p: Product = await store.create(product)
            product.id = p.id
            done()
        })
    
        afterAll(async (done) => {
            await store.delete(product.id.toString())
            done()
        })

        it('index should return all elements: ', async (done) => {
            request.get('/products')
            .expect('Content-Type', /json/)
            .then(data => {
                expect(data.body).toEqual([product])
                done()
            })
        })
    })
})