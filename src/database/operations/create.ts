class CreateQuery {
  public async createPayload(payload: Record<string, any>, model: any) {
    const createResult = await model.create({ ...payload });
    return createResult;
  }
}

const getCreateInstance = (): CreateQuery => {
  return new CreateQuery();
};

export default getCreateInstance;
