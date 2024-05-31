import { createPool } from '../utils/db.js'

const pool = await createPool()

export const getAllCategories = async () => {
  const [rows] = await pool.execute('SELECT * FROM categories')
  return rows
}

export const getCategoryById = async (categoryId) => {
  const [rows] = await pool.execute('SELECT * FROM categories WHERE category_id = ?', [categoryId])
  return rows[0]
}

export const createCategory = async (category) => {
  const { name, description } = category
  const [result] = await pool.execute(
    'INSERT INTO categories (name, description) VALUES (?, ?)',
    [name, description]
  )
  return result.insertId
}

export const updateCategory = async (categoryId, category) => {
  const { name, description } = category
  await pool.execute(
    'UPDATE categories SET name = ?, description = ? WHERE category_id = ?',
    [name, description, categoryId]
  )
}

export const deleteCategory = async (categoryId) => {
  await pool.execute('DELETE FROM post_categories WHERE category_id = ?', [categoryId]) // Elimina las referencias a la categoría en la tabla intermedia post_categories
  await pool.execute('DELETE FROM categories WHERE category_id = ?', [categoryId])
}
