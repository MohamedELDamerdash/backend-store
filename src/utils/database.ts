import { Pool } from "pg";
import conf from "../config/main";

const client = new Pool({
    host: conf.db.host,
    database: conf.db.database ,
    user: conf.db.user,
    password: (conf.db.password)as string
  });
  
  export default client;
  