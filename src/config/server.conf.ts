import dotenv from "dotenv";

dotenv.config();

const serverconf = {
    port: process.env.port || 5000,
    host: process.env.host || '0.0.0.0'
}

export default serverconf;