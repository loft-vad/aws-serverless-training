import mockProducts from '../data/mock.json';
import axios from 'axios';

export default function getRandomImage() {
  return new Promise(async (resolve, reject) => {
    let imageBase64 = '';

    try {
      imageBase64 = await axios.get('https://source.unsplash.com/random', { responseType: 'arraybuffer' })
        .then((response) => Buffer.from(response.data, 'binary').toString('base64'));
    } catch (error) {
      console.error('Error fetching an image', error);
      return reject(error);
    }

    const response = {
      "statusCode": 200,
      "isBase64Encoded": true,
      "headers": {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*"
      },
      "body": imageBase64
    };

    return resolve(response);
  })
}
