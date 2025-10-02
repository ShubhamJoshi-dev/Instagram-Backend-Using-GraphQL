import jwt from "jsonwebtoken";
import { getEnvValue } from "../utils/env.utils";

class JWTHelper {
  public async createAccessToken(payload: Record<string, any>) {
    const options = {
      expiresIn: "1h",
      issuer: "random",
    } as jwt.SignOptions;

    const secretKey = getEnvValue("ACCESS_TOKEN") as string;
    const signKey = await jwt.sign(payload, secretKey, options);
    return signKey;
  }

  public async verifyAccessToken(token: string) {
    const secretKey = getEnvValue("ACCESS_TOKEN") as string;
    const decodedPayload = jwt.verify(token, secretKey);
    return decodedPayload;
  }

  public async createRefreshToken(payload: Record<string, any>) {
    const options = {
      expiresIn: "1d",
      issuer: "random",
    } as jwt.SignOptions;

    const secretKey = getEnvValue("ACCESS_TOKEN") as string;
    const signKey = await jwt.sign(payload, secretKey, options);
    return signKey;
  }
}

const getJWTInstance = (): JWTHelper => {
  return new JWTHelper();
};

export default getJWTInstance;
