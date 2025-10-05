import { RedisClientType } from "redis";
import { ErrorAnyType } from "../../types/types";
import graphLogger from "../../libs/logger.libs";

async function generateRedisKeyBasedOnUserId(
  userId: string,
  redisClient: RedisClientType
): Promise<string | null> {
  try {
    const obtainAllKeys = [];
    for await (const key of redisClient.scanIterator({
      MATCH: `${userId}:*`,
    })) {
      if (Array.isArray(key) && key.length > 0) {
        graphLogger.info(`Key Has been Obtained: ${key.join(",")}`);
        obtainAllKeys.push(...key);
      }
    }

    const allUserId = Array.from(
      new Set(obtainAllKeys.filter((item) => item.includes(userId)))
    );
    graphLogger.info(`The User Has the Keys : ${allUserId.join(",")}`);
    if (Array.isArray(allUserId) && allUserId.length > 0) {
      const userSorted = allUserId[0];
      return `${userSorted.split(":")[0]}:posts`;
    } else {
      return `${userId}:posts`;
    }
  } catch (err: ErrorAnyType) {
    graphLogger.error(`Error Generating the Redis Key Based on the User Id`);
    return null;
  }
}

export { generateRedisKeyBasedOnUserId };
