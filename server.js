import http from "http";
import app from "./src/route/app.js";
import connectMongo from "./src/utility/db_connection.js";
import { config_env } from "./environment_setup.js";
import createUserAndOrg from "./src/utility/admin.utility.js";

config_env();

const PORT = process.env.PORT || 7050;
const server = http.createServer(app);

connectMongo();

server.listen(PORT, async () => {
  const resp = await createUserAndOrg({
    name: process.env.name,
    email: process.env.email,
    orgnName: process.env.organization,
    password: process.env.password,
    role: [process.env.role],
  });
  if (resp.display) {
    console.log(resp.message);
  }
  console.log("server started : " + PORT);
});
