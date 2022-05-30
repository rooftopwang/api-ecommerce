import { Product, ProductStore } from '../Product'

const store = new ProductStore(); 

describe('Product Model', ()=>{
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

    const product: Product = {
        id: 1,
        name: 'productTest',
        price: 100.01
    }

    describe('adding an element at the beginning and removing at the end', () => {
        beforeAll(async function(){
            const p: Product = await store.create(product)
            product.id = p.id
        })

        afterAll(async function(){
            await store.delete('1')
        })

        it('index method should return a list of items', async () => {
            const rows = await store.index()
            expect(rows).toEqual([product])
        })
    
        it('show method should should list by id', async () => {
            const row = await store.show(product.id.toString())
            expect(row).toEqual(product)
        })
    })

    describe('removing the element at the end', () => {
        afterAll(async function(){
            await store.delete(product.id.toString())
        })

        it('create method should add an item', async () => {
            const row: Product = await store.create(product)
            product.id = row.id
            expect(row).toEqual(product)
        })
    })

    describe('adding an element at the beginning', () => {
        beforeAll(async function(){
            const p: Product = await store.create(product)
            product.id = p.id
        })
        
        it('delete method should be able to delete item', async () => {
            const rows = await store.delete(product.id.toString())
            expect(rows).toEqual(product)
        })
    })
})