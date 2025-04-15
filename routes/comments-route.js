const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/middlewares').auth;
const commentsController = require('../controllers/comments-controller');

router.use(auth);

/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: ایجاد کامنت جدید
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *               - userId
 *               - content
 *             properties:
 *               postId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: کامنت با موفقیت ایجاد شد
 *       400:
 *         description: داده‌های نامعتبر
 */
router.post('/', commentsController.createComment);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   get:
 *     summary: دریافت یک کامنت با آیدی
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: آیدی کامنت
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: اطلاعات کامنت
 *       404:
 *         description: کامنت یافت نشد
 */
router.get('/:commentId', commentsController.getCommentById);

/**
 * @swagger
 * /api/comments/post/{postId}:
 *   get:
 *     summary: دریافت تمام کامنت‌های یک پست
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: آیدی پست
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: لیست کامنت‌ها
 *       404:
 *         description: پست یافت نشد
 */
router.get('/post/:postId', commentsController.getCommentsByPostId);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   put:
 *     summary: بروزرسانی محتوای کامنت
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: آیدی کامنت
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: بروزرسانی موفق
 *       404:
 *         description: کامنت یافت نشد
 */
router.put('/:commentId', commentsController.updateComment);

/**
 * @swagger
 * /api/comments/{commentId}:
 *   delete:
 *     summary: حذف یک کامنت
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         description: آیدی کامنت
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: حذف موفق
 *       404:
 *         description: کامنت یافت نشد
 */
router.delete('/:commentId', commentsController.deleteComment);

module.exports = router;
