export default interface DirectoryStructure {
    name: string,
    files: string[];
    subfolders: DirectoryStructure[];
}