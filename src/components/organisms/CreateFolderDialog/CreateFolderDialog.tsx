import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { useData } from "../../../contexts/DataContext";
import { createFolder } from "../../../utils/FileHandler";
import { useSnackbar } from "../../../contexts/SnackbarContext";

interface PropsType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateFolderDialog({ open, setOpen }: PropsType) {
  const { selectedNode, reloadNodes, findNode } = useData();
  const { displaySnackbarMessage } = useSnackbar();
  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <div style={{ minWidth: "100%" }}>
        <Formik
          initialValues={{ name: "" }}
          onSubmit={(values) => {
            try {
              if (findNode(selectedNode).type === "folder") {
                createFolder(values.name, selectedNode);
              } else {
                const indexOfSlash = selectedNode.lastIndexOf("/");
                const parentFolder = selectedNode.substring(
                  0,
                  indexOfSlash === -1 ? 0 : indexOfSlash
                );
                createFolder(values.name, parentFolder);
              }
              displaySnackbarMessage("Created folder", "success")
            } catch (error) {
              displaySnackbarMessage(
                "Can't create folder, make sure the name is valid/not taken",
                "error"
              );
            }
            reloadNodes();
            setOpen(false);
          }}
        >
          {({ handleChange }) => (
            <Form style={{ minWidth: "100%" }}>
              <DialogTitle>Create Folder</DialogTitle>
              <DialogContent sx={{ minWidth: "60%" }}>
                <TextField
                  label="Name"
                  fullWidth
                  sx={{ marginTop: 1 }}
                  onChange={handleChange}
                  name="name"
                />
              </DialogContent>
              <DialogActions>
                <Button color="error" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit</Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </div>
    </Dialog>
  );
}
