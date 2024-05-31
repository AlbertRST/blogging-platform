import { getAllUsers, getUserById, updateUser, deleteUser } from '../models/userModel.js'

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving users', error })
  }
}

export const getUser = async (req, res) => {
  try {
    const userId = req.params.id
    const user = await getUserById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving user', error })
  }
}

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.params.id
    const userUpdates = req.body
    await updateUser(userId, userUpdates)
    const updatedUser = await getUserById(userId)
    res.status(200).json(updatedUser)
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error })
  }
}

export const removeUser = async (req, res) => {
  try {
    const userId = req.params.id
    await deleteUser(userId)
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error })
  }
}
