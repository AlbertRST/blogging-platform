import { createPool } from '../utils/db.js'

let pool

const initializePool = async () => {
  if (!pool) {
    pool = await createPool()
  }
}

export const getAllRoles = async () => {
  await initializePool()
  const [rows] = await pool.execute('SELECT * FROM roles')
  return rows
}
