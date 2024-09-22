require("dotenv").config();
require("express-async-errors");

const database = require("./database");
const express = require("express");
const routes = require("./routes");
const cors = require("./app/controllers/middlewares/cors");
const errorHandler = require("./app/controllers/middlewares/errorHandler");

async function main() {
  const app = express();

  app.use(express.json());
  app.use(cors);
  app.use(routes);
  app.use(errorHandler);
  const port = Number(process.env.PORT);
  await database
    .connect()
    .then(() => {
      app.listen(port, () =>
        console.log(`🔥 - Server starded at http://localhost:${port}`)
      );
    })
    .catch(() => database.disconnect());
}

main();
