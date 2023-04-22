import { Box } from "@mui/material";
import React, { useState } from "react";
import FileTreeMenuButton from "../../atoms/FileTreeMenuButton/FileTreeMenuButton";
import { useData } from "../../../contexts/DataContext";
import CreateFolderDialog from "../../organisms/CreateFolderDialog/CreateFolderDialog";
import DeleteConfirmationDialog from "../../organisms/DeleteConfirmationDialog/DeleteConfirmationDialog";
import CreateFileDialog from "../../organisms/CreateFileDialog/CreateFileDialog";
import Searchbar from "../../atoms/Searchbar/Searchbar";

export default function FileTreeMenu() {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
    const [openCreateFileDialog, setOpenCreateFileDialog] = useState(false)
    const [openCreateFolderDialog, setOpenCreateFolderDialog] = useState(false)
  return (
    <>
    <Box
      sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}
    >
      <FileTreeMenuButton onClick={() => setOpenCreateFileDialog(true)}>Create File</FileTreeMenuButton>
      <FileTreeMenuButton onClick={() => setOpenCreateFolderDialog(true)}>Create Folder</FileTreeMenuButton>
      <FileTreeMenuButton color="error" onClick={() => setOpenDeleteDialog(true)}>Delete</FileTreeMenuButton>
    </Box>
    <Box sx={{marginBottom: 1}}>
    <Searchbar />
    </Box>
    <DeleteConfirmationDialog open={openDeleteDialog} setOpen={setOpenDeleteDialog} />
    <CreateFileDialog open={openCreateFileDialog} setOpen={setOpenCreateFileDialog} />
    <CreateFolderDialog open={openCreateFolderDialog} setOpen={setOpenCreateFolderDialog} />
    </>
  );
}
