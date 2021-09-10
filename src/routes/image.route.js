const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const imageValidation = require('../validations/image.validation');
const imageController = require('../controllers/image.controller');

const router = express.Router();

const uploadSingle = require('../middlewares/multer');

router
  .route('/')
  .post(auth('getUsers'), uploadSingle, validate(imageValidation.uploadImage), imageController.uploadImage) // Use multer middleware to parse multipart form data
  .get(auth('getUsers'), validate(imageValidation.getImages), imageController.getImages);

router
  .route('/:imageId')
  .get(auth('getUsers'), validate(imageValidation.getImage), imageController.getImage)
  .patch(auth('manageUsers'), validate(imageValidation.updateImage), imageController.updateImage)
  .delete(auth('manageUsers'), validate(imageValidation.deleteImage), imageController.deleteImage);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: Image management and retrieval
 */

/**
 * @swagger
 * /images:
 *   post:
 *     summary: Create an image
 *     description: Logged in users can upload only their own images. Only admins can upload images for other users.
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - desc
 *               - image
 *               - userId
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *               data:
 *                 type: string
 *               user:
 *                 type: mongoose.SchemaTypes.ObjectId
 *             example:
 *               name: new photo
 *               desc: beautiful photo with trees
 *               data: (uploaded photo in binary)
 *               user: 613990d2620caf3d7cd21436
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Image'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all images
 *     description: Only admins can retrieve all images.
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Image'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /images/{id}:
 *   get:
 *     summary: Get an Image
 *     description: Logged in users can fetch only their own images. Only admins can fetch other users' images.
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Image id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Image'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an Image
 *     description: Logged in users can only update their own images. Only admins can update other users' images.
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Image id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               desc:
 *                 type: string
 *               image:
 *                 type: string
 *             example:
 *               name: new photo
 *               desc: beautiful photo with trees
 *               data: (uploaded photo in binary)
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Image'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete an image
 *     description: Logged in users can delete their own images. Only admins can delete other users's images.
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Image id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
