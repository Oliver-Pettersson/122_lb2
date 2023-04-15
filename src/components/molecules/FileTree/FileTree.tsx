import React from "react";
import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TreeItem from "@mui/lab/TreeItem";
import { useData } from "../../../contexts/DataContext";
import Node from "../../../models/Node/Node";

export default function FileTree() {
  const { setSelectedNode, nodes } = useData();

  const loadSubnodes = (node: Node) =>
    node.subnodes.map((subnode) => (
      <TreeItem key={subnode.path} nodeId={subnode.path} label={subnode.label}>
        {loadSubnodes(subnode)}
      </TreeItem>
    ));

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      onNodeSelect={(event: any, nodeId: string) => setSelectedNode(nodeId)}
      sx={{
        height: 240,
        flexGrow: 1,
        maxWidth: "50%",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {nodes.map((node) => (
        <TreeItem key={node.path} nodeId={node.path} label={node.label}>
          {loadSubnodes(node)}
        </TreeItem>
      ))}
    </TreeView>
  );
}
