const express = require('express');
const router = express.Router();
const auth = require('../Middlewares/middlewares').auth;
const postsController = require('../controllers/posts-controller');

router.use(auth);

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: دریافت همه پست‌ها
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: لیست پست‌ها
 *       500:
 *         description: خطای سرور
 */
router.get('/', postsController.getAllPosts);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: دریافت پست با آیدی
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی پست
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: اطلاعات پست
 *       404:
 *         description: پست یافت نشد
 */
router.get('/:id/', postsController.getPostById);

/**
 * @swagger
 * /api/posts/user/{id}:
 *   get:
 *     summary: دریافت همه پست‌های یک کاربر
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی کاربر
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: لیست پست‌های کاربر
 *       400:
 *         description: کاربر یافت نشد
 *       500:
 *         description: خطای سرور
 */
router.get('/user/:id', postsController.getAllUserPosts);


/**
 * @swagger
 * /api/posts/{id}:
 *   post:
 *     summary: ایجاد پست جدید
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی نویسنده یا دسته‌بندی (بسته به منطق اپلیکیشن)
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: پست ایجاد شد
 *       400:
 *         description: درخواست نامعتبر
 */
router.post('/:id', postsController.createPost);

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: بروزرسانی پست
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی پست
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: بروزرسانی موفق
 *       404:
 *         description: پست یافت نشد
 */
router.put('/:id', postsController.updatePost);

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: حذف پست
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: آیدی پست
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: حذف موفق
 *       404:
 *         description: پست یافت نشد
 */
router.delete('/:id', postsController.deletePost);

module.exports = router;
