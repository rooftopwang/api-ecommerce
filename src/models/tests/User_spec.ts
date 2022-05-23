import { User, UserStore } from '../User'

const store = new UserStore(); 

describe('User Model', ()=>{
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
        firstname: "testFirstName",
        lastname: "testLastName",
        password: "testPassword"
    }

    describe('adding an element at the beginning and removing at the end', () => {
        beforeAll(async function(done){
            await store.create(user)
            done()
        })

        afterAll(async function(done){
            await store.delete('1')
            done()
        })

        it('index method should return a list of items', async (done) => {
            const rows = await store.index()
            expect(rows).toEqual([user])
            done()
        })
    
        it('show method should should list by id', async (done) => {
            const row = await store.show('1')
            expect(row).toEqual(user)
            done()
        })
    })

    describe('removing the element at the end', () => {
        afterAll(async function(done){
            await store.delete('1')
            done()
        })

        it('create method should add an item', async (done) => {
            const row: User = await store.create(user)
            expect(row).toEqual(user)
            done()
        })
    })

    describe('adding an element at the beginning', () => {
        beforeAll(async function(done){
            await store.create(user)
            done()
        })
        
        it('delete method should be able to delete item', async (done) => {
            const rows = await store.delete('1')
            expect(rows).toEqual(user)
            done()
        })
    })
})