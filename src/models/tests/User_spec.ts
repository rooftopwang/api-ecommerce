import { User, UserStore } from '../User'

const store = new UserStore(); 

describe('User Model', ()=>{
    it('should have an index method', ()=>{
        expect(store.index).toBeDefined()
    })

    it('index method should return a list of items', async () => {
        const rows = await store.index()
        expect(rows).toEqual([])
    })
})