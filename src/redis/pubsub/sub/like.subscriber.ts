import { RedisClientType } from "redis";
import graphLogger from "../../../libs/logger.libs";
import { ErrorAnyType } from "../../../types/types";
import { LIKE_SUBSCRIBER } from "../../../constant/redis.constant";
import getBaseQuery from "../../../database/operations/base";
import likeModel from "../../../database/models/like.schema";
import postModel from "../../../database/models/post.schema";

async function likeSubscriberHandler(message: string) {
  const { likeBy, postId } = JSON.parse(message);
  const baseInstance = getBaseQuery();
  const createInstance = await baseInstance.getCreate();
  const updateInstance = await baseInstance.getUpdate();

  const createLikePayload = Object.preventExtensions({
    likeBy: likeBy,
    postId: postId,
  });

  const saveLikeDocument = await createInstance.createPayload(
    createLikePayload,
    likeModel
  );

  const likeId = await baseInstance.convertToMongooseId(
    saveLikeDocument._doc._id
  );

  const filterQuery = {
    key: "_id",
    value: postId,
  };
  await updateInstance.updateLikePayloadByArray(filterQuery, likeId, postModel);
}

async function likeSubscriber(redisClient: RedisClientType) {
  try {
    const likeSubscriber = redisClient.duplicate();

    await likeSubscriber.connect();

    graphLogger.info(`Like Subscriber is Up to Subscribe to the Message`);

    await likeSubscriber.subscribe(LIKE_SUBSCRIBER, async (message) => {
      if (message) {
        graphLogger.info(
          `Message Received in the Like Subscriber : ${message}`
        );
        try {
          await likeSubscriberHandler(message);
          graphLogger.info(`Like Subscribers Process Has been Completed`);
        } catch (err: ErrorAnyType) {
          const errroMessage = `Like Subscriber Handler Encountered an Error, Due To : ${JSON.stringify(
            err.message
          )}`;
          graphLogger.error(errroMessage);
          throw new Error(errroMessage);
        }
      }
    });
  } catch (err: ErrorAnyType) {
    graphLogger.error(`Error Starting the Subscriber For the Like System`);
    throw new Error(err.message);
  }
}

export default likeSubscriber;
