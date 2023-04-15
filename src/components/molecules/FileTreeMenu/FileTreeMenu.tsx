import { Box } from "@mui/material";
import React from "react";
import FileTreeMenuButton from "../../atoms/FileTreeMenuButton/FileTreeMenuButton";
import { useData } from "../../../contexts/DataContext";

export default function FileTreeMenu() {
    const {selectedNode} = useData()
  return (
    <Box
      sx={{ display: "flex", flexGrow: 1, maxWidth: "50%", justifyContent: "space-between" }}
    >
      <FileTreeMenuButton>Create Node</FileTreeMenuButton>
      <FileTreeMenuButton>Create Subnode</FileTreeMenuButton>
      <FileTreeMenuButton color="error">Delete</FileTreeMenuButton>
    </Box>
  );
}
