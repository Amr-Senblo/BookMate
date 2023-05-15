const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger configuration options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Server API',
      version: '1.0.0',
      description: 'Your API description',
    },
  },
  apis: ['./Routes/*.js'], // Replace with the path to your route files
};

// Initialize Swagger-jsdoc
const swaggerSpec = swaggerJsDoc(options);

module.exports = (app) => {
  // Serve Swagger API documentation
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
