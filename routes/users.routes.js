const express = require('express');

const { userController } = require('../controllers');

const { paramSchema, userSchema } = require('../schemas');
const { validator, ownershipUser, checkAuth } = require('../middlewares');

const router = express.Router();

/**
 * @swagger
 *  components:
 *    securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 */
/**
 * @swagger
 *  definitions:
 *   responseSchema:
 *     type: object
 *     properties:
 *      id:
 *        type: integer
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
 *      createdAt:
 *        type: string
 *        example: 2022/11/11
 *      updatedAt:
 *        type: string
 *        example: 2022/11/11
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
 *            type: integer
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
 *        format: binary
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
 *     security:
 *      - bearerAuth: []
 *     description: Get all users
 *     parameters:
 *      - name: page
 *        in: query
 *        description: pagination
 *        required: false
 *        schema:
 *           type: integer
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
 *      4XX:
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

router.get('/', checkAuth, ownershipUser, userController.get);

/**
 * @swagger
 * /users/{userId}:
 *  get:
 *     tags:
 *       - Users
 *     summary: Finds Users
 *     security:
 *      - bearerAuth: []
 *     description: Get users by id
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: ID of user
 *        required: true
 *        schema:
 *           type: integer
 *      - name: page
 *        in: query
 *        description: pagination
 *        required: false
 *        schema:
 *           type: integer
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
 *      4XX:
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
 *     security:
 *      - bearerAuth: []
 *     description: delete user by id
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: ID of user
 *        required: true
 *        schema:
 *           type: integer
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
 *      4XX:
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
 *     security:
 *      - bearerAuth: []
 *     description: update user by id
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: ID of user
 *        required: true
 *        schema:
 *           type: integer
 *     requestBody:
 *         description: Created user object
 *         content:
 *          application/json:
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
 *      4XX:
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

router.put(
  '/:id',
  validator(paramSchema.validatorId),
  validator(userSchema.create),
  checkAuth,
  ownershipUser,
  userController.update
);

module.exports = router;
