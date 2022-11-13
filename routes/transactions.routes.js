const express = require('express');
const { transactionController } = require('../controllers');
const {
  validator,
  checkAuth,
  ownershipTransaction,
} = require('../middlewares');
const { transactionSchema } = require('../schemas');
const router = express.Router();

/**
 * @swagger
 *  definitions:
 *   responseSchemaT:
 *     type: object
 *     properties:
 *      id:
 *        type: int
 *        example: 4
 *      descriptions:
 *        type: string
 *        example: 'Test for transactions'
 *      amount:
 *         type: int
 *         example: 204
 *      userId:
 *         type: int
 *         example: 2
 *      categoryId:
 *        type: int
 *        example: 2
 *      createdAt:
 *         type: string
 *         example: 2022/11/11
 *      updatedAt:
 *         type: string
 *         example: 2022/11/11
 *   responseT:
 *        type: array
 *        items:
 *          $ref: '#/definitions/responseSchemaT'
 *   transactionSchema:
 *     type: object
 *     properties:
 *      id:
 *        type: int
 *        example: 4
 *      descriptions:
 *        type: string
 *        example: 'Test for transactions'
 *      amount:
 *         type: int
 *         example: 204
 *      userId:
 *         type: int
 *         example: 2
 *      categoryId:
 *        type: int
 *        example: 2
 */

/**
 * @swagger
 * /transactions:
 *  post:
 *     tags:
 *       - Transactions
 *     summary: create transaction
 *     security:
 *      - bearerAuth: []
 *     description: create transaction
 *     requestBody:
 *         description: Created transaction object
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/definitions/transactionSchema'
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/definitions/responseSchemaT'
 *       '404':
 *         description: Error searching users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/error'
 */

router.post(
  '/',
  validator(transactionSchema.create),
  checkAuth,
  transactionController.create
);

/**
 * @swagger
 * /transactions:
 *  get:
 *     tags:
 *       - Transactions
 *     summary: Finds transactions
 *     security:
 *      - bearerAuth: []
 *     description: Get transactions
 *     parameters:
 *      - name: page
 *        in: query
 *        description: pagination
 *        required: false
 *        schema:
 *           type: int
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/definitions/responseT'
 *       '403':
 *         description: Error searching users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/error'
 */
router.get('/', checkAuth, transactionController.get);
/**
 * @swagger
 * /transactions/{userId}:
 *  get:
 *     tags:
 *       - Transactions
 *     summary: Finds transactions
 *     security:
 *      - bearerAuth: []
 *     description: Get transactions
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: ID of user
 *        required: true
 *        schema:
 *           type: int
 *      - name: page
 *        in: query
 *        description: pagination
 *        required: false
 *        schema:
 *           type: int
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/definitions/responseT'
 */

router.get(
  '/:id',
  checkAuth,
  ownershipTransaction,
  transactionController.getById
);
/**
 * @swagger
 * /transactions/{transactionId}:
 *  put:
 *     tags:
 *       - Transactions
 *     summary: update transaction
 *     security:
 *      - bearerAuth: []
 *     description: update transaction by id
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
 *             $ref: '#/definitions/transactionSchema'
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/definitions/responseSchemaT'
 *       '404':
 *         description: Error searching users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/error'
 */

router.put(
  '/:id',
  validator(transactionSchema.create),
  checkAuth,
  ownershipTransaction,
  transactionController.update
);

/**
 * @swagger
 * /transactions/{transactionId}:
 *  delete:
 *     tags:
 *       - Transactions
 *     summary: delete trannsaction
 *     security:
 *      - bearerAuth: []
 *     description: delete transaction by id
 *     parameters:
 *      - name: transactionId
 *        in: path
 *        description: ID of transaction
 *        required: true
 *        schema:
 *           type: int
 *     responses:
 *       '200':
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/definitions/responseT'
 *       '404':
 *         description: Error searching users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/error'
 */
router.delete(
  '/:id',
  checkAuth,
  ownershipTransaction,
  transactionController.remove
);

module.exports = router;
