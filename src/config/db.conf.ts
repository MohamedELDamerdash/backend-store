import dotenv from "dotenv";

dotenv.config();

const env = process.env.ENV || "test";

const dbConf = {
    user: process.env.pg_user,
    password: (process.env.pg_password)as string,
    host: process.env.host || "0.0.0.0",
    port: Number(process.env.pg_port) || 5000,
    database: process.env.pg_db,
}

if(env === 'test') dbConf.database = process.env.pg_db_t;

export default dbConf;