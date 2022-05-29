import { UsersRoute } from '../Users'
import { User, UserStore } from '../../models/User'
import supertest from 'supertest'
import app from '../../server'
import bcrypt from 'bcrypt'

const request = supertest(app)

describe('Handler Users', () => {
    let token = ''
    const user: User = {
        id: 1, 
        firstname: 'testFirstName',
        lastname: 'testLastName',
        password: 'testPassword'
    }
    const BCRYPT_PASSWORD: string = process.env as unknown as string
    const SALT_ROUNDS: string = process.env as unknown as string

    // beforeAll(async function(done){
    //     request.get('/authenticate')
    //     .set({
    //         firstname: user.firstname, 
    //         lastname: user.lastname,
    //         password: user.password
    //     })
    //     .then(data => {
    //         token = data as unknown as string
    //     })

    //     done()
    // })

    describe('Testing method: /index /show: get', () => {

        beforeAll(async function(done){
            await new UserStore().create(user)
            done()
        })

        afterAll(async function(done){
            await new UserStore().delete('1')
            done()
        })
        
        it('show shall return the first element', async (done) => {
            request.get('/users/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((data) => {
                expect(data.body.firstname).toEqual(user.firstname)
                expect(data.body.lastname).toEqual(user.lastname)
                expect(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, data.body.password)).toBe(true)
            })
            done()
        })

        it('index shall return all elements', async (done) => {
            request.get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((data) => {
                expect(data.body[0].firstname).toEqual(user.firstname)
                expect(data.body[0].lastname).toEqual(user.lastname)
                expect(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, data.body[0].password)).toBe(true)
            })
            done()
        })
    })

    describe('Testing method: /users: post', () => {
        afterAll(async function(done) {
            await new UserStore().delete(user.id.toString())
            done()
        })

        // creating a user does not require authenticate
        it('create method should add a new element', async (done) => {
            request.post('/users')
            // .set('Authorization', `bearer ${token}`)
            .send(user)
            .expect('Content-Type', /json/)
            .then((data) => {
                expect(data.body.firstname).toEqual(user.firstname)
                expect(data.body.lastname).toEqual(user.lastname)
                expect(bcrypt.compareSync(user.password + BCRYPT_PASSWORD, data.body.password)).toBe(true)
            })
            done()
        })
    })
})