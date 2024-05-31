import dotenv from 'dotenv'
import app from './app.js'
import { createPool } from './utils/db.js'

dotenv.config()

const port = process.env.PORT || 3000

const startServer = async () => {
  try {
    await createPool()
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1) // Salir con error
  }
}

startServer()
