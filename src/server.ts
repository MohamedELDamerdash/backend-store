import express, { Application, json } from "express";
import routes from "./routes/main";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import conf from "./config/main";
const app: Application = express();
const address = `${conf.server.host}:${conf.server.port}`
app.use(bodyParser.json(),cors(),helmet(),json(),morgan("dev"));

app.use(routes)
app.listen(conf.server.port , function(){
    console.log(`server run :${address}`)
})
export default app;