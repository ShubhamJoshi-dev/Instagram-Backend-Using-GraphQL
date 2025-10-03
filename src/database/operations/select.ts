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
}

const getSelectInstance = (): SelectQuery => {
  return new SelectQuery();
};

export default getSelectInstance;
