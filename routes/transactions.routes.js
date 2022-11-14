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
 *        type: integer
 *        example: 4
 *      description:
 *        type: string
 *        example: 'Test for transactions'
 *      amount:
 *         type: integer
 *         example: 204
 *      userId:
 *         type: integer
 *         example: 2
 *      categoryId:
 *        type: integer
 *        example: 2
 *      createdAt:
 *         type: string
 *         example: 2022/11/11
 *      updatedAt:
 *         type: string
 *         example: 2022/11/11
 *   responseCreateSchemaT:
 *     type: object
 *     properties:
 *      description:
 *        type: string
 *        example: 'Test for transactions'
 *      amount:
 *         type: integer
 *         example: 204
 *      categoryId:
 *        type: integer
 *        example: 2
 *      date:
 *        type: string
 *        example: 2022
 *   responseT:
 *        type: array
 *        items:
 *          $ref: '#/definitions/responseSchemaT'
 *   transactionSchema:
 *     type: object
 *     properties:
 *      id:
 *        type: integer
 *        example: 4
 *      description:
 *        type: string
 *        example: 'Test for transactions'
 *      amount:
 *         type: integer
 *         example: 204
 *      userId:
 *         type: integer
 *         example: 2
 *      categoryId:
 *        type: integer
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
 *             $ref: '#/definitions/responseCreateSchemaT'
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
 *           type: integer
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
 * /transactions/{transactionId}:
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
 *           type: integer
 *      - name: page
 *        in: query
 *        description: pagination
 *        required: false
 *        schema:
 *           type: integer
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
 *           type: integer
 *     requestBody:
 *         description: Created user object
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/definitions/responseCreateSchemaT'
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
 *           type: integer
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
