import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()


const  {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_USER,
    POSTGRES_USER_TEST, 
    POSTGRES_DB_TEST,
    POSTGRES_PASSWORD,
    ENV
} = process.env

const Client = ENV === 'test' ? 
    new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST, 
        user: POSTGRES_USER_TEST,
        password: POSTGRES_PASSWORD
    }) : 
    new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB, 
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD
    })

export default Client