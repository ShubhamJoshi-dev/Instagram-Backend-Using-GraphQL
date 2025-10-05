import { RedisClientType } from "redis";
import { ErrorAnyType } from "../../../types/types";
import { UNLIKE_SUBSCRIBER } from "../../../constant/redis.constant";
import graphLogger from "../../../libs/logger.libs";

async function publishToUnlikeSubscribers(
  payload: Record<string, any>,
  redisClient: RedisClientType
) {
  return new Promise(async (resolve, reject) => {
    try {
      const bufferPayload = JSON.stringify(payload);
      await redisClient.publish(UNLIKE_SUBSCRIBER, bufferPayload);
      graphLogger.info(
        `Message Published to the ${UNLIKE_SUBSCRIBER} with Payload : ${JSON.stringify(
          payload
        )}`
      );
      resolve(true);
    } catch (err: ErrorAnyType) {
      graphLogger.error(
        `Error Publishing to the UnLike Subscribers, Due To :${JSON.stringify(
          err.message
        )}`
      );
      resolve(false);
    }
  });
}

export default publishToUnlikeSubscribers;
