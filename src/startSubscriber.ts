import { connectMongoose } from "./database/connect";
import graphLogger from "./libs/logger.libs";
import startAllSubscriber from "./redis/pubsub/main.sub";

(async () => {
  graphLogger.info(`Starting all the Subscribers`);
  await connectMongoose();
  await startAllSubscriber();
})();
