import "dotenv/config";
import pg from "pg";

const { Pool } = pg;
// set the way we will connect to the server
const pgConnectionConfigs = {
  user: "ameliawibi",
  host: "localhost",
  database: "taskapp",
  port: 5432, // Postgres server always runs on this port
};

// create the var we'll use
export const pool = new Pool(pgConnectionConfigs);