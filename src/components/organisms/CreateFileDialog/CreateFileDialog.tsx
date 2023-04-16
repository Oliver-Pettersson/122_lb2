import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import { createFile } from "../../../utils/FileHandler";
import { useData } from "../../../contexts/DataContext";

interface PropsType {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CreateFileDialog({ open, setOpen }: PropsType) {
  const {selectedNode, reloadNodes} = useData()
  return (
    <Dialog open={open} fullWidth maxWidth="sm">
        <div style={{minWidth: "100%"}}>
      <Formik
        initialValues={{ name: ""}}
        onSubmit={(values) => {
          console.log(values);
            createFile(values.name, selectedNode)
            reloadNodes()
            setOpen(false)
        }}
      >
        {({ handleChange }) => (
          <Form style={{minWidth: "100%"}}>
            <DialogTitle>Create File</DialogTitle>
            <DialogContent sx={{minWidth: "60%"}}>
              <TextField label="Name" fullWidth onChange={handleChange} name="name"/>
            </DialogContent>
            <DialogActions>
              <Button color="error" onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
      </div>
    </Dialog>
  );
}
