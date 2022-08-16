const AWS = require('aws-sdk-mock');
import importProductsFile from './handlers/importProductsFile';

// const params = {
//   Bucket: BUCKET,
//   Key: `${UPLOAD_PATH}/${fileName}`,
//   Expires: 40,
//   ContentType: 'text/csv'
// };
// S3 getObject mock - return a Buffer object with file data
AWS.mock('S3', 'getSignedUrl', (action, params, callback) => {
  callback(null, params.Key);
});

describe('importProductsFile', () => {
  it('should take a file name and generate url', async () => {
    const mockEvent = {
      queryStringParameters: {
        name: 'productsFile'
      }
    };
    const data = await importProductsFile(mockEvent);

    expect(data.statusCode).toBe(200);
    expect(data.body).toContain('https://node-in-aws-s3-wdaefarf.s3.eu-central-1.amazonaws.com/uploaded');
  });

  it('should return error', async () => {
    const data = await importProductsFile({});

    expect(data.statusCode).toBe(500);
  });
})

AWS.restore('S3');
// or AWS.restore(); this will restore all the methods and services