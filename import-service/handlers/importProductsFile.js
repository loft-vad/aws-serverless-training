const AWS = require('aws-sdk');
const { BUCKET, UPLOAD_PATH, REGION } = process.env;

export default async function getSignedUrlForPut(fileName) {
  console.log('fileName: ', fileName);
  const s3 = new AWS.S3({ region: REGION });
  let statusCode = 200;
  let body = {};

  const params = {
    Bucket: BUCKET,
    Key: `${UPLOAD_PATH}/${fileName}`,
    Expires: 60,
    ContentType: 'text/csv'
  };

  return new Promise((resolve, reject) => {
    s3.getSignedUrlPromise('putObject', params, (error, url) => {
      console.log('url ', url);

      if (url) {
        resolve({
          statusCode: statusCode,
          body: JSON.stringify(url)
        });
      } else {
        console.error('Error');
        console.error(error);
        reject({
          statusCode: 500,
          body: JSON.stringify(error)
        });
      }
    })
  })
  // try {


  //   body = JSON.stringify(url)
  //   console.log(body);
  // } catch (error) {
  //   console.error('Error');
  //   console.error(error);
  //   statusCode = 500;
  //   body = error;
  // }

  // return {
  //   statusCode,
  //   headers: { 'Access-Control-Allow-Origin': '*' },
  //   body
  // };

  // let statusCode = 200;
  // let body = {};
  // let thumbnails = [];
};

// export default async function postImageUpload(event) {
//   const s3 = new AWS.S3({ region: REGION });

//   for (const record of event.Records) {
//     await s3.copyObject({
//       Bucket: BUCKET,
//       CopySource: BUCKET + '/' + record.s3.object.key,
//       Key: record.s3.object.key.replace('images', 'thumbnails')
//     }).promise();

//     await s3.deleteObject({
//       Bucket: BUCKET,
//       Key: record.s3.object.key
//     }).promise();

//     console.log('Thumbnail for an image ' + record.s3.object.key.split('/')[1] + ' is created!');
//   }

//   return {
//     statusCode: 202
//   }
// }