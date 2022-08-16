import productsList from './handlers/getProductsList';
import productsById from './handlers/getProductsById';
import createProduct from './handlers/postProduct';
import randomImage from './handlers/getRandomImage';
import productsList2 from './handlers/getProductsList2';
import productsById2 from './handlers/getProductsById2';
const AWS = require('aws-sdk');
const { REGION, SNS_ARN } = process.env;

const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*"
};

export const getProductsList = async (event) => {
  const products = await productsList();
  products.headers = defaultHeaders;
  console.log('products: ', products);
  return products;
};

export const getProductsById = async (event) => {
  const { id } = await event.pathParameters;
  const productItem = await productsById(id);
  productItem.headers = defaultHeaders;
  console.log('productItem: ', productItem);
  return productItem;
};

export const postProduct = async (event) => {
  const { count, price, title, description } = JSON.parse(event.body);
  console.log('count, price, title, description: ', count, price, title, description);
  const result = await createProduct(count, price, title, description);
  result.headers = defaultHeaders;
  console.log('postProduct result: ', result);
  return result;
};

export const getRandomImage = async (event) => {
  const imageItem = await randomImage();
  imageItem.headers = defaultHeaders;
  console.log('imageItem: ', imageItem);
  return imageItem;
};

export const getProductsList2 = async (event) => {
  const products = await productsList2();
  products.headers = defaultHeaders;
  console.log('products: ', products);
  return products;
};

export const getProductsById2 = async (event) => {
  const { id } = await event.pathParameters;
  const productItem = await productsById2(id);
  productItem.headers = defaultHeaders;
  console.log('productItem: ', productItem);
  return productItem;
};

export const catalogBatchProcess = async (event) => {
  const sns = new AWS.SNS({ region: REGION });
  const sqsRecords = event.Records;

  for (let i = 0; i < sqsRecords.length; i++) {
    const { count, price, title, description } = JSON.parse(sqsRecords[i].body);
    const result = await createProduct(count, price, title, description);

    const snsParams = {
      Subject: 'Product item is added',
      Message: `Title: ${title}, Description: ${description}, Price: ${price}, Quantity: ${count}`,
      TopicArn: SNS_ARN,
      MessageAttributes: {
        isDress: {
          DataType: 'String',
          StringValue: title.includes("dress").toString(),
        },
      },
    };

    sns.publish(snsParams, function (error, data) {
      if (error) {
        console.error("Adding to SNS - Error: ", error);
      } else {
        console.log("SNS added product items: " + JSON.stringify(data));
      }
    });
  }
};
