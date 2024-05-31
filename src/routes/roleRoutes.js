import express from 'express'
import { getRoles } from '../controllers/roleController.js'
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management endpoints
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: List of all roles
 *       500:
 *         description: Error retrieving roles
 *     security:
 *       - bearerAuth: []
 *     x-roles:
 *       - admin
 */
router.get('/', verifyToken, isAdmin, getRoles)

export default router
