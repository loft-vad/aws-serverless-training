import thumbnailsList from './handlers/getThumbnailsList';
import imageUpload from './handlers/postImageUpload';
import processProductsFile from './handlers/importProductsFile';

const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*"
};

export const getThumbnailsList = async (event) => {
  const items = await thumbnailsList();
  console.log('items: ', items);
  return items;
};

export const postImageUpload = async (event) => {
  const result = await imageUpload(event);
  console.log('result: ', result);
  return result;
};

export const importProductsFile = async (event) => {
  console.log('event: ', event);
  const { name } = await event.queryStringParameters;
  const result = await processProductsFile(name);
  console.log('result: ', result);
  result.headers = defaultHeaders;
  return result;
};
