const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const bodyParser = require("body-parser");
const convertRouter = require("./routes/convert");
const updateLocalRatesRouter = require("./routes/update-local-rates");

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(convertRouter);
app.use(updateLocalRatesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
