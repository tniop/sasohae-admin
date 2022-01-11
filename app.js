const express = require("express");
const app = express();
const connect = require("./models/index");
connect();
const router = require("./routes/router");
const cors = require("cors");
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger-output");
require("dotenv").config();

app.use(express.static("public"));

app.use("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use((req, res, next) => {
    res.sendStatus(404);
});
app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});
