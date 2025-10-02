async function healthService() {
  const healthPayload = {
    service: `The Apollo Server and Instagram Backend is Running`,
    db: true,
    status: true,
  };
}

export { healthService };
