import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import Node from "../models/Node/Node";
import { loadRootDirectory } from "../utils/FileHandler";

type DataProviderProps = {
  children: React.ReactNode;
};

export type DataContextProps = {
  selectedNode: string,
  nodes: Node[],
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  setSelectedNode: React.Dispatch<React.SetStateAction<string>>
};

const DataContext = createContext<DataContextProps>({} as DataContextProps);

export const useData = () => useContext(DataContext);

export const DataContextProvider = ({ children }: DataProviderProps) => {
  const [selectedNode, setSelectedNode] = useState("");
  const [nodes, setNodes] = useState<Node[]>([{label: "Root", path: "", subnodes: []}])

  const passedValue = useMemo(() => ({
    selectedNode: selectedNode,
    setSelectedNode: setSelectedNode,
    nodes: nodes,
    setNodes: setNodes,
  }), [selectedNode]);

  useEffect(() => {
    console.log(loadRootDirectory());
    
  }, [])
  

  return (
    <DataContext.Provider
      value={passedValue}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
