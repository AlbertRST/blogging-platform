import { createPool } from '../utils/db.js'

let pool

const initializePool = async () => {
  if (!pool) {
    pool = await createPool()
  }
}

export const getAllPosts = async () => {
  await initializePool()
  const [rows] = await pool.execute('SELECT * FROM posts')
  return rows
}

export const getPostById = async (postId) => {
  await initializePool()
  const [rows] = await pool.execute('SELECT * FROM posts WHERE post_id = ?', [postId])
  return rows[0]
}

export const createPost = async (post, categories) => {
  await initializePool()
  const { userId, title, content } = post
  const [result] = await pool.execute(
    'INSERT INTO posts (user_id, title, content) VALUES (?, ?, ?)',
    [userId, title, content]
  )
  const postId = result.insertId

  // Inserta categorías en la tabla intermedia
  for (const categoryId of categories) {
    await pool.execute(
      'INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)',
      [postId, categoryId]
    )
  }

  return postId
}

export const updatePost = async (postId, post, categories) => {
  await initializePool()
  const { title, content } = post
  await pool.execute(
    'UPDATE posts SET title = ?, content = ? WHERE post_id = ?',
    [title, content, postId]
  )

  // Actualiza categorías en la tabla intermedia
  await pool.execute('DELETE FROM post_categories WHERE post_id = ?', [postId])
  for (const categoryId of categories) {
    await pool.execute(
      'INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)',
      [postId, categoryId]
    )
  }
}

export const deletePost = async (postId) => {
  await initializePool()
  await pool.execute('DELETE FROM post_categories WHERE post_id = ?', [postId])
  await pool.execute('DELETE FROM comments WHERE post_id = ?', [postId]) // Elimina comentarios del post
  await pool.execute('DELETE FROM posts WHERE post_id = ?', [postId])
}

export const getPostsByCategory = async (categoryId) => {
  await initializePool()
  const [rows] = await pool.execute(
    'SELECT p.* FROM posts p JOIN post_categories pc ON p.post_id = pc.post_id WHERE pc.category_id = ?',
    [categoryId]
  )
  return rows
}

export const getPostsByTitle = async (title) => {
  await initializePool()
  const [rows] = await pool.execute(
    'SELECT * FROM posts WHERE title LIKE ?',
    [`%${title}%`]
  )
  return rows
}
