import productsList from './handlers/getProductsList';
import productsById from './handlers/getProductsById';
import createProduct from './handlers/postProduct';
import randomImage from './handlers/getRandomImage';
import productsList2 from './handlers/getProductsList2';
import productsById2 from './handlers/getProductsById2';

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
