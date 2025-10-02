import { healthService } from "../service/health.service";

async function healthResolver() {
  return healthService();
}

export { healthResolver };
