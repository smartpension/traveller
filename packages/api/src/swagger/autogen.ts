import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    version: '0.1.0',
    title: 'Traveller API',
    description: 'Smartpension Traveller Rest API',
  },
  host: 'localhost:4000',
}

const outputFile = './src/swagger/output.json'
const endpointsFiles = ['./src/swagger/endpoints.ts']

swaggerAutogen()(outputFile, endpointsFiles, doc)
