import userModel from "../models/user.schema";

class UpdateQuery {
  public async updatePayload<T, K>(
    filterQuery: { key: T; value: K },
    updatePayload: Record<string, any>,
    model: any
  ) {
    const updateResult = await model.updateOne(
      { [`${filterQuery.key}`]: filterQuery.value },
      updatePayload
    );
    return updateResult;
  }

  public async updatePayloadByArray<T, K>(
    filterQuery: { key: T; value: K },
    commentId: string,
    model: any
  ) {
    const updatedResult = await model.updateOne(
      { [filterQuery.key as string]: filterQuery.value },
      {
        $push: {
          comments: commentId,
        },
      }
    );

    return updatedResult;
  }
}

const getUpdateInstance = (): UpdateQuery => {
  return new UpdateQuery();
};

export default getUpdateInstance;
