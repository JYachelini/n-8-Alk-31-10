const { Router } = require('express');
const { authController } = require('../controllers');
const { authSchema, userSchema } = require('../schemas');
const { validator, upload } = require('../middlewares');

const router = Router();
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
 *     tags:
 *       - Auth
 *     summary: login
 *     description: login user
 *     requestBody:
 *         description: Created user object
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/definitions/loginUser'
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/definitions/tokenUser'
 *       '404':
 *         description: Error searching users
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/definitions/error'
 */

router.post('/login', validator(authSchema.login), authController.login);

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
 *          application/json:
 *           schema:
 *             $ref: '#/definitions/userSchema'
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/definitions/createUser'
 *       '404':
 *         description: Error searching users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/error'
 */

router.post(
  '/register',
  upload.single('avatar'),
  validator(userSchema.create),
  authController.register
);

module.exports = router;
