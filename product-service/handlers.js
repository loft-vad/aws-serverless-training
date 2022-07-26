import productsList from './handlers/getProductsList';
import productsById from './handlers/getProductsById';
import randomImage from './handlers/getRandomImage';

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
