import postModel from "../database/models/post.schema";
import getBaseQuery from "../database/operations/base";
import StatusCode from "http-status-codes";
import getPayloadInstances from "../helpers/payload.helper";
import { IDecodedPayload } from "../interface/auth.interface";
import publishToLikeSubscriber from "../redis/pubsub/pub/like.publisher";
import getRedisInstance from "../redis/redis.connect";
import graphLogger from "../libs/logger.libs";
import { includeKeyIntoObjects } from "../utils/common.utils";

async function likeService(payload: any, decodedPayload: IDecodedPayload) {
  const { postId } = payload;
  const { userId } = decodedPayload;
  const baseInstance = getBaseQuery();
  const payloadInstance = getPayloadInstances();
  const redisInstance = getRedisInstance();
  const redisClient = await redisInstance.getRedisClient();

  const selectInstance = await baseInstance.getSelect();

  const updateInstance = await baseInstance.getUpdate();

  const postDocument = await selectInstance.findOne("_id", postId, postModel);

  const isEmptyPost = typeof postDocument === "object" && !postDocument;

  if (isEmptyPost) {
    const errorMessage = `The Post Does not Exists on the System`;
    const errorStatusCode = StatusCode.BAD_REQUEST;
    return payloadInstance.createErrorPayload(errorMessage, errorStatusCode);
  }

  const postDocsId = await baseInstance.convertToMongooseId(
    postDocument._doc._id
  );

  const likePayload = Object.preventExtensions({
    likeBy: userId,
    postId: postDocsId,
  });

  const publishStatus = await publishToLikeSubscriber(likePayload, redisClient);

  const isSubscriberFailed =
    typeof publishStatus === "boolean" && !publishStatus;

  if (isSubscriberFailed) {
    const errorMessage = `The Message cannot be publish to the Like Subscriber`;
    graphLogger.info(errorMessage);
  }
  return {
    post: includeKeyIntoObjects(postDocument._doc, "title", "description"),
  };
}

async function unlikeService(payload: any, decodedPayload: IDecodedPayload) {}

export { likeService, unlikeService };
