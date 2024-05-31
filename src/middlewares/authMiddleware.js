import jwt from 'jsonwebtoken' // No vista en clases pero fué la que conversamos en la consulta.
import { getPostById } from '../models/postModel.js'
import { getCommentById } from '../models/commentModel.js'
// import { getUserById } from '../models/userModel.js'

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization
  if (!token) {
    return res.status(403).json({ message: 'No token provided' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to authenticate token' })
    }

    req.userId = decoded.id
    req.userRole = decoded.role
    next()
  })
}

export const isAdmin = (req, res, next) => {
  if (req.userRole !== 1) {
    return res.status(403).json({ message: 'Require Admin Role' })
  }
  next()
}

export const isPostOwner = async (req, res, next) => {
  try {
    const postId = req.params.id
    const post = await getPostById(postId)
    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }
    if (post.user_id !== req.userId && req.userRole !== 1) {
      return res.status(403).json({ message: 'User is not the owner of this post' })
    }
    next()
  } catch (error) {
    res.status(500).json({ message: 'Error verifying post ownership', error })
  }
}

export const isCommentOwner = async (req, res, next) => {
  try {
    const commentId = req.params.id
    const comment = await getCommentById(commentId)
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }
    if (comment.user_id !== req.userId && req.userRole !== 1) {
      return res.status(403).json({ message: 'User is not the owner of this comment' })
    }
    next()
  } catch (error) {
    res.status(500).json({ message: 'Error verifying comment ownership', error })
  }
}

export const isUserOwner = async (req, res, next) => {
  try {
    const userId = req.params.id
    if (parseInt(userId) !== req.userId && req.userRole !== 1) {
      return res.status(403).json({ message: 'User is not the owner of this account' })
    }
    next()
  } catch (error) {
    res.status(500).json({ message: 'Error verifying user ownership', error })
  }
}
