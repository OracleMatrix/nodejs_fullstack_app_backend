// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Node.js API',
            version: '1.0.0',
            description: 'API Documentation',
        },
        servers: [
            {
                url: 'http://localhost:8000',
            },
            {
                url: 'https://4295-45-86-202-94.ngrok-free.app',
            }
        ],
        components: {
            securitySchemes: {
                AuthorizationHeader: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'authorization',
                },
            },
        },
        security: [
            {
                AuthorizationHeader: [],
            },
        ],
    },
    apis: ['./routes/*.js', './controllers/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
