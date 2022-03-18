import "dotenv/config";
import pg from "pg";

const { Pool } = pg;
let pgConnectionConfigs;
if (process.env.ENV === "PRODUCTION") {
  // determine how we connect to the remote Postgres server
  pgConnectionConfigs = {
    user: "postgres",
    // set DB_PASSWORD as an environment variable for security.
    password: process.env.DB_PASSWORD,
    host: "localhost",
    database: "taskapp",
    port: 5432,
  };
} else {
  // determine how we connect to the local Postgres server
  pgConnectionConfigs = {
    user: "ameliawibi",
    host: "localhost",
    database: "taskapp",
    port: 5432, // Postgres server always runs on this port
  };
}

// create the var we'll use
export const pool = new Pool(pgConnectionConfigs);