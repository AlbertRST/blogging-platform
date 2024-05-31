import { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory } from '../models/categoryModel.js'

export const getCategories = async (req, res) => {
  try {
    const categories = await getAllCategories()
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving categories', error })
  }
}

export const getCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    const category = await getCategoryById(categoryId)
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving category', error })
  }
}

export const createNewCategory = async (req, res) => {
  try {
    const category = req.body
    const categoryId = await createCategory(category)
    const newCategory = await getCategoryById(categoryId)
    res.status(201).json(newCategory)
  } catch (error) {
    res.status(500).json({ message: 'Error creating category', error })
  }
}

export const updateCategoryContent = async (req, res) => {
  try {
    const categoryId = req.params.id
    const categoryUpdates = req.body
    await updateCategory(categoryId, categoryUpdates)
    const updatedCategory = await getCategoryById(categoryId)
    res.status(200).json(updatedCategory)
  } catch (error) {
    res.status(500).json({ message: 'Error updating category', error })
  }
}

export const removeCategory = async (req, res) => {
  try {
    const categoryId = req.params.id
    await deleteCategory(categoryId)
    res.status(200).json({ message: 'Category deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category', error })
  }
}
