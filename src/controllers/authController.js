import { getUserByEmail, createUser, getUserById } from '../models/userModel.js'
/* Las siguientes librerías no se usaron en clase pero fueron de las que hablé en la consulta, y se lograron implementar.
Igualmente en el resto del proyecto se puede notar el uso de las librerías aprendidas en las clases */
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const generateToken = (user) => {
  return jwt.sign({ id: user.user_id, email: user.email, role: user.rol_id }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })
}

export const register = async (req, res) => {
  try {
    const { username, email, password, rolId } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = await createUser({ username, email, password: hashedPassword, rolId })
    const user = await getUserById(userId)
    const token = generateToken(user)
    res.status(201).json({ token, user })
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await getUserByEmail(email)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' })
    }
    const token = generateToken(user)
    res.status(200).json({ token, user })
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error })
  }
}
