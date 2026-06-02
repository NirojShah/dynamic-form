import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.redis_url,
});

redisClient.on("connect", () => {
  console.log("redis server connected..");
});

redisClient.on("error", (err) => {
  console.log(err.message);
});

const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

const redisUtility = {
  redisClient,
  connectRedis,
};

export default redisUtility;
