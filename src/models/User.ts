import Client from "../database"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export type User = {
    id: number; 
    firstname: string; 
    lastname: string; 
    password: string; 
};

export class UserStore {
    TABLE_NAME = 'Users'
    BCRYPT_PASSWORD: string = process.env as unknown as string
    SALT_ROUNDS: string = process.env as unknown as string

    async index(): Promise<User[]> {
        try {
            const sql = `SELECT * FROM ${this.TABLE_NAME}`
            // @ts-ignore
            const conn = await Client.connect()
            const data = await conn.query(sql)
            conn.release()

            const rows: User[] = data.rows
            return rows
        } catch (ex) {
            throw new Error(`cannot get from ${this.TABLE_NAME}: ${ex}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const sql = `SELECT * FROM ${this.TABLE_NAME} WHERE id=($1)`
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            conn.release()

            return result.rows[0]
        } catch (err) {
            throw new Error(`Could not find from ${this.TABLE_NAME}: ${id}. Error: ${err}`)
        }
    }

    async create(usr: User): Promise<User> {
        try {

            const sql = `INSERT INTO ${this.TABLE_NAME} (id, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING *`
            const hash = bcrypt.hashSync(
                usr.password + this.BCRYPT_PASSWORD, 
                parseInt(this.SALT_ROUNDS)
            )

            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [usr.id, usr.firstname, usr.lastname, hash])
            const row = result.rows[0]
            conn.release()

            return row
        } catch (err) {
            throw new Error(`Could not add into ${this.TABLE_NAME} ${usr.firstname, usr.lastname}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const sql = `DELETE FROM ${this.TABLE_NAME} WHERE id=($1) RETURNING *`
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [id])
            const row = result.rows[0]
            conn.release()
            
            return row
        } catch (err) {
            throw new Error(`Could not delete from ${this.TABLE_NAME}: ${id}. Error: ${err}`)
        }
    }

    async authenticate(firstname: string, lastname: string, password: string): Promise<User | null> {
        try{
            const sql = `select * from Users where firstname = ${firstname} and lastname = ${lastname};`
            const conn = await Client.connect()
            const result = await conn.query(sql)
            conn.release()
            
            console.log("*******************")
            console.log(result.rows)

            if(result.rows.length){
                const user: User = result.rows[0]
                const password_digest = user.password
                
                if(bcrypt.compareSync(password + this.BCRYPT_PASSWORD, password_digest)){
                    return user
                }
            }
            return null
        } catch (err) {
            throw err
        }

    }
}