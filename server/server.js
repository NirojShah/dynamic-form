import http from "http";
import app from "./src/route/app.js";
import connectMongo from "./src/utility/db_connection.js";
import createUserAndOrg from "./src/utility/admin.utility.js";
import redisUtility from "./src/redis/redis.utility.js";

const PORT = process.env.PORT || 7050;
const server = http.createServer(app);

connectMongo();

server.listen(PORT, async () => {
  await redisUtility.connectRedis();
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
