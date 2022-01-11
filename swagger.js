const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "sasohae-admin",
        description: "Description",
    },
    host: "localhost:3000",
    schemes: ["https"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
