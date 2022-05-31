import { Order, OrderStore } from '../Order'
import { Product, ProductStore } from '../Product';
import { User, UserStore }  from '../User'

const store = new OrderStore(); 

describe('Order Model', ()=>{
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
        id: 500, 
        firstname: 'testFirstName',
        lastname: 'testLastName',
        password: 'testPassword'
    }

    const product: Product = {
        id: 50, 
        name: 'test_product_50',
        price: 130.5
    }

    const order: Order = {
        id: 0,
        product_id: 50, 
        quantity: 1000, 
        user_id: 500,
        status: 1
    }

    beforeAll(async function() {
        const u: User = await new UserStore().create(user)
        user.id = u.id
        const p: Product = await new ProductStore().create(product)
        product.id = p.id
    })

    afterAll(async function() {
        await new UserStore().delete(user.id.toString())
        await new ProductStore().delete(product.id.toString())
    })

    describe('adding an element at the beginning and removing at the end', () => {
        beforeAll(async function() {
            order.product_id = product.id
            order.user_id = user.id
            const o: Order = await store.create(order)
            order.id = o.id
        })

        afterAll(async function() {
            await store.delete(order.id.toString())
        })

        it('index method should return a list of items', async () => {
            const rows = await store.index()
            expect(rows).toEqual([order])
        })
    
        it('show method should should list by id', async () => {
            const row = await store.show(order.id.toString())
            order.id = row.id
            expect(row).toEqual(order)
        })
    })

    describe('removing the element at the end: ', () => {
        afterAll(async function(){
            await store.delete(order.id.toString())
        })

        it('create method should add an item', async () => {
            const row: Order = await store.create(order)
            order.id = row.id
            expect(row).toEqual(order)
        })
    })

    describe('adding an element at the beginning: ', () => {
        beforeAll(async function() {
            order.product_id = product.id
            order.user_id = user.id
            const o: Order = await store.create(order)
            order.id = o.id
        })
        
        it('delete method should be able to delete item', async () => {
            const rows = await store.delete(order.id.toString())
            expect(rows).toEqual(order)
        })
    })
})