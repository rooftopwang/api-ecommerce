import Client from "../database";

export type OrderDetail = {
    id: number; 
    order_id: number; 
    product_id: number; 
    quantity: number; 
};

export class OrderDetailStore {
    TABLE_NAME = 'OrderDetails'
    
    async index(): Promise<OrderDetail[]> {
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

    async show(id: string): Promise<OrderDetail> {
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

    async create(orderDetail: OrderDetail): Promise<OrderDetail> {
        try {
            const sql = `INSERT INTO ${this.TABLE_NAME} (id, order_id, product_id, quantity) VALUES($1, $2, $3, $4) RETURNING *`
            // @ts-ignore
            const conn = await Client.connect()
            const result = await conn.query(sql, [orderDetail.id, orderDetail.order_id, orderDetail.product_id, orderDetail.quantity])
            const row = result.rows[0]
            conn.release()

            return row
        } catch (err) {
            throw new Error(`Could not add into ${this.TABLE_NAME} ${orderDetail.id}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<OrderDetail> {
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