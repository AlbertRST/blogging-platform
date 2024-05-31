import { getAllRoles } from '../models/roleModel.js'

export const getRoles = async (req, res) => {
  try {
    const roles = await getAllRoles()
    res.status(200).json(roles)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving roles', error })
  }
}
