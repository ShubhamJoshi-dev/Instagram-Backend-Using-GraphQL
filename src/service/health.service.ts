import { IHealth } from "../interface/graphql.interface";
import getFileInstance from "../helpers/file.helper";
import path from "path";

const statusJsonPath = path.join(process.cwd(), "Status.json");
const fileInstance = getFileInstance();

async function healthService(): Promise<IHealth> {
  const parseContent = await fileInstance.readFromFile(statusJsonPath);
  const { mongoDB } = parseContent;
  const healthPayload = {
    service: `The Apollo Server and Instagram Backend is Running`,
    mongo:
      typeof mongoDB === "string" && mongoDB.startsWith("con") ? true : false,
    usage: process.cpuUsage(),
  };
  return healthPayload;
}

export { healthService };
