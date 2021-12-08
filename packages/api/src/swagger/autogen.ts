import swaggerAutogen from 'swagger-autogen'

const city = {
  id: 1,
  name: 'London',
  country: 'United Kingdom',
  visited: false,
  wishlist: true,
}

const doc = {
  info: {
    version: '0.1.0',
    title: 'Traveller API',
    description: 'Smartpension Traveller Rest API',
  },
  host: 'localhost:4000',
  definitions: {
    City: city,
    Cities: [city],
  },
}

const outputFile = './src/swagger/output.json'
const endpointsFiles = ['./src/swagger/endpoints.ts']

swaggerAutogen()(outputFile, endpointsFiles, doc)
