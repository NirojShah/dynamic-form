import http from "http"
import app from "./src/route/app.js"
import connectMongo from "./src/utility/db_connection.js"

const PORT = process.env.PORT || 7050;
const server = http.createServer(app)

connectMongo()
server.listen(PORT,()=>{
    console.log("server started")
})


