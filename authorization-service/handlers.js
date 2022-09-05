import basicAuthorizerFunction from './handlers/basicAuthorizer';

const defaultHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*"
};

export const basicAuthorizer = async (event) => {
  console.log('event: ', event);
  const result = basicAuthorizerFunction(event);

  return result;
};
