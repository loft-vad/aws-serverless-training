const AWS = require('aws-sdk');
const { BUCKET } = process.env;

export default async function postImageUpload(event) {
  const s3 = new AWS.S3({ region: 'eu-central-1' });

  for (const record of event.Records) {
    await s3.copyObject({
      Bucket: BUCKET,
      CopySource: BUCKET + '/' + record.s3.object.key,
      Key: record.s3.object.key.replace('images', 'thumbnails')
    }).promise();

    await s3.deleteObject({
      Bucket: BUCKET,
      Key: record.s3.object.key
    }).promise();

    console.log('Thumbnail for an image ' + record.s3.object.key.split('/')[1] + ' is created!');
  }

  return {
    statusCode: 202
  }
}