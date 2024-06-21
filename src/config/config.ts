import { config as conf } from "dotenv";

conf();

const _config = {
  port: process.env.PORT,
  dbUrl: process.env.MONGO_CONNECTION_STRING,
  jwtSecret: process.env.jwtSecret,
};

export const config = Object.freeze(_config);
