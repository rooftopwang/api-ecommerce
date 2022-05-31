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
            id: req.body.id, 
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

const UsersRoute = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', verifyAuthToken, create)
}

export { UsersRoute }