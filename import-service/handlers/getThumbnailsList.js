const AWS = require('aws-sdk');
const { BUCKET, REGION } = process.env;

export default async function thumbnailsList() {
  const s3 = new AWS.S3({ region: REGION });
  let statusCode = 200;
  let body = {};
  let thumbnails = [];
  const params = {
    Bucket: BUCKET,
    Prefix: 'thumbnails/',
  }

  try {
    const s3Response = await s3.listObjectsV2(params).promise();
    console.log('s3Response: ', s3Response);
    thumbnails = s3Response.Contents;
    body = JSON.stringify(
      thumbnails
        .filter(thumbnail => thumbnail.Size)
        .map(thumbnail => `https://${BUCKET}.s3.amazonaws.com/${thumbnail.Key}`)
    )
    console.log(body);
  } catch (error) {
    console.error('Error');
    console.error(error);
    statusCode = 500;
    body = error;
  }

  return {
    statusCode,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body
  };
}