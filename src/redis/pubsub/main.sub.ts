import getRedisInstance from "../redis.connect";
import likeSubscriber from "./sub/like.subscriber";
import unlikeSubscribers from "./sub/unlike.subscriber";

const subscribers = {
  like: likeSubscriber,
  unlike: unlikeSubscribers,
};

async function startAllSubscriber() {
  const redisInstance = getRedisInstance();
  const redisClient = await redisInstance.getRedisClient();
  await Promise.all([
    subscribers["like"](redisClient),
    subscribers["unlike"](redisClient),
  ]);
}

export default startAllSubscriber;
