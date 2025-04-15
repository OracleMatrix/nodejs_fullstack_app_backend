const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/middlewares').auth;
const usersController = require('../controllers/users-controller');

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: ثبت‌نام کاربر جدید
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: ثبت موفق
 *       400:
 *         description: اطلاعات نادرست یا کاربر وجود دارد
 */
router.post('/register', usersController.register);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: ورود کاربر
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: ورود موفق
 *       400:
 *         description: ایمیل یا رمز اشتباه
 */
router.post('/login', usersController.login);

router.use(auth);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: دریافت همه کاربران
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: لیست کاربران
 *       404:
 *         description: کاربری یافت نشد
 */
router.get('/', usersController.getAllUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: دریافت کاربر با آیدی
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: آیدی کاربر
 *     responses:
 *       200:
 *         description: موفق
 *       404:
 *         description: کاربر یافت نشد
 */
router.get('/:id', usersController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: ویرایش اطلاعات کاربر
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: آیدی کاربر
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: ویرایش موفق
 *       404:
 *         description: کاربر یافت نشد
 */
router.put('/:id', usersController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: حذف کاربر
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: آیدی کاربر
 *     responses:
 *       200:
 *         description: حذف موفق
 *       404:
 *         description: کاربر یافت نشد
 */
router.delete('/:id', usersController.deleteUser);

module.exports = router;
