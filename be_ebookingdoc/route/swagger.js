const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Tài liệu API cho dự án ebookingdoc',
        },
        tags: [
            { name: "User", description: "User-related operations" },
        ],
        servers: [
            { url: 'http://localhost:3210/', description: 'Production server' }
        ],
    },
apis: [path.resolve(__dirname, './swaggercomment.js')]


};

const swaggerSpec = swaggerJsdoc(options);

module.exports = (app) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        swaggerOptions: {
            docExpansion: 'none',
            defaultModelsExpandDepth: -1
        }
    }));
};
