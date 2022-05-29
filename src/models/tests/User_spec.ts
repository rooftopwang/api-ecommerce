import { compareSync } from 'bcrypt';
import { User, UserStore } from '../User'
import bcrypt from 'bcrypt'

const store = new UserStore(); 

describe('User Model', ()=>{
    const user: User = {
        id: 3,
        firstname: "testFirstName3",
        lastname: "testLastName3",
        password: "testPassword3"
    }
    const BCRYPT_PASSWORD: string = process.env.BCRYPT_PASSWORD as unknown as string
    const SALT_ROUNDS: string = process.env.BCRYPT_PASSWORD as unknown as string
    
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

    describe('adding an element at the beginning and removing at the end', () => {
        beforeAll(async function(done){
            await store.create(user)
            done()
        })

        afterAll(async function(done){
            await store.delete(user.id.toString())
            done()
        })

        it('index method should return a list of items: ', async (done) => {
            const rows: User[] = await store.index()
            expect(rows[0].firstname).toEqual(user.firstname)
            expect(rows[0].lastname).toEqual(user.lastname)
            expect(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, rows[0].password)).toBe(true)
            done()
        })
    
        it('show method should should list by id: ', async (done) => {
            const row = await store.show(user.id.toString())
            expect(row.firstname).toEqual(user.firstname)
            expect(row.lastname).toEqual(user.lastname)
            expect(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, row.password)).toBe(true)
            done()
        })
    })

    describe('removing the element at the end: ', () => {
        afterAll(async function(done){
            await store.delete(user.id.toString())
            done()
        })

        it('create method should add an item: ', async (done) => {
            const row: User = await store.create(user)
            expect(row.firstname).toEqual(user.firstname)
            expect(row.lastname).toEqual(user.lastname)
            expect(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, row.password)).toBe(true)
            done()
        })
    })

    describe('adding an element at the beginning: ', () => {
        beforeAll(async function(done){
            await store.create(user)
            done()
        })
        
        it('delete method should be able to delete item: ', async (done) => {
            const row = await store.delete(user.id.toString())
            expect(row.firstname).toEqual(user.firstname)
            expect(row.lastname).toEqual(user.lastname)
            expect(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, row.password)).toBe(true)
            done()
        })
    })
})