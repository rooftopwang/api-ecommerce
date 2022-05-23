import Client from "../database";

export type User = {
    id: number; 
    firstname: string; 
    lastname: string; 
    password: string; 
};

export class UserStore {
    TABLE_NAME = 'Users'
    
    async index(): Promise<User[]> {
        try {
            const sql = `SELECT * FROM ${this.TABLE_NAME}`
            // @ts-ignore
            const conn = await Client.connect()
            const data = await conn.query(sql)
            conn.release()
            return data.rows
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
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [usr.id, usr.firstname, usr.lastname, usr.password])
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
}