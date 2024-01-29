const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

/**
 * Handle POST requests to the '/upload' endpoint.
 *
 * @function
 * @name POST /upload
 * @memberof module:routes/imageRoutes
 * @param {string} path - The route path.
 * @param {Function} middleware - The middleware function for handling file uploads.
 * @param {Function} controller - The controller function for handling the uploaded image.
 * @throws {Error} Throws an error if there is an issue processing the image upload.
 */
router.post('/upload', uploadMiddleware.single('image'), imageController.uploadImage);

module.exports = router;