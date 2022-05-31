import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/User'

const verifyAuthToken = (req: Request, res: Response, next: Function): void => {
    try {
        const auth = req.headers.authorization as unknown as string
        const token: string = auth.split(' ')[1] 
        jwt.verify(token, process.env.TOKEN_SECRET as unknown as string)
        next()
    }
    catch (err) {
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
        const row = await new UserStore().create(usr)
        res.json(row)
    } catch (err) {
        res.status(401)
        res.json(err)
    }
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

const HelperRoutes = (app: express.Application) => {
    app.get('/admin', admin)
    app.post('/authenticate', Authenticate)
}

export { verifyAuthToken, HelperRoutes }