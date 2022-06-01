import { Order, OrderStore } from "../models/Order"
import express, { Request, Response } from 'express'
import { verifyAuthToken } from "./Helpers"

const store = new OrderStore()

const index = async (req: Request, res: Response) => {
    try {
        const orders: Order[] = await store.index()
        res.json(orders)
    } catch (err) {
        res.status(401)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const order: Order = await store.show(req.params.id)
        res.json(order)
    } catch (err) {
        res.status(401)
        res.json(err)
    }
}

const ordersByUser = async (req: Request, res: Response) => {
    try {
        const orders: Order[] = await store.ordersByUser(req.params.userid)
        res.json(orders)
    } catch (err) {
        res.status(401)
        res.json(err)
    }
}

const create = async (req: Request, res: Response) => {
    const order: Order = {
        id: req.body.id,
        product_id: req.body.product_id, 
        quantity: req.body.quantity,
        user_id: req.body.user_id,
        status: req.body.status
    }
    try {
        const row: Order = await store.create(order)
        res.json(row)
    } catch (err) {
        res.status(401)
        res.json(err)
    }
}

const OrdersRoute = (app: express.Application) => {
    app.get('/orders', verifyAuthToken, index)
    app.get('/orders/:userid', verifyAuthToken, ordersByUser)
    app.post('/orders', verifyAuthToken, create)
}

export { OrdersRoute }