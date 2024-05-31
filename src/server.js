import dotenv from 'dotenv'
import app from './app.js'
import { createPool } from './utils/db.js'
import setupSwagger from './config/swagger.js'

dotenv.config()

const port = process.env.PORT || 3000

const startServer = async () => {
  try {
    await createPool()
    setupSwagger(app)
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
      console.log(`Swagger docs available at http://localhost:${port}/api-docs`)
    })
  } catch (error) {
    console.error('Failed to start server:', error)
    process.exit(1)
  }
}

startServer()
