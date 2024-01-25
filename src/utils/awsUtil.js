const aws = require('aws-sdk');

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

/**
 * Upload a compressed image buffer to Amazon S3.
 *
 * @function
 * @async
 * @name module:utils/awsUtil.uploadToS3
 * @param {Buffer} buffer - The compressed image buffer to be uploaded.
 * @param {string} fileName - The original filename of the image.
 * @returns {Promise<string>} - A Promise that resolves with the S3 path after the image is uploaded.
 * @throws {Error} - Throws an error if there is an issue with the S3 upload.
 */
exports.uploadToS3 = async (buffer, fileName) => {
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `compressed/${fileName}`,
    Body: buffer,
    ContentType: 'image/jpeg', // Adjust the content type as needed
  };

  try {
    // Upload the image to S3
    await s3.upload(params).promise();

    // Return the S3 path
    return `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/compressed/${fileName}`;
  } catch (error) {
    throw error;
  }
};
