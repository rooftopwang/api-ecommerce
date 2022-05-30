import { User, UserStore } from '../../models/User'
import supertest from 'supertest'
import app from '../../server'
import bcrypt from 'bcrypt'

const request = supertest(app)
const userStore = new UserStore()

describe('Handler Users', () => {
    
    const admin: User = {
        id: 1, 
        firstname: 'admin_firstname', 
        lastname: 'admin_lastname',
        password: 'admin_password'
    }
    const user: User = {
        id: 2, 
        firstname: 'test_firstName_2',
        lastname: 'test_lastName_2',
        password: 'test_password_2'
    }

    const BCRYPT_PASSWORD: string = process.env.BCRYPT_PASSWORD as unknown as string

    beforeAll(async function(){
        const u = await userStore.create(admin)
        admin.id = u.id
    })

    afterAll(async function(){
        await userStore.delete(admin.id.toString())
    })

    describe('Testing get method: /index /show: ', () => {

        beforeAll(async function(){
            const u = await userStore.create(user)
            user.id = u.id
        })

        afterAll(async function(){
            await userStore.delete(user.id.toString())
        })
        
        it('show shall return the first element', async () => {
            request.get(`/users/${user.id.toString()}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.firstname).toEqual(user.firstname)
                expect(data.body.lastname).toEqual(user.lastname)
                expect(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, data.body.password)).toBe(true)
            })
            
        })

        it('index shall return all elements', async () => {
            request.get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((data) => {
                const users_local = [ admin, user ]
                data.body.forEach((u: User, i: number) => {
                    expect(u.firstname).toEqual(users_local[i].firstname)
                    expect(u.lastname).toEqual(users_local[i].lastname)
                    expect(bcrypt.compareSync(users_local[i].password + BCRYPT_PASSWORD, u.password)).toBe(true)
                });
            })
            
        })
    })

    describe('all should fail when not being authenticated: ', () => {
        it('create method should fail: ', async () => {
            request.post('/users')
            .send(user)
            .expect(401)
        })
    })

    describe('all should pass when being authenticated: ', () => {
        let token = ''

        describe('testing method: /users: post', () => {

            beforeAll(async function(){

                await request.post('/authenticate')
                .send({
                    firstname: admin.firstname, 
                    lastname: admin.lastname,
                    password: admin.password
                })
                .then(data => {
                    token = data.body.toString()
                })

            })
            
            afterAll(async function() {
                await userStore.delete(user.id.toString())
            })
    
            it('create method should add a new element', async () => {
                
                await request.post('/users')
                .set('Authorization', `bearer ${token}`)
                .send(user)
                .expect('Content-Type', /json/)
                .then((data) => {
                    user.id = data.body.id
                    expect(data.body.firstname).toEqual(user.firstname)
                    expect(data.body.lastname).toEqual(user.lastname)
                    expect(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, data.body.password)).toBe(true)
                })
                
            })
        })
    })

})