import { IHealth } from "../interface/graphql.interface";

async function healthService(): Promise<IHealth> {
  const healthPayload = {
    service: `The Apollo Server and Instagram Backend is Running`,
    db: true,
    status: true,
  };
  return healthPayload;
}

export { healthService };
