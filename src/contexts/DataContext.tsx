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
  reloadNodes: () => void;
};

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export const useData = () => useContext(DataContext);

export const DataContextProvider = ({ children }: DataProviderProps) => {
  const [selectedNode, setSelectedNode] = useState<string>("");
  const [nodes, setNodes] = useState<Node[]>([]);

  const loadNodesFromDirectory = (
    directory: DirectoryStructure,
    pathPrefix: string
  ): Node[] => {
    const tempNodes: Node[] = [];
    tempNodes.push(
      ...directory.files.map(
        (fileName): Node => ({
          label: fileName,
          path: pathPrefix + fileName,
          subnodes: [],
          type: "file",
        })
      )
    );
    directory.subfolders.map((subfolder) =>
      tempNodes.push({
        label: subfolder.name,
        path: pathPrefix + subfolder.name,
        subnodes: loadNodesFromDirectory(
          subfolder,
          pathPrefix + subfolder.name + "/"
        ),
        type: "folder",
      })
    );
    return tempNodes;
  };

  const reloadNodes = () => {
    const tempNodes = loadNodesFromDirectory(loadRootDirectory(), "");
    console.log(tempNodes);

    setNodes(tempNodes);
  }

  useEffect(() => {
    reloadNodes()
  }, []);

  const passedValue = useMemo(
    () => ({
      selectedNode: selectedNode,
      setSelectedNode: setSelectedNode,
      nodes: nodes,
      setNodes: setNodes,
      reloadNodes: reloadNodes
    }),
    [nodes, selectedNode]
  );
  return (
    <DataContext.Provider value={passedValue}>{children}</DataContext.Provider>
  );
};

export default DataContext;
