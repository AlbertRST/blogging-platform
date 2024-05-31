import express from 'express'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import commentRoutes from './routes/commentRoutes.js'
import roleRoutes from './routes/roleRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/roles', roleRoutes)

export default app
