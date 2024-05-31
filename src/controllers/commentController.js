import { getAllComments, getCommentById, createComment, updateComment, deleteComment } from '../models/commentModel.js'

export const getComments = async (req, res) => {
  try {
    const comments = await getAllComments()
    res.status(200).json(comments)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving comments', error })
  }
}

export const getComment = async (req, res) => {
  try {
    const commentId = req.params.id
    const comment = await getCommentById(commentId)
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }
    res.status(200).json(comment)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving comment', error })
  }
}

export const createNewComment = async (req, res) => {
  try {
    const comment = req.body
    const commentId = await createComment(comment)
    const newComment = await getCommentById(commentId)
    res.status(201).json(newComment)
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error })
  }
}

export const updateCommentContent = async (req, res) => {
  try {
    const commentId = req.params.id
    const commentUpdates = req.body
    await updateComment(commentId, commentUpdates)
    const updatedComment = await getCommentById(commentId)
    res.status(200).json(updatedComment)
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error })
  }
}

export const removeComment = async (req, res) => {
  try {
    const commentId = req.params.id
    await deleteComment(commentId)
    res.status(200).json({ message: 'Comment deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error })
  }
}
