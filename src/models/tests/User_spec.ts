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
        firstname: "testPassword",
        lastname: "testPassword",
        password: "testPassword"
    }

    it('create method should add an user', async () => {
        const row: User = await store.create(user)
        expect(row).toEqual(user)
    })

    it('index method should return a list of items', async () => {
        const rows = await store.index()
        expect(rows).toEqual([user])
    })

    it('show method should should list by id', async () => {
        const row = await store.show('1')
        expect(row).toEqual(user)
    })

    it('delete method should be able to delete item', async () => {
        const rows = await store.delete('1')
        expect(rows).toEqual(user)
    })
})