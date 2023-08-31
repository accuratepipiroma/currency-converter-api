// app.js

const express = require("express");
const bodyParser = require("body-parser");
const convertRouter = require("./routes/convert"); // Import the router
const updateLocalRatesRouter = require("./routes/update-local-rates"); // Import the router

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use the router for the /convert route
app.use(convertRouter);
app.use(updateLocalRatesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
