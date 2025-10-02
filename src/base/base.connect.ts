import { connectMongoose } from "../database/connect";
import graphLogger from "../c/logger.libs";

async function baseConnector(): Promise<{ status: boolean }> {
  let allConnectedStatus = true;
  const connectPromise = await Promise.allSettled([connectMongoose()]);
  const filteredErrors = connectPromise.filter(
    (item: PromiseSettledResult<void>) => item.status !== "fulfilled"
  );
  const isError = Array.isArray(filteredErrors) && filteredErrors.length > 0;
  if (isError) {
    allConnectedStatus = false;
    for (const err of filteredErrors) {
      const errorReason = err.reason;
      const errorStatus = err.status;
      graphLogger.error(`Error in Connecting the External Service, 
                Reason : ${errorReason}
                Status: ${errorStatus}
        `);
    }
  }
  return {
    status: allConnectedStatus,
  };
}

export { baseConnector };
