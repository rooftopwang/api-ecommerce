import { compareSync } from 'bcrypt';
import { User, UserStore } from '../User'
import bcrypt from 'bcrypt'

const store = new UserStore(); 

describe('User Model', ()=>{
    const user: User = {
        id: 3,
        firstname: "test_firstName_3",
        lastname: "test_lastName_3",
        password: "test_password_3"
    }
    const BCRYPT_PASSWORD: string = process.env.BCRYPT_PASSWORD as unknown as string
    
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
        beforeAll(async function(){
            const u = await store.create(user)
            user.id = u.id
        })

        afterAll(async function(){
            await store.delete(user.id.toString())
        })

        it('index method should return a list of items: ', async () => {
            const rows: User[] = await store.index()
            expect(rows[0].firstname).toEqual(user.firstname)
            expect(rows[0].lastname).toEqual(user.lastname)
            expect(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, rows[0].password)).toBe(true)
        })
    
        it('show method should should list by id: ', async () => {
            const row = await store.show(user.id.toString())
            expect(row.firstname).toEqual(user.firstname)
            expect(row.lastname).toEqual(user.lastname)
            expect(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, row.password)).toBe(true)
        })
    })

    describe('removing the element at the end: ', () => {
        afterAll(async function(){
            await store.delete(user.id.toString())
        })

        it('create method should add an item: ', async () => {
            const row: User = await store.create(user)
            user.id = row.id
            expect(row.firstname).toEqual(user.firstname)
            expect(row.lastname).toEqual(user.lastname)
            expect(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, row.password)).toBe(true)
        })
    })

    describe('adding an element at the beginning: ', () => {
        beforeAll(async function(){
            const u = await store.create(user)
            user.id = u.id
        })
        
        it('delete method should be able to delete item: ', async () => {
            const row = await store.delete(user.id.toString())
            expect(row.firstname).toEqual(user.firstname)
            expect(row.lastname).toEqual(user.lastname)
            expect(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, row.password)).toBe(true)
        })
    })
})