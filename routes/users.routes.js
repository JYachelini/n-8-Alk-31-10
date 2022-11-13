const express = require('express');

const { userController } = require('../controllers');

const { paramSchema, userSchema } = require('../schemas');
const { validator, ownershipUser, checkAuth } = require('../middlewares');

const router = express.Router();

/**
 * @swagger
 *  definitions:
 *   responseSchema:
 *     type: object
 *     properties:
 *      id:
 *        type: int
 *        example: 4
 *      firstName:
 *        type: string
 *        example: John
 *      lastName:
 *         type: string
 *         example: Connor
 *      email:
 *         type: string
 *         example: johnc@gmail.com
 *      avatar:
 *        type: string
 *        example: localhost:3000/uploads/12312.webp
 *   bodyUsers:
 *    type: object
 *    properties:
 *      pagesUrl:
 *        type: object
 *        properties:
 *          next:
 *            type: string
 *            example : localhost:300/users?page=2
 *          prev:
 *            type: string
 *            example : localhost:300/users?page=1
 *          count:
 *            type: int
 *            example : 5
 *      response:
 *        type: array
 *        items:
 *          $ref: '#/definitions/responseSchema'
 *   error:
 *    type: object
 *    properties:
 *      message:
 *        type: string
 *        example: 'errors msg'
 *   userSchema:
 *     type: object
 *     properties:
 *      firstName:
 *        type: string
 *        example: John
 *      lastName:
 *         type: string
 *         example: Connor
 *      email:
 *         type: string
 *         example: johnc@gmail.com
 *      avatar:
 *        type: string
 *        example: localhost:3000/uploads/12312.webp
 *      password:
 *        type: string
 *        example: 12345678
 */

/**
 * @swagger
 * /users:
 *  get:
 *     tags:
 *       - Users
 *     summary: Finds Users
 *     description: Get all users
 *     parameters:
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/definitions/bodyUsers'
 *       '500':
 *         description: Error searching users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/error'
 */

router.get('/', checkAuth, ownershipUser, userController.get);

/**
 * @swagger
 * /users/{userId}:
 *  get:
 *     tags:
 *       - Users
 *     summary: Finds Users
 *     description: Get users by id
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: ID of user
 *        required: true
 *        schema:
 *           type: int
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/definitions/bodyUsers'
 *       '404':
 *         description: Error searching users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/error'
 */

router.get(
  '/:id',
  validator(paramSchema.validatorId),
  checkAuth,
  ownershipUser,
  userController.getById
);

/**
 * @swagger
 * /users/{userId}:
 *  delete:
 *     tags:
 *       - Users
 *     summary: delete Users
 *     description: delete user by id
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: ID of user
 *        required: true
 *        schema:
 *           type: int
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/definitions/bodyUsers'
 *       '404':
 *         description: Error searching users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/error'
 */

router.delete(
  '/:id',
  validator(paramSchema.validatorId),
  checkAuth,
  ownershipUser,
  userController.remove
);

/**
 * @swagger
 * /users/{userId}:
 *  put:
 *     tags:
 *       - Users
 *     summary: update Users
 *     description: update user by id
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: ID of user
 *        required: true
 *        schema:
 *           type: int
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
 *                 $ref: '#/definitions/bodyUsers'
 *       '404':
 *         description: Error searching users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/error'
 */

router.put(
  '/:id',
  validator(paramSchema.validatorId),
  validator(userSchema.create),
  checkAuth,
  ownershipUser,
  userController.update
);

module.exports = router;
