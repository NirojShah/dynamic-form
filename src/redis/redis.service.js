import redisUtility from "./redis.utility.js";

const processSetValue = async ({ key, value, ttlSec = 3600 }) => {
  try {
    const currentSize = await redisUtility.redisClient.dbSize();

    if (currentSize == process.env.LIMIT) {
      await redisUtility.redisClient.lPop();
    }

    await redisUtility.redisClient.set(key, JSON.stringify(value), {
      EX: ttlSec,
    });

    return {
      success: true,
      message: "cached successfully.",
    };
  } catch (err) {
    return {
      success: false,
      message: err.message,
    };
  }
};

const processGetValue = async (key) => {};

const redisServices = {
  processSetValue,
  processGetValue,
};

export default redisServices;
