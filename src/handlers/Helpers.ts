import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { User, UserStore } from '../models/User'
import { ProductStore } from '../models/Product'
import { OrderStore } from '../models/Order'
import { users, products, orders } from '../data'

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

const authenticate = async (req: Request, res: Response) => {
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

const testcase = async (req: Request, res: Response) => {
    try {
        const userStore: UserStore = new UserStore()
        const productStore: ProductStore = new ProductStore()
        const orderStore: OrderStore = new OrderStore()

        for(const u of users){
            await userStore.create(u)
        }

        for(const p of products){
            await productStore.create(p)
        }

        for(const o of orders){
            await orderStore.create(o)
        }
        
        res.status(200)
        res.json("test cases added successfully")
    
    } catch (err) {
        res.status(400)
        res.end()
    }
}

const HelperRoutes = (app: express.Application) => {
    app.get('/admin', admin)
    app.get('/testcase', testcase)
    app.post('/authenticate', authenticate)
}

export { verifyAuthToken, HelperRoutes }