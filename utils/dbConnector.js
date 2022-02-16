const mongoose = require("mongoose");

const mongoOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 30000,
};

const DEFAULT_DB_URL = "mongodb://localhost:27017:test";
const connect = (db_url) => mongoose.createConnection(db_url, mongoOptions);

const dbUrlByTenant = (tenantName) => {
  const db_url = tenantName
    ? `mongodb://localhost:27017/${tenantName}`
    : DEFAULT_DB_URL;
  return db_url;
};

const connectToDB = (tenantName) => {
  const db_url = dbUrlByTenant(tenantName);
  const db = connect(db_url);
  db.on("open", () => {
    console.info(`Mongoose connection open to ${db_url}`);
  });
  db.on("error", (err) => {
    console.info(`Mongoose connection error: ${err} `);
    process.exit(0);
  });
  return db;
};

const getTenantDB = (tenantName) => {
  const dbInstance = connectToDB(tenantName);
  const db = dbInstance.useDb(tenantName);
  return db;
};

module.exports = { getTenantDB };
