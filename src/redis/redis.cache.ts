import { RedisArgument, RedisClientType } from "redis";
import { ErrorAnyType } from "../types/types";
import graphLogger from "../libs/logger.libs";

interface IRedisCache {
  info: string;
  status: boolean;
  data: any;
}

class RedisCache {
  public redisClient: RedisClientType;

  constructor(redisClient: RedisClientType) {
    this.redisClient = redisClient;
  }

  public async cacheLifeCycle(key: string): Promise<IRedisCache | undefined> {
    try {
      const isCacheHit = await this.cacheHit(key);
      if (!isCacheHit.data) {
        graphLogger.info(`The key : ${key} Does not Exists on the Redis`);
        const cacheMiss = await this.cacheMiss();
        return cacheMiss;
      }
      return isCacheHit;
    } catch (err: ErrorAnyType) {
      graphLogger.error(
        `Error in the Redis Cache Life Cycle, Due To : ${JSON.stringify(
          err.message
        )}`
      );
    }
  }

  public async cacheHit(key: string): Promise<IRedisCache> {
    const cacheData = await this.redisClient.get(key);
    return { status: true, info: "Hit", data: cacheData };
  }

  public async cacheMiss(): Promise<IRedisCache> {
    return {
      status: true,
      info: "Miss",
      data: null,
    };
  }

  public async appendInCache(key: string, data: RedisArgument) {
    const saveData = await this.redisClient.set(key, JSON.stringify(data), {
      expiration: "KEEPTTL",
    });
    return saveData;
  }
}

export default RedisCache;
