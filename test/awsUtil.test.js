// awsUtil.test.js
require('dotenv').config(); // Load environment variables from .env file

const awsUtil = require('../src/utils/awsUtil');

// Mock the AWS SDK
jest.mock('aws-sdk', () => {
  const mockS3Upload = jest.fn().mockReturnThis();
  const mockS3Promise = jest.fn().mockResolvedValue({
    Location: 'https://stage-dev-akki.s3.amazonaws.com/compressed/file.jpg',
  });

  return {
    S3: jest.fn(() => ({
      upload: mockS3Upload,
      promise: mockS3Promise,
    })),
    config: {
      update: jest.fn(),
    },
  };
});

describe('AWS Util', () => {
  it('should upload to S3', async () => {
    const s3Path = await awsUtil.uploadToS3(Buffer.from('file content'), 'file.jpg');
    
    expect(s3Path).toBe('https://stage-dev-akki.s3.amazonaws.com/compressed/file.jpg');
  });
});
