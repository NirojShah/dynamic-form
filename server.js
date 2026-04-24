import http from "http";
import app from "./src/route/app.js";
import connectMongo from "./src/utility/db_connection.js";
import { config_env } from "./environment_setup.js";


config_env();

const PORT = process.env.PORT || 7050;
const server = http.createServer(app);

connectMongo();
server.listen(PORT,()=>{
    console.log("server started : "+PORT);
});


