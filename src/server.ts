import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import { UsersRoute } from './handlers/Users'
import { ProductsRoute } from './handlers/Products'

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

UsersRoute(app)
ProductsRoute(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

export default app