import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

export const createPool = async () => {
  try {
    const pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    })
    console.log('Database connected successfully')
    return pool
  } catch (error) {
    console.error('Database connection failed:', error)
    throw error
  }
}
