import mongoose from "mongoose";
import getCreateInstance from "./create";
import getSelectInstance from "./select";
import getUpdateInstance from "./update";

class BaseConverter {
  public async convertToMongooseId(id: Buffer) {
    return new mongoose.Types.ObjectId(id);
  }
}

class BaseQuery extends BaseConverter {
  constructor() {
    super();
  }
  public async getSelect() {
    const selectInstances = getSelectInstance();
    return selectInstances;
  }

  public async getCreate() {
    const createInstance = getCreateInstance();
    return createInstance;
  }

  public async getUpdate() {
    const updateInstance = getUpdateInstance();
    return updateInstance;
  }
}

const getBaseQuery = (): BaseQuery => {
  return new BaseQuery();
};

export default getBaseQuery;
