import fsPromise from "fs/promises";
import fs from "fs";
import graphLogger from "../libs/logger.libs";

class FileOperation {
  public async unLinkFiles(filePath: string) {
    return await fsPromise.unlink(filePath);
  }

  public checkFileExists(filePath: string) {
    return fs.existsSync(filePath);
  }
}

class FileHelper extends FileOperation {
  constructor() {
    super();
  }

  public async writeToFile(payload: Record<string, any>, filePath: string) {
    if (this.checkFileExists(filePath)) {
      await this.unLinkFiles(filePath);
    }

    const deepCopyPayload = JSON.parse(JSON.stringify(payload));
    await fsPromise.writeFile(filePath, JSON.stringify(deepCopyPayload), {
      encoding: "utf-8",
    });
    return;
  }

  public async readFromFile(filePath: string) {
    const content = await fsPromise.readFile(filePath, { encoding: "utf-8" });
    return JSON.parse(content);
  }
}

const getFileInstance = (): FileHelper => {
  return new FileHelper();
};

export default getFileInstance;
