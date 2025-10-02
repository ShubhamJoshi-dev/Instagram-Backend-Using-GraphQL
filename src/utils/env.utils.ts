import dotenv from "dotenv";
dotenv.config();

export const getEnvValue = (key: string) => {
  return Object.prototype.hasOwnProperty.call(process.env, key)
    ? process.env[key]
    : undefined;
};
