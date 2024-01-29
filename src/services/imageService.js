const fs = require('fs').promises;

const sharp = require('sharp');
const awsUtil = require('../utils/awsUtil');

/**
 * Read, compress, and upload an image file to Amazon S3.
 *
 * @function
 * @async
 * @name module:services/imageService.compressAndUpload
 * @param {Object} file - The uploaded file object.
 * @param {string} file.path - The path to the uploaded file.
 * @param {string} file.originalname - The original name of the uploaded file.
 * @param {string} file.mimetype - The MIME type of the uploaded file.
 * @returns {Promise<string>} - A Promise that resolves with the S3 path after the image is uploaded.
 * @throws {Error} - Throws an error if there is an issue processing the image upload.
 */
exports.compressAndUpload = async (file) => {
  try {
    // Read the file buffer using the file path
    const imageBuffer = await fs.readFile(file.path);

    // Compress the image using Sharp
    const compressedImageBuffer = await compressImage(imageBuffer, file.mimetype);

    // Upload the compressed image to S3
    const s3Path = await awsUtil.uploadToS3(compressedImageBuffer, file.originalname);

    console.log(s3Path);

    // Remove the uploaded file from the local storage if needed
    await fs.unlink(file.path);

    return s3Path;
  } catch (error) {
    throw error;
  }
};

/**
 * Compress an image buffer based on its MIME type.
 *
 * @function
 * @async
 * @private
 * @param {Buffer} imageBuffer - The buffer containing the image data.
 * @param {string} mimetype - The MIME type of the image.
 * @returns {Promise<Buffer>} - A Promise that resolves with the compressed image buffer.
 * @throws {Error} - Throws an error if there is an issue with image compression.
 */
async function compressImage(imageBuffer, mimetype) {
    let compressedImageBuffer;

    switch (mimetype) {
        case 'image/jpeg':
          compressedImageBuffer = await compressJPEG(imageBuffer);
          break;
        case 'image/png':
          compressedImageBuffer = await compressPNG(imageBuffer);
          break;
        case 'image/gif':
          compressedImageBuffer = await compressGIF(imageBuffer);
          break;
        case 'image/webp':
          compressedImageBuffer = await compressWebP(imageBuffer);
          break;
        case 'image/svg+xml':
          compressedImageBuffer = await compressSVG(imageBuffer);
          break;
        // Add more cases for other image formats as needed
        default:
          throw new Error('Unsupported image format');
      }

    return compressedImageBuffer;
}

/**
 * Compress a JPEG image.
 *
 * @param {Buffer} imageBuffer - The buffer containing the image data.
 * @returns {Promise<Buffer>} - A Promise that resolves with the compressed image buffer.
 */
async function compressJPEG(imageBuffer) {
  return sharp(imageBuffer)
    .jpeg({ quality: 80 }) // Adjust quality as needed
    .toBuffer();
}

/**
 * Compress a PNG image.
 *
 * @param {Buffer} imageBuffer - The buffer containing the image data.
 * @returns {Promise<Buffer>} - A Promise that resolves with the compressed image buffer.
 */
async function compressPNG(imageBuffer) {
  return sharp(imageBuffer)
    .png({ compressionLevel: 9 }) // Adjust compression level as needed
    .toBuffer();
}

/**
 * Compress a GIF image.
 *
 * @param {Buffer} imageBuffer - The buffer containing the image data.
 * @returns {Promise<Buffer>} - A Promise that resolves with the compressed image buffer.
 */
async function compressGIF(imageBuffer) {
  // GIFs are typically lossless, so we may not perform additional compression
  return imageBuffer;
}

/**
 * Compress a WebP image.
 *
 * @param {Buffer} imageBuffer - The buffer containing the image data.
 * @returns {Promise<Buffer>} - A Promise that resolves with the compressed image buffer.
 */
async function compressWebP(imageBuffer) {
  return sharp(imageBuffer)
    .webp({ quality: 80 }) // Adjust quality as needed
    .toBuffer();
}

/**
 * Compress an SVG image.
 *
 * @param {Buffer} imageBuffer - The buffer containing the image data.
 * @returns {Promise<Buffer>} - A Promise that resolves with the compressed image buffer.
 */
async function compressSVG(imageBuffer) {
  // SVGs are typically XML-based and don't need traditional compression
  return imageBuffer;
}
