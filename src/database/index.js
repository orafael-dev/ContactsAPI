const { Client } = require("pg");
const fs = require("node:fs");
const path = require("node:path");

const client = new Client({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

async function execute() {
  try {
    await client.connect();
    const sql = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
    await client.query(sql);
    console.log("SQL started with success");
  } catch (err) {
    await client.end();
    console.error(err);
  }
}

const query = async (query, values) => {
  const { rows } = await client.query(query, values);
  return rows;
};

module.exports = { query, execute };
