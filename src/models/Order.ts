import Client from "../database";

export type Order = {
    id: number; 
    product_id: number;
    quantity: number; 
    user_id: number; 
    status: number; 
};

export class OrderStore {
    TABLE_NAME = 'Orders'
    
    async index(): Promise<Order[]> {
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

    async show(id: string): Promise<Order> {
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

    async create(order: Order): Promise<Order> {
        try {
            const sql = `INSERT INTO ${this.TABLE_NAME} (id, product_id, quantity, user_id, status) VALUES($1, $2, $3, $4, $5) RETURNING *`
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [order.id, order.product_id, order.quantity, order.user_id, order.status])
            const row = result.rows[0]
            conn.release()

            return row
        } catch (err) {
            throw new Error(`Could not add into ${this.TABLE_NAME} ${order.id}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<Order> {
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

   async ordersByUser(userId: string): Promise<Order[]> {
       try {
           const sql: string = `SELECT * FROM ORDERS WHERE USER_ID = ${userId}`
           // @ts-ignore
           const conn = await Client.connect()
           const result = await conn.query(sql)
           const rows = result.rows
           conn.release()
           
           return rows
       } catch (err) {
           throw err
       }
   }
}