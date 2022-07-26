import productsList from './handlers/getProductsList';
import productsById from './handlers/getProductsById';
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
  return products;
};

export const getProductsById = async (event) => {
  const { id } = await event.pathParameters;
  const productItem = await productsById(id);
  productItem.headers = defaultHeaders;
  return productItem;
};

export const getRandomImage = async (event) => {
  const imageItem = await randomImage();
  imageItem.headers = defaultHeaders;
  return imageItem;
};

export const getProductsList2 = async (event) => {
  const products = await productsList2();
  products.headers = defaultHeaders;
  return products;
};

export const getProductsById2 = async (event) => {
  const { id } = await event.pathParameters;
  const productItem = await productsById2(id);
  productItem.headers = defaultHeaders;
  return productItem;
};
