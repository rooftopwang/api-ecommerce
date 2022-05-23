import { OrderDetail, OrderDetailStore } from '../OrderDetail'
import { User, UserStore } from '../User'
import { Order, OrderStore } from '../Order'
import { Product, ProductStore } from '../Product'

const store = new OrderDetailStore(); 

describe('OrderDetail Model', ()=>{
    it('should have an index method', ()=>{
        expect(store.index).toBeDefined()
    })

    it('should have an show method', ()=>{
        expect(store.show).toBeDefined()
    })

    it('should have an create method', ()=>{
        expect(store.create).toBeDefined()
    })

    it('should have an delete method', ()=>{
        expect(store.delete).toBeDefined()
    })

    const user: User = {
        id: 1, 
        firstname: 'testFirstName',
        lastname: 'testLastName',
        password: 'testPassword'
    }

    const order: Order = {
        id: 1,
        user_id: 1,
        status: 0
    }

    const product: Product = {
        id: 1,
        name: 'productTest',
        price: 100.01
    }

    const orderDetail: OrderDetail = {
        id: 1,
        order_id: 1, 
        product_id: 1, 
        quantity: 100
    }

    beforeAll(async function(done) {
        await new UserStore().create(user)
        await new ProductStore().create(product)
        await new OrderStore().create(order)
        done()
    })

    afterAll(async function(done) {
        await new OrderStore().delete(order.id.toString())
        await new UserStore().delete(user.id.toString())
        await new ProductStore().delete(product.id.toString())
        done()
    })

    describe('adding an element at the beginning and removing at the end', () => {
        beforeAll(async function(done){
            await store.create(orderDetail)
            done()
        })

        afterAll(async function(done){
            await store.delete('1')
            done()
        })

        it('index method should return a list of items', async (done) => {
            const rows = await store.index()
            expect(rows).toEqual([orderDetail])
            done()
        })
    
        it('show method should should list by id', async (done) => {
            const row = await store.show('1')
            expect(row).toEqual(orderDetail)
            done()
        })
    })

    describe('removing the element at the end', () => {
        afterAll(async function(done){
            await store.delete('1')
            done()
        })

        it('create method should add an item', async (done) => {
            const row: OrderDetail = await store.create(orderDetail)
            expect(row).toEqual(orderDetail)
            done()
        })
    })

    describe('adding an element at the beginning', () => {
        beforeAll(async function(done){
            await store.create(orderDetail)
            done()
        })
        
        it('delete method should be able to delete item', async (done) => {
            const rows = await store.delete('1')
            expect(rows).toEqual(orderDetail)
            done()
        })
    })
})