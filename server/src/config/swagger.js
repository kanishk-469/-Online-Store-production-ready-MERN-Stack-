import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Online Store API",
      version: "1.0.0",
      description: "Product API Documentation for Online Store",
    },
    servers: [
      {
        url: "http://localhost:8080/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            role: {
              type: "string",
              enum: ["customer", "seller"],
            },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            success: { type: "boolean" },
            role: { type: "string" },
            token: { type: "string" },
          },
        },
        Product: {
          type: "object",
          properties: {
            title: { type: "string" },
            desc: { type: "string" },
            price: { type: "number" },
            imageUrl: { type: "string" },
            stock: { type: "number" },
            categories: {
              type: "array",
              items: { type: "string" },
            },
          },
        },
      },
    },
  },
  //IMPORTANT — include all route files
  apis: [
    "./src/features/user/*.js",
    "./src/features/**/*.js",
    "./src/features/product/*.js",
  ],
};

export default swaggerJsdoc(options);
