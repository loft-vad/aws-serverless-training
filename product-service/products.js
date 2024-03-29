'use strict';

const axios = require('axios')

const mockProducts = [
  {
    "count": 4,
    "description": "Dress",
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    "price": 2.4,
    "title": "ProductOne"
  },
  {
    "count": 6,
    "description": "Short Product Description3",
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a0",
    "price": 10,
    "title": "ProductNew"
  },
  {
    "count": 7,
    "description": "Short Product Description2",
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a2",
    "price": 23,
    "title": "ProductTop"
  },
  {
    "count": 12,
    "description": "Short Product Description7",
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    "price": 15,
    "title": "ProductTitle"
  },
  {
    "count": 7,
    "description": "Short Product Description2",
    "id": "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    "price": 23,
    "title": "Product"
  },
  {
    "count": 8,
    "description": "Short Product Description4",
    "id": "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    "price": 15,
    "title": "ProductTest"
  },
  {
    "count": 2,
    "description": "Short Product Descriptio1",
    "id": "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    "price": 23,
    "title": "Product2"
  },
  {
    "count": 3,
    "description": "Short Product Description7",
    "id": "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    "price": 15,
    "title": "ProductName"
  }
];

const image = () => {
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
};

module.exports.getRandomImage = image;

module.exports.getProductsList = async (event) => {

  const response = {
    "statusCode": 200,
    "headers": {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    },
    "body": JSON.stringify(mockProducts)
  };

  return response;
};

module.exports.getProductsById = async (event) => {
  const id = event.pathParameters.id;
  const responseBody = JSON.parse(JSON.stringify(mockProducts));

  const result = responseBody.find((item) => {
    return item.id === id;
  }) || { "error": "Not found" };

  const response = {
    "statusCode": 200,
    "headers": {
      "my_header": "my_value",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    },
    "body": JSON.stringify(result)
  };

  return response;
};
