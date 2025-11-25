import { Client } from "pg";

async function query(queryObject) {
  const config = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    ssl: {
      rejectUnauthorized: false,
    },
  };
  const client = new Client(config);

  console.log("Credencias do postgres:", config);

  try {
    await client.connect();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await client.end();
  }
}

export default {
  query: query,
};
