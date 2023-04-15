import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Node from "../models/Node/Node";
import { loadRootDirectory } from "../utils/FileHandler";
import DirectoryStructure from "../models/Directory/DirectoryStructure";

type DataProviderProps = {
  children: React.ReactNode;
};

export type DataContextProps = {
  selectedNode: string;
  nodes: Node[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setSelectedNode: React.Dispatch<React.SetStateAction<string>>;
};

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export const useData = () => useContext(DataContext);

export const DataContextProvider = ({ children }: DataProviderProps) => {
  const [selectedNode, setSelectedNode] = useState("");
  const [nodes, setNodes] = useState<Node[]>([]);

  const passedValue = useMemo(
    () => ({
      selectedNode: selectedNode,
      setSelectedNode: setSelectedNode,
      nodes: nodes,
      setNodes: setNodes,
    }),
    [nodes, selectedNode]
  );

  const loadNodesFromDirectory = (
    directory: DirectoryStructure,
    pathPrefix: string
  ): Node[] => {
    const tempNodes: Node[] = [];
    tempNodes.push(
      ...directory.files.map((fileName) => {
        return { label: fileName, path: pathPrefix + fileName, subnodes: [] };
      })
    );
    directory.subfolders.map((subfolder) =>
      tempNodes.push({
        label: subfolder.name,
        path: pathPrefix + subfolder.name,
        subnodes: loadNodesFromDirectory(
          subfolder,
          pathPrefix + subfolder.name + "/"
        ),
      })
    );
    return tempNodes;
  };

  useEffect(() => {
    const tempNodes = loadNodesFromDirectory(loadRootDirectory(), "");
    console.log(tempNodes);

    setNodes(tempNodes);
  }, []);

  return (
    <DataContext.Provider value={passedValue}>{children}</DataContext.Provider>
  );
};

export default DataContext;
