import { UsersRoute } from '../Users'
import { User, UserStore } from '../../models/User'
import supertest from 'supertest'
import app from '../../server'
import bcrypt from 'bcrypt'

const request = supertest(app)

describe('Handler Users', () => {
    
    const admin: User = {
        id: 1, 
        firstname: 'admin_firstname', 
        lastname: 'admin_lastname',
        password: 'admin_password'
    }
    const user: User = {
        id: 2, 
        firstname: 'testFirstName',
        lastname: 'testLastName',
        password: 'testPassword'
    }

    const BCRYPT_PASSWORD: string = process.env.BCRYPT_PASSWORD as unknown as string
    const SALT_ROUNDS: string = process.env.SALT_ROUNDS as unknown as string

    beforeAll(async function(done){
        const u = await new UserStore().create(admin)
        admin.id = u.id
        done()
    })

    afterAll(async function(done){
        await new UserStore().delete(admin.id.toString())
        done()
    })

    describe('Testing get method: /index /show: ', () => {

        beforeAll(async function(done){
            const u = await new UserStore().create(user)
            user.id = u.id
            done()
        })

        afterAll(async function(done){
            await new UserStore().delete(user.id.toString())
            done()
        })
        
        it('show shall return the first element', async (done) => {
            request.get(`/users/${user.id.toString()}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.firstname).toEqual(user.firstname)
                expect(data.body.lastname).toEqual(user.lastname)
                expect(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, data.body.password)).toBe(true)
                done()
            })
            
        })

        it('index shall return all elements', async (done) => {
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
                done()
            })
            
        })
    })

    describe('all should fail if not being authenticated: ', () => {
        // it('index method should fail: ', async (done) => {
        //     request.get('/users')
        //     .send(user)
        //     .expect(401)
        //     .then(data => {
        //         done()
        //     })
        // })

        // it('show method should fail: ', async (done) => {
        //     request.get('/users/1')
        //     .send(user)
        //     .expect(401)
        //     .then(data => {
        //         done()
        //     })
        // })

        it('create method should fail: ', async (done) => {
            request.post('/users')
            .send(user)
            .expect(401)
            .then(() => {
                done()
            })
        })
    })

    describe('all should pass when being authenticated: ', () => {
        let token = ''

        describe('testing method: /users: post', () => {

            beforeAll(async function(done){

                request.post('/authenticate')
                .send({
                    firstname: admin.firstname, 
                    lastname: admin.lastname,
                    password: admin.password
                })
                .then(data => {
                    token = data.body.toString()
                    done()
                })

            })
            
            afterAll(async function(done) {
                await new UserStore().delete(user.id.toString())
                done()
            })
    
            it('create method should add a new element', async (done) => {
                
                request.post('/users')
                .set('Authorization', `bearer ${token}`)
                .send(user)
                .expect('Content-Type', /json/)
                .then((data) => {
                    user.id = data.body.id
                    expect(data.body.firstname).toEqual(user.firstname)
                    expect(data.body.lastname).toEqual(user.lastname)
                    expect(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, data.body.password)).toBe(true)
                    done()
                })
                
            })
        })
    })

})