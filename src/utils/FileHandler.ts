import fs from "fs";
import path from "path";
import DirectoryStructure from "../models/Directory/DirectoryStructure";

export const ROOT_DIRECTORY = process.env.REACT_APP_ROOT_DIRECTORY || "";

const readDirectoryRecursive = (directory: string): DirectoryStructure => {  
  const files: string[] = [];
  const subfolders: DirectoryStructure[] = [];

  const items = fs.readdirSync(directory);

  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      const dir = readDirectoryRecursive(itemPath);
      const subfolder = {
        name: item,
        files: dir.files,
        subfolders: dir.subfolders,
      };
      subfolders.push(subfolder);
    } else {
      files.push(item);
    }
  }

  return { name: "", files, subfolders };
};

export const loadRootDirectory = () => readDirectoryRecursive(ROOT_DIRECTORY);

export const deleteData = (path: string) => {
  fs.rmSync(ROOT_DIRECTORY + path, { recursive: true, force: true });
};

export const createFolder = (name: string, nodeParentPath: string) => {
  const parentPath =
    nodeParentPath === "" ? nodeParentPath : nodeParentPath + "/";
  const path = ROOT_DIRECTORY + parentPath + name;
  fs.mkdir(path, { recursive: true }, (err) => {});
};

export const readFromFile = (path: string): string => {  
  return fs.readFileSync(ROOT_DIRECTORY + path, 'utf8');
}

export const saveToFile = (path: string, data: string) => {  
  fs.writeFileSync(ROOT_DIRECTORY + path, data);
}

export const createFile = (name: string, nodeParentPath: string) => {
  const parentPath =
    nodeParentPath === "" ? nodeParentPath : nodeParentPath + "/";
  const path = ROOT_DIRECTORY + parentPath + name;
  fs.closeSync(fs.openSync(path, "w"));
};
