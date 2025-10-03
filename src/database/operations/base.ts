import getCreateInstance from "./create";
import getSelectInstance from "./select";
import getUpdateInstance from "./update";

class BaseQuery {
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
