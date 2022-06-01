import { Product, ProductStore } from "../models/Product"
import express, { Request, Response } from 'express'
import { verifyAuthToken } from "./Helpers"

const store = new ProductStore()

const index = async (req: Request, res: Response) => {
    try {
        const products: Product[] = await store.index()
        res.json(products)
    } catch (err) {
        res.status(401)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const product: Product = await store.show(req.params.id)
        res.json(product)
    } catch (err) {
        res.status(401)
        res.json(err)
    }
}

const create = async (req: Request, res: Response) => {
    const product: Product = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price
    }

    try {
        const row: Product = await store.create(product)
        res.json(row)
    } catch (err) {
        res.status(401)
        res.json(err)
    }
}

const ProductsRoute = (app: express.Application) => {
    app.get('/products', index)
    app.get('/products/:id', show)
    app.post('/products', verifyAuthToken, create)
}

export { ProductsRoute }