import { Order, OrderStore } from "../models/Order"
import express, { Request, Response } from 'express'
import { verifyAuthToken } from "./Helpers"

const store = new OrderStore()

const index = async (req: Request, res: Response) => {
    const orders: Order[] = await store.index()
    res.json(orders)
}

const show = async (req: Request, res: Response) => {
    const order: Order = await store.show(req.params.id)
    res.json(order)
}

const create = async (req: Request, res: Response) => {
    const order: Order = {
        id: req.body.id,
        product_id: req.body.product_id, 
        quantity: req.body.quantity,
        user_id: req.body.user_id,
        status: req.body.status
    }
    const row: Order = await store.create(order)
    res.json(row)
}

const OrdersRoute = (app: express.Application) => {
    app.get('/orders', index)
    app.get('/orders/:id', show)
    app.post('/orders', verifyAuthToken, create)
}

export { OrdersRoute }