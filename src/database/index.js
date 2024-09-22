const { Client } = require("pg");
const fs = require("node:fs");
const path = require("node:path");

class Database {
  constructor() {
    this.client = new Client({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL === "require",
    });
  }
  async connect() {
    await this.client.connect();
    const sql = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf8");
    await this.client.query(sql);
    console.log("SQL started with success");
  }
  async disconnect() {
    await this.client.end();
  }

  async query(query, values) {
    const { rows } = await this.client.query(query, values);
    return rows;
  }
}

module.exports = new Database();
