const errorMessage = {
  statusCode: 400,
  body: JSON.stringify({ error: 'Nothing found' }),
}

export default function errorNotFound(message) {
  return ''
}