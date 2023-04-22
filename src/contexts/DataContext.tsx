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
  filteredNodes: Node[];
  setFilteredNodes: React.Dispatch<React.SetStateAction<Node[]>>; 
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setSelectedNode: React.Dispatch<React.SetStateAction<string>>;
  reloadNodes: () => void;
  findNode: (nodeId: string) => Node
};

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export const useData = () => useContext(DataContext);

export const DataContextProvider = ({ children }: DataProviderProps) => {
  const [selectedNode, setSelectedNode] = useState<string>("");
  const [nodes, setNodes] = useState<Node[]>([]);
  const [filteredNodes, setFilteredNodes] = useState(nodes);

  const searchThroughNodes = (nodes: Node[], predicate: (nodeId: string) => boolean): Node => {
    const subnodes: Node[] = []
    const foundNode = nodes.find((node) => {
      if (predicate(node.path)) {
        return true
      }
      subnodes.push(...node.subnodes)
      return false
    })
    if (foundNode) {
      return foundNode
    }
    return searchThroughNodes(subnodes, predicate)
  }

  const findNode = (nodeId: string): Node => {
    return searchThroughNodes(nodes, (passedValue) => passedValue === nodeId)
  }

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
    directory.subfolders.forEach((subfolder) =>
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
    setNodes(tempNodes);
  }

  useEffect(() => {
    setFilteredNodes(nodes)
  }, [nodes])
  

  useEffect(() => {
    reloadNodes()
  }, []);

  const passedValue = useMemo(
    () => ({
      selectedNode: selectedNode,
      setSelectedNode: setSelectedNode,
      nodes: nodes,
      setNodes: setNodes,
      filteredNodes: filteredNodes,
      setFilteredNodes: setFilteredNodes,
      reloadNodes: reloadNodes,
      findNode: findNode
    }),
    [nodes, selectedNode, filteredNodes]
  );
  return (
    <DataContext.Provider value={passedValue}>{children}</DataContext.Provider>
  );
};

export default DataContext;
