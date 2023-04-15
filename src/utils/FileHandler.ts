import fs from 'fs'
import path from 'path';
import Node from '../models/Node/Node'
import DirectoryStructure from '../models/Directory/DirectoryStructure';

export const ROOT_DIRECTORY = "C:/Users/pette_j7ckdwu/OneDrive/Desktop/TBZ_Module/Modul_122/LB2/data"

const readDirectoryRecursive = (directory: string): DirectoryStructure => {
  const files: string[] = [];
  const subfolders: DirectoryStructure[] = [];

  const items = fs.readdirSync(directory);

  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stat = fs.statSync(itemPath);

    if (stat.isDirectory()) {
      const subfolder = {
        name: item,
        files: [],
        subfolders: readDirectoryRecursive(itemPath).subfolders,
      };
      subfolders.push(subfolder);
    } else {
      files.push(item);
    }
  }

  return { name: "", files, subfolders };
}

export const loadRootDirectory = () => readDirectoryRecursive(ROOT_DIRECTORY);

const createFolder = (name: string, parentNode: Node) => {
    fs.mkdir(ROOT_DIRECTORY + parentNode.path + "/" + name, {recursive: true}, (err) => console.error(err))
}