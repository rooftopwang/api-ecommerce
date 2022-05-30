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
        id: 5, 
        firstname: 'test_firstName_5',
        lastname: 'test_lastName_5',
        password: 'test_password_5'
    }

    const order: Order = {
        id: 10,
        user_id: 5,
        status: 0
    }

    const product: Product = {
        id: 2,
        name: 'productTest',
        price: 100.01
    }

    const orderDetail: OrderDetail = {
        id: 0,
        order_id: 10, 
        product_id: 2, 
        quantity: 100
    }

    beforeAll(async function() {
        const u: User = await new UserStore().create(user)
        user.id = u.id
        const p: Product = await new ProductStore().create(product)
        product.id = p.id
        const o: Order = await new OrderStore().create(order)
        order.id = o.id
    })

    afterAll(async function() {
        await new OrderStore().delete(order.id.toString())
        await new UserStore().delete(user.id.toString())
        await new ProductStore().delete(product.id.toString())
    })

    describe('adding an element at the beginning and removing at the end: ', () => {
        beforeAll(async function(){
            const od: OrderDetail = await store.create(orderDetail)
            orderDetail.id = od.id
        })

        afterAll(async function(){
            await store.delete(orderDetail.id.toString())
        })

        it('index method should return a list of items', async () => {
            const rows = await store.index()
            expect(rows).toEqual([orderDetail])
        })
    
        it('show method should should list by id', async () => {
            const row = await store.show(orderDetail.id.toString())
            expect(row).toEqual(orderDetail)
        })
    })

    describe('removing the element at the end', () => {
        afterAll(async function(){
            await store.delete(orderDetail.id.toString())
        })

        it('create method should add an item', async () => {
            const row: OrderDetail = await store.create(orderDetail)
            orderDetail.id = row.id
            expect(row).toEqual(orderDetail)
        })
    })

    describe('adding an element at the beginning', () => {
        beforeAll(async function(){
            const od: OrderDetail = await store.create(orderDetail)
            orderDetail.id = od.id
        })
        
        it('delete method should be able to delete item', async () => {
            const rows = await store.delete(orderDetail.id.toString())
            expect(rows).toEqual(orderDetail)
        })
    })
})