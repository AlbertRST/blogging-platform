/* eslint-disable camelcase */
import { createPool } from '../utils/db.js'

const pool = await createPool()

export const getAllComments = async () => {
  const [rows] = await pool.execute('SELECT * FROM comments')
  return rows
}

export const getCommentById = async (commentId) => {
  const [rows] = await pool.execute('SELECT * FROM comments WHERE comment_id = ?', [commentId])
  return rows[0]
}

export const createComment = async (comment) => {
  const { post_id, user_id, content } = comment
  const [result] = await pool.execute(
    'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
    [post_id, user_id, content]
  )
  return result.insertId
}

export const updateComment = async (commentId, comment) => {
  const { content } = comment
  await pool.execute(
    'UPDATE comments SET content = ? WHERE comment_id = ?',
    [content, commentId]
  )
}

export const deleteComment = async (commentId) => {
  await pool.execute('DELETE FROM comments WHERE comment_id = ?', [commentId])
}
