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

  public async comparePassword(oldPassword: string, encryptedPassword: string) {
    const compareStatus = await bcrypt.compare(oldPassword, encryptedPassword);
    return compareStatus;
  }
}

const getBcryptInstances = (): BcryptHelper => {
  return new BcryptHelper();
};

export default getBcryptInstances;
