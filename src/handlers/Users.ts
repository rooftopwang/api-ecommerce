import { User, UserStore} from '../models/User'
import express, { Request, Response } from 'express'

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

}

const UsersRoute = (app: express.Application) => {
    app.get('/users', index)
    app.get('/users/:id', show)
    app.post('/users', create)
}

export default UsersRoute