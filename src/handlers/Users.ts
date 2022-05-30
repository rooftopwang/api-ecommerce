import { User, UserStore} from '../models/User'
import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { verifyAuthToken } from './Helpers';

const store = new UserStore(); 

const index = async (req: Request, res: Response) => {
    const rows = await store.index()
    res.json(rows)
}

const show = async (req: Request, res: Response) => {
    const row = await store.show(req.params.id)
    res.json(row)
}

const create = async (req: Request, res: Response) => {
    try {
        const usr: User = {
            id: 0, 
            firstname: req.body.firstname, 
            lastname: req.body.lastname, 
            password: req.body.password
        }
        const row = await store.create(usr)
        res.json(row)
    } catch (err) {
        res.status(401)
        res.json(err)
    }
}

const admin = async (req: Request, res: Response) => {
    // this is to add a admin account for testing only
    try {
        const usr: User = {
            id: 0, 
            firstname: 'admin_firstname', 
            lastname: 'admin_lastname', 
            password: 'admin_password'
        }
        const row = await store.create(usr)
        res.json(row)
    } catch (err) {
        res.status(401)
        res.json(err)
    }
}

const UsersRoute = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', verifyAuthToken, create)
    app.get('/admin', admin)
    app.post('/authenticate', Authenticate)
}

const Authenticate = async (req: Request, res: Response) => {
    const { firstname, lastname, password } = req.body

    const secret: string = process.env.TOKEN_SECRET as unknown as string
    try {
        
        const usr: User | null = await new UserStore().authenticate(firstname, lastname, password)
        const token: string = jwt.sign({ user: usr }, secret)

        res.json(token)
    } catch (err) {
        res.status(401)
        res.json(err)
    }

}

export { UsersRoute, Authenticate }