const { Router } = require('express');
const { authController } = require('../controllers');
const { authSchema, userSchema } = require('../schemas');
const { validator, upload } = require('../middlewares');

const router = Router();

// --- LOGIN ---

/**
 * @swagger
 *  definitions:
 *   loginUser:
 *    type: object
 *    properties:
 *      email:
 *        type: string
 *        example: admin@admin.com
 *      password:
 *        type: string
 *        example: 12345678
 *   tokenUser:
 *      type: object
 *      properties:
 *        body:
 *         type: string
 *   createUser:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *        example: 2
 *      firstName:
 *        type: string
 *        example: John
 *      lastName:
 *        type: string
 *        example: Connor
 *      email:
 *        type: string
 *        example: admin@admin.com
 *      password:
 *        type: string
 *        example: 12345678
 *      createdAt:
 *        type: string
 *        example: 2022/11/11
 *      updatedAt:
 *        type: string
 *        example: 2022/11/11

 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *    tags:
 *      - Auth
 *    summary: Log in
 *    description: Login user into the system
 *    requestBody:
 *      description: user object
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - email
 *              - password
 *            properties:
 *              email:
 *                type: string
 *                default: admin@admin.com
 *              password:
 *                type: string
 *                default: 12345678
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  example: true
 *                code:
 *                  type: integer
 *                  example: 200
 *                message:
 *                  type: string
 *                  example: Some message of success
 *                body:
 *                  type: object
 *                  example: Some token
 *      404:
 *         description: FAILED
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Some error message
 */

router.post('/login', validator(authSchema.login), authController.login);

// --- REGISTER ---
/**
 * @swagger
 * /auth/register:
 *  post:
 *     tags:
 *       - Auth
 *     summary: register User
 *     description: register user
 *     requestBody:
 *         description: Created user object
 *         content:
 *          multipart/form-data:
 *           schema:
 *             $ref: '#/definitions/userSchema'
 *     responses:
 *      200:
 *          description: OK
 *          content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: true
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Some message of success
 *                 body:
 *                  type: object
 *                  example: Some token
 *      404:
 *         description: Error searching users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Some error message
 */

router.post(
  '/register',
  upload.single('avatar'),
  validator(userSchema.create),
  authController.register
);

module.exports = router;
