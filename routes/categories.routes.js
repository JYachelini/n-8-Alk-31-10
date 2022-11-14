const express = require('express');
const { validator } = require('../middlewares');
const { categorySchema } = require('../schemas');
const { categoriesController } = require('../controllers');

const router = express.Router();

/**
 * @swagger
 *  definitions:
 *   responseSchema:
 *     type: object
 *     properties:
 *      id:
 *        type: integer
 *        example: 4
 *      name:
 *        type: string
 *        example: Incomes
 *      description:
 *         type: string
 *         example: entry that a lot of money
 *   bodyCategories:
 *    type: object
 *    properties:
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
 *   categorySchema:
 *     type: object
 *     properties:
 *      name:
 *        type: string
 *        example: Incomes
 *      description:
 *         type: string
 *         example: entry that a lot of money
 *
 */

/**
 * @swagger
 * /categories:
 *  post:
 *     tags:
 *       - Categories
 *     summary: Create new Categories
 *     description: Create new Category
 *     requestBody:
 *         description: Created Category object
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/definitions/categorySchema'
 *     responses:
 *       '200':
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/definitions/bodyCategories'
 *       '404':
 *         description: Error creating new category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/error'
 */
router.post('/', validator(categorySchema.create), categoriesController.create);

/**
 * @swagger
 * /categories:
 *  get:
 *     tags:
 *       - Categories
 *     summary: Find all Categories
 *     description: Get all categories
 *     parameters:
 *     responses:
 *       '200':
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/definitions/bodyCategories'
 *       '500':
 *         description: Error searching categories
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/error'
 */
router.get('/', categoriesController.get);

/**
 * @swagger
 * /categories/{categoryId}:
 *  get:
 *     tags:
 *       - Categories
 *     summary: Find Category
 *     description: Get categories by id
 *     parameters:
 *      - name: categoryId
 *        in: path
 *        description: ID of category
 *        required: true
 *        schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/definitions/bodyCategories'
 *       '404':
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/error'
 */
router.get('/:id', categoriesController.getById);

/**
 * @swagger
 * /categories/{categoryId}:
 *  put:
 *     tags:
 *       - Categories
 *     summary: update Categories
 *     description: update category by id
 *     parameters:
 *      - name: categoryId
 *        in: path
 *        description: ID of category
 *        required: true
 *        schema:
 *           type: integer
 *     requestBody:
 *         description: Created category object
 *         content:
 *          application/json:
 *           schema:
 *             $ref: '#/definitions/categorySchema'
 *     responses:
 *       '200':
 *         description: Categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/definitions/bodyCategories'
 *       '404':
 *         description: Error creating new category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/error'
 */
router.put('/:id', categoriesController.update);

/**
 * @swagger
 * /categories/{categoryId}:
 *  delete:
 *     tags:
 *       - Categories
 *     summary: delete Categories
 *     description: delete category by id
 *     parameters:
 *      - name: categoryId
 *        in: path
 *        description: ID of category
 *        required: true
 *        schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Category was deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/definitions/bodyCategories'
 *       '404':
 *         description: Error searching users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/error'
 */
router.delete('/:id', categoriesController.remove);

module.exports = router;
