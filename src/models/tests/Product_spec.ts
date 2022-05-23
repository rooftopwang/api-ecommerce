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
        beforeAll(async function(done){
            await store.create(product)
            done()
        })

        afterAll(async function(done){
            await store.delete('1')
            done()
        })

        it('index method should return a list of items', async () => {
            const rows = await store.index()
            expect(rows).toEqual([product])
        })
    
        it('show method should should list by id', async () => {
            const row = await store.show('1')
            expect(row).toEqual(product)
        })
    })

    describe('removing the element at the end', () => {
        afterAll(async function(done){
            await store.delete('1')
            done()
        })

        it('create method should add an item', async () => {
            const row: Product = await store.create(product)
            expect(row).toEqual(product)
        })
    })

    describe('adding an element at the beginning', () => {
        beforeAll(async function(done){
            await store.create(product)
            done()
        })
        
        it('delete method should be able to delete item', async () => {
            const rows = await store.delete('1')
            expect(rows).toEqual(product)
        })
    })
})