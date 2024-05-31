import { getAllPosts, getPostById, createPost, updatePost, deletePost, getPostsByCategory, getPostsByTitle } from '../models/postModel.js'

export const getPosts = async (req, res) => {
  try {
    const posts = await getAllPosts()
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts', error })
  }
}

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id
    const post = await getPostById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    res.status(200).json(post)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving post', error })
  }
}

export const createNewPost = async (req, res) => {
  try {
    const { userId, title, content, categories } = req.body

    if (!categories || categories.length === 0) {
      return res.status(400).json({ message: 'A post must have at least one category' })
    }

    const postId = await createPost({ userId, title, content }, categories)
    const newPost = await getPostById(postId)
    res.status(201).json(newPost)
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error })
  }
}

export const updatePostContent = async (req, res) => {
  try {
    const postId = req.params.id
    const { title, content, categories } = req.body

    if (!categories || categories.length === 0) {
      return res.status(400).json({ message: 'A post must have at least one category' })
    }

    await updatePost(postId, { title, content }, categories)
    const updatedPost = await getPostById(postId)
    res.status(200).json(updatedPost)
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error })
  }
}

export const removePost = async (req, res) => {
  try {
    const postId = req.params.id
    await deletePost(postId)
    res.status(200).json({ message: 'Post and associated comments deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post', error })
  }
}

export const getPostsByCategoryFilter = async (req, res) => {
  try {
    const categoryId = req.params.categoryId
    const posts = await getPostsByCategory(categoryId)
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts by category', error })
  }
}

export const getPostsByTitleSearch = async (req, res) => {
  try {
    const { title } = req.query
    const posts = await getPostsByTitle(title)
    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Error searching posts by title', error })
  }
}
