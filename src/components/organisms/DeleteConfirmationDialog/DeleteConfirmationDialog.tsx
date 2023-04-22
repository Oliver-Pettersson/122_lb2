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
import { deleteData } from "../../../utils/FileHandler";
import { useSnackbar } from "../../../contexts/SnackbarContext";

interface PropsType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DeleteConfirmationDialog({ open, setOpen }: PropsType) {
  const { selectedNode, reloadNodes } = useData();
  const {displaySnackbarMessage} = useSnackbar()
  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>
        Are you sure you want to delete the node: {selectedNode}
      </DialogTitle>
      <DialogActions>
        <Button color="secondary" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          color="error"
          onClick={() => {
            deleteData(selectedNode);
            reloadNodes()
            displaySnackbarMessage("Deleted node", "success")
            setOpen(false)
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
