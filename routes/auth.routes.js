const { Router } = require('express');
const { authController } = require('../controllers');
const { authSchema, userSchema } = require('../schemas');
const { validator, upload } = require('../middlewares');

const router = Router();
// --- LOGIN ---
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

router.post(
  '/register',
  upload.single('avatar'),
  validator(userSchema.create),
  authController.register
);

module.exports = router;
