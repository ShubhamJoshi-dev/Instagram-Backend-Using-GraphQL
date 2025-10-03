class SelectQuery {
  public async findOne<T>(key: string, value: T, model: any) {
    const result = await model.findOne({
      [`${key}`]: value,
    });
    return result;
  }

  public async findAll(model: any) {
    const result = await model.find({});
    return result;
  }

  public async findAllPopulate(
    model: any,
    toPopulate: Array<Record<string, any>>
  ) {
    const result = await model.find({}).populate(toPopulate);
    return result;
  }

  public async findOnePopulate<T>(
    key: string,
    value: T,
    model: any,
    toPopulate: Array<Record<string, any>>
  ) {
    const result = await model
      .findOne({
        [`${key}`]: value,
      })
      .populate(toPopulate);
    return result;
  }
}

const getSelectInstance = (): SelectQuery => {
  return new SelectQuery();
};

export default getSelectInstance;
