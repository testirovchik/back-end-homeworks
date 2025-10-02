import express from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import authRouter from "./routes/auth.js";

import sequelize from "./db.js";

const app = express();

// սwagger docs
const docs = YAML.load("./docs/api.yaml");

// մiddleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

await sequelize.sync()
// րoutes
app.use("/api", swaggerUI.serve, swaggerUI.setup(docs));
app.use("/auth", authRouter);


// սtart server
app.listen(4002, () => {
  console.log("Server running at http://localhost:4002/api");
});
