import { createPool } from '../utils/db.js'

let pool

const initializePool = async () => {
  if (!pool) {
    pool = await createPool()
  }
}

export const createUser = async (user) => {
  await initializePool()
  const { username, email, password, rolId } = user
  const [result] = await pool.execute(
    'INSERT INTO users (username, email, password, rol_id) VALUES (?, ?, ?, ?)',
    [username, email, password, rolId]
  )
  return result.insertId
}

export const getUserById = async (userId) => {
  await initializePool()
  const [rows] = await pool.execute('SELECT * FROM users WHERE user_id = ?', [userId])
  return rows[0]
}

export const getUserByEmail = async (email) => {
  await initializePool()
  const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email])
  return rows[0]
}

export const getAllUsers = async () => {
  await initializePool()
  const [rows] = await pool.execute('SELECT * FROM users')
  return rows
}

export const updateUser = async (userId, userUpdates) => {
  await initializePool()
  const { username, email, password, rolId } = userUpdates
  await pool.execute(
    'UPDATE users SET username = ?, email = ?, password = ?, rol_id = ? WHERE user_id = ?',
    [username, email, password, rolId, userId]
  )
}

export const deleteUser = async (userId) => {
  await initializePool()

  // Borra comentarios de los posts del usuario
  await pool.execute('DELETE comments FROM comments JOIN posts ON comments.post_id = posts.post_id WHERE posts.user_id = ?', [userId])

  // Elimina posts del usuario
  await pool.execute('DELETE FROM post_categories WHERE post_id IN (SELECT post_id FROM posts WHERE user_id = ?)', [userId])
  await pool.execute('DELETE FROM posts WHERE user_id = ?', [userId])

  // Borra comentarios del usuario
  await pool.execute('DELETE FROM comments WHERE user_id = ?', [userId])

  // Elim el usuario
  await pool.execute('DELETE FROM users WHERE user_id = ?', [userId])
}
