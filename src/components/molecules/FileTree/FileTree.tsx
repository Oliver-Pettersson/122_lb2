import React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useData } from "../../../contexts/DataContext";
import Node from "../../../models/Node/Node";
import FolderIcon from "@mui/icons-material/Folder";
import DescriptionIcon from "@mui/icons-material/Description";

export default function FileTree() {
  const { setSelectedNode, filteredNodes, selectedNode } = useData();
  
  const loadSubnodes = (node: Node) =>
    node.subnodes.map((subnode) => (
      <TreeItem
        icon={subnode.type === "folder" ? <FolderIcon /> : <DescriptionIcon />}
        key={subnode.path}
        nodeId={subnode.path}
        label={subnode.label}
      >
        {loadSubnodes(subnode)}
      </TreeItem>
    ));

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      selected={selectedNode || ""}
      onNodeSelect={(event: any, nodeId: string) =>
        selectedNode === nodeId ? setSelectedNode("") : setSelectedNode(nodeId)
      }
      sx={{
        flexGrow: 1,
        backgroundColor: "#EEEEEE",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {filteredNodes.map((node) => (
        <TreeItem
          icon={node.type === "folder" ? <FolderIcon /> : <DescriptionIcon />}
          key={node.path}
          nodeId={node.path}
          label={node.label}
        >
          {loadSubnodes(node)}
        </TreeItem>
      ))}
    </TreeView>
  );
}
