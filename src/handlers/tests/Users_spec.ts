import UsersRoute from '../Users'
import { User, UserStore } from '../../models/User'
import supertest from 'supertest'
import app from '../../server'

const request = supertest(app)

describe('Handler Users', () => {
    
    const user: User = {
        id: 1, 
        firstname: 'testFirstName',
        lastname: 'testLastName',
        password: 'testPassword'
    }

    describe('Testing method: index/show', () => {

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
                expect(data.body).toEqual(user)
            })
            done()
        })

        it('index shall return all elements', async (done) => {
            request.get('/users')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((data) => {
                expect(data.body).toEqual([user])
            })
            done()
        })
    })

    describe('Testing method', () => {
        afterAll(async function(done) {
            await new UserStore().delete(user.id.toString())
            done()
        })

        it('create method should add a new element', async (done) => {
            request.post('/users')
            .send(user)
            .expect('Content-Type', /json/)
            .then((data) => {
                expect(data.body).toEqual(user)
            })
            done()
        })
    })
})