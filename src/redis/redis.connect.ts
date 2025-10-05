import { createClient, RedisClientType } from "redis";
import { ErrorAnyType } from "../types/types";
import graphLogger from "../libs/logger.libs";

class RedisConnectionError extends Error {
  constructor(message: string) {
    super(message);
  }
}

class RedisClient {
  public redisClient: any;

  public async connectRedisServer() {
    if (!this.redisClient) {
      let retryCount = 3;
      let retryStatus = true;
      while (retryCount > 0 && retryStatus) {
        try {
          this.redisClient = await createClient()
            .on("error", (error) => {
              if (error) {
                console.log(error);
                throw new RedisConnectionError(error.message);
              }
            })
            .connect();
          graphLogger.info(`Redis Server Connected SuccessFully`);
          return;
        } catch (err: ErrorAnyType) {
          if (err instanceof RedisConnectionError) {
            graphLogger.error(`Errror Connecting to the Redis Server`);
            const isMaximumRetry = retryCount.toString().startsWith("0");
            if (isMaximumRetry) {
              graphLogger.error(
                `Maximum Retry Exceeded, Cannot Connect to the Redis Server`
              );
              return;
            }
            retryCount = retryCount - 1;
            continue;
          }
        }
      }
    }
  }

  public async getRedisClient() {
    if (!this.redisClient) {
      await this.connectRedisServer();
    }
    return this.redisClient;
  }

  public async disconnectRedisServer() {
    if (this.redisClient) {
      graphLogger.info(`Disconnecting the Redis Server`);
      await this.redisClient.destroy();
    }
  }
}

const getRedisInstance = (): RedisClient => {
  return new RedisClient();
};

export default getRedisInstance;
