require("dotenv").config();
require("express-async-errors");

const database = require("./database");
const express = require("express");
const routes = require("./routes");
const cors = require("./app/controllers/middlewares/cors");
const errorHandler = require("./app/controllers/middlewares/errorHandler");

async function main() {
  await database.execute();
  const app = express();

  const whiteList = [process.env.FRONTEND_URL];
  const corsOptions = {
    origin: function (origin, callback) {
      if ((origin && whiteList.includes(origin)) ?? !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  };

  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(routes);
  app.use(errorHandler);
  const port = Number(process.env.PORT);
  app.listen(port, () =>
    console.log(`🔥 - Server starded at http://localhost:${port}`)
  );
}

main();
