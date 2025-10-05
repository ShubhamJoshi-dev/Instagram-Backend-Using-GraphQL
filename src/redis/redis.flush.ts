import { RedisClientType } from "redis";
import { FLUSH_ENABLED } from "../constant/redis.constant";
import graphLogger from "../libs/logger.libs";
import getRedisInstance from "./redis.connect";

async function flushAllKeysFromRedis() {
  const redisInstance = getRedisInstance();
  if (FLUSH_ENABLED) {
    const redisClient = await redisInstance.getRedisClient();
    graphLogger.info(`Flushing all the Data From the Databases`);
    await redisClient.flushAll();
    await redisClient.destroy();
  } else {
    graphLogger.info(`Not Flushing all the Data From the Databases`);
  }
}

export default flushAllKeysFromRedis;
