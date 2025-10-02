import fsPromise from "fs/promises";
import fs from "fs";

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
}

const getFileInstance = (): FileHelper => {
  return new FileHelper();
};

export default getFileInstance;
