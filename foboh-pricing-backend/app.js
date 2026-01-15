const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const app = express();
const productsRouter = require("./routes/products");
const pricingProfilesRouter = require("./routes/pricing-profiles");
const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors());
app.use(express.json());

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/pricing-profiles", pricingProfilesRouter);

app.get("/", (_req, res) => res.send("API WORKING"));

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
  console.log(
    "API documentation is available at http://localhost:3000/api-docs"
  );
});
