import StatusCode from "http-status-codes";

class PayloadHelper {
  public createErrorPayload(
    errorMessage: string,
    errorStatusCode: number = StatusCode.BAD_REQUEST
  ) {
    return {
      error: {
        message: errorMessage,
        code: errorStatusCode,
      },
    };
  }
}

const getPayloadInstances = (): PayloadHelper => {
  return new PayloadHelper();
};

export default getPayloadInstances;
