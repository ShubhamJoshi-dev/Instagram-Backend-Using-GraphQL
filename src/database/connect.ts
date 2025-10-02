import graphLogger from "../libs/logger.libs";
import mongoose from "mongoose";
import getFileInstance from "../helpers/file.helper";
import path from "path";
import { getEnvValue } from "../utils/env.utils";

const statusJsonPath = path.join(process.cwd(), "Status.json");
const fileInstance = getFileInstance();

async function connectMongoose() {
  let retryCount = 3;
  let retryStatus = true;

  while (retryCount > 0 && retryStatus) {
    try {
      if (getEnvValue("MONGO_URL")) {
        const connection = await mongoose.connect(
          getEnvValue("MONGO_URL") as string
        );
        const connectionName = connection.connection.name;
        if (connectionName) {
          const payload = {
            mongoDB: "connected",
          };
          await fileInstance.writeToFile(payload, statusJsonPath);
        }
        return;
      }
    } catch (err: any) {
      graphLogger.error(
        `Error Connecting to the MongoDB, Due To : ${JSON.stringify(
          err.message
        )}`
      );

      const isMaximumRetry = retryCount.toString().startsWith("0");
      if (isMaximumRetry) {
        const errorMesssage = `Maximum Retry Exceeded, Cannot Connect to the Database`;
        graphLogger.error(errorMesssage);
        throw new Error(errorMesssage);
      }
      retryCount = retryCount - 1;
      continue;
    }
  }
}

export { connectMongoose };
