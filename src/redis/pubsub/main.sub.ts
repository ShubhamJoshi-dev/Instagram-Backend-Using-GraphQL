import getRedisInstance from "../redis.connect";
import likeSubscriber from "./sub/like.subscriber";

const subscribers = {
  like: likeSubscriber,
};

async function startAllSubscriber() {
  const redisInstance = getRedisInstance();
  const redisClient = await redisInstance.getRedisClient();
  for (const [key, value] of Object.entries(subscribers)) {
    const isFunctionSubs = typeof value === "function";
    if (isFunctionSubs) {
      await value(redisClient);
    }
  }
}

export default startAllSubscriber;
