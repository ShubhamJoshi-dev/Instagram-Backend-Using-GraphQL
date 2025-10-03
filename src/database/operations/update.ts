class UpdateQuery {
  public async updatePayload<T, K>(
    filterQuery: { key: T; value: K },
    updatePayload: Record<string, any>,
    model: any
  ) {
    const updateResult = await model.updateOne(filterQuery, updatePayload);
    return updateResult;
  }
}

const getUpdateInstance = (): UpdateQuery => {
  return new UpdateQuery();
};

export default getUpdateInstance;
