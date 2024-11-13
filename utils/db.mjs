// Create PostgreSQL Connection Pool here !
import * as pg from "pg";
import "dotenv/config";
const { Pool } = pg.default;

// console.log(process.env.CONNECTION_STRING);

const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
});

export default pool;
