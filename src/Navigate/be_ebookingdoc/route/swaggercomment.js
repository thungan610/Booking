// User

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Đăng ký tài khoản
 *     description: Đăng ký tài khoản người dùng mới
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: your_password
 *               phone:
 *                 type: string
 *                 example: "0123456789"
 *               name:
 *                 type: string
 *                 example: John Doe
 *               gender:
 *                 type: string
 *                 example: male
 *               address:
 *                 type: string
 *                 example: 123 Main Street
 *               status:
 *                 type: integer
 *                 example: 1
 *               doctor_id:
 *                 type: string
 *                 example: "doc-uuid"
 *               patient_id:
 *                 type: string
 *                 example: "pat-uuid"
 *               premission_id:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     uuid:
 *                       type: string
 *                     name:
 *                       type: string
 *                     email:
 *                       type: string
 *                     phone:
 *                       type: string
 *                     username:
 *                       type: string
 *                     premission_id:
 *                       type: integer
 *                     status:
 *                       type: integer
 *                 message:
 *                   type: string
 *                   example: Đăng ký thành công!
 *       400:
 *         description: Dữ liệu không hợp lệ hoặc user đã tồn tại
 *       500:
 *         description: Lỗi server
 */
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Đăng nhập
 *     description: Đăng nhập bằng số điện thoại hoặc username và mật khẩu
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             oneOf:
 *               - required: [phone, password]
 *                 properties:
 *                   phone:
 *                     type: string
 *                     example: "0123456789"
 *                   password:
 *                     type: string
 *                     example: "your_password"
 *               - required: [username, password]
 *                 properties:
 *                   username:
 *                     type: string
 *                     example: "johndoe"
 *                   password:
 *                     type: string
 *                     example: "your_password"
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     uuid:
 *                       type: string
 *                     name:
 *                       type: string
 *                     permission:
 *                       type: integer
 *                     access_token:
 *                       type: string
 *                     refresh_token:
 *                       type: string
 *       400:
 *         description: Sai thông tin đăng nhập
 *       500:
 *         description: Lỗi server
 */
