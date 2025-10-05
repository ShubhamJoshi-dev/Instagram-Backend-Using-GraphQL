import { RedisClientType } from "redis";
import { ErrorAnyType } from "../../../types/types";
import { LIKE_SUBSCRIBER } from "../../../constant/redis.constant";
import graphLogger from "../../../libs/logger.libs";

async function publishToLikeSubscriber(
  payload: Record<string, any>,
  redisClient: RedisClientType
) {
  return new Promise(async (resolve, reject) => {
    try {
      const bufferPayload = JSON.stringify(payload);
      await redisClient.publish(LIKE_SUBSCRIBER, bufferPayload);
      graphLogger.info(
        `Message Published to the ${LIKE_SUBSCRIBER} with Payload : ${JSON.stringify(
          payload
        )}`
      );
      resolve(true);
    } catch (err: ErrorAnyType) {
      graphLogger.error(
        `Error Publishing to the Like Subscribers, Due To :${JSON.stringify(
          err.message
        )}`
      );
      resolve(false);
    }
  });
}

export default publishToLikeSubscriber;
