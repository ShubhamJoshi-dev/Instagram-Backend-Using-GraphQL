import bcrypt from "bcrypt";

class BcryptHelper {
  public async generateSalt() {
    return await bcrypt.genSalt(10);
  }

  public async encryptPassword(value: string) {
    const salt = await this.generateSalt();
    const encryptedValue = await bcrypt.hash(value, salt);
    return encryptedValue;
  }
}

const getBcryptInstances = (): BcryptHelper => {
  return new BcryptHelper();
};

export default getBcryptInstances;
