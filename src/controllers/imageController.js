const imageService = require('../services/imageService');
const ResponseBuilderUtil = require('../utils/responseBuilderUtil');

/**
 * Handle the logic for uploading and compressing an image.
 *
 * @function
 * @async
 * @name module:controllers/imageController.uploadImage
 * @param {Object} req - The Express request object.
 * @param {Object} req.file - The uploaded file object.
 * @param {Object} res - The Express response object.
 * @returns {Promise<void>} - A Promise that resolves after handling the image upload.
 */
exports.uploadImage = async (req, res) => {
  try {
    // Upload and compress the image using the imageService
    const s3Path = await imageService.compressAndUpload(req.file);

    res.status(200).json(ResponseBuilderUtil.buildSuccess('Image uploaded and compressed successfully!', { s3Path }));
  } catch (error) {
    console.error('Error:', error);

    res.status(500).json(ResponseBuilderUtil.buildError('Internal Server Error', error));
  }
};
