import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

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

export { verifyAuthToken }