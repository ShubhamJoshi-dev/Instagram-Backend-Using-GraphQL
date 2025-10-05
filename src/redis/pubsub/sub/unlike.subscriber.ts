import { RedisClientType } from "redis";
import graphLogger from "../../../libs/logger.libs";
import { ErrorAnyType } from "../../../types/types";
import { UNLIKE_SUBSCRIBER } from "../../../constant/redis.constant";
import getBaseQuery from "../../../database/operations/base";
import unlikeModel from "../../../database/models/unlike.schema";
import postModel from "../../../database/models/post.schema";

async function unlikeSubsHandler(message: string) {
  const { unLikeBy, postId } = JSON.parse(message);
  const baseInstance = getBaseQuery();
  const createInstance = await baseInstance.getCreate();
  const updateInstance = await baseInstance.getUpdate();

  const createUnLikePayload = Object.preventExtensions({
    unlikeBy: unLikeBy,
    postId: postId,
  });

  const saveUnlikeDocuments = await createInstance.createPayload(
    createUnLikePayload,
    unlikeModel
  );

  const unlikeIds = await baseInstance.convertToMongooseId(
    saveUnlikeDocuments._doc._id
  );

  const filterQuery = {
    key: "_id",
    value: postId,
  };

  await updateInstance.updateUnLikePayloadArray(
    filterQuery,
    unlikeIds,
    postModel
  );
}

async function unlikeSubscribers(redisClient: RedisClientType) {
  try {
    const unlikeSubscribers = redisClient.duplicate();
    await unlikeSubscribers.connect();
    graphLogger.info(`UnLike Subscriber is Up to Subscribe to the Message`);
    await unlikeSubscribers.subscribe(UNLIKE_SUBSCRIBER, async (message) => {
      console.log(message);
      if (message) {
        graphLogger.info(
          `Message Received on the Unlike Subscribers : ${JSON.stringify(
            message
          )}`
        );
        try {
          await unlikeSubsHandler(message);
          graphLogger.info(
            `Unlike Subscribers Process Has been Completed At : ${new Date().toDateString()}`
          );
        } catch (err: ErrorAnyType) {
          const errorMessage = `Error in the Unlike Handlers, Due To : ${JSON.stringify(
            err.message
          )}`;
          graphLogger.info(errorMessage);
          throw new Error(errorMessage);
        }
      }
    });
  } catch (err: ErrorAnyType) {
    const errorMessage = `Error in the Unlike Subscribers, Due To : ${JSON.stringify(
      err.message
    )}`;
    graphLogger.error(errorMessage);
    throw new Error(errorMessage);
  }
}

export default unlikeSubscribers;
