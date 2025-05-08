export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Backend",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: process.env.SERVER_URL,
      },
    ],
  },
  apis: [
    "./administrator/*.js",
    "./courier/*.js",
    "./customer/*.js",
    "./vendor/*.js",
    "./order/*.js",
    "./delivery/*.js",
  ],
};
