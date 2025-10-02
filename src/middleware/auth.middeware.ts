import graphLogger from "../libs/logger.libs";
import getJWTInstance from "../helpers/jwt.helper";

async function serverMiddleware(token: string): Promise<{
  data: any;
  status: boolean;
}> {
  return new Promise(async (resolve, reject) => {
    try {
      const jwtInstance = getJWTInstance();
      const decodedJWTPayload = await jwtInstance.verifyAccessToken(token);
      const promisePayload = {
        data: decodedJWTPayload,
        status: true,
      };
      resolve(promisePayload);
    } catch (err: any) {
      graphLogger.error(
        `Error Starting the Server Middleware, Due To: ${JSON.stringify(
          err.message
        )}`
      );
      const promisePayload = {
        data: null,
        status: false,
      };
      resolve(promisePayload);
    }
  });
}

export default serverMiddleware;
