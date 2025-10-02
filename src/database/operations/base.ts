import getCreateInstance from "./create";
import getSelectInstance from "./select";

class BaseQuery {
  public async getSelect() {
    const selectInstances = getSelectInstance();
    return selectInstances;
  }

  public async getCreate() {
    const createInstance = getCreateInstance();
    return createInstance;
  }
}

const getBaseQuery = (): BaseQuery => {
  return new BaseQuery();
};

export default getBaseQuery;
