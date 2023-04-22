/*import React from "react";
import MUIRichTextEditor, {TMUIRichTextEditorStyles} from "mui-rte";
import { Theme, ThemeProvider, createTheme } from "@mui/material/styles";

export default function FileEditor() {
    const defaultTheme: Theme = createTheme({
        palette: {
            primary: {
                main: "#000000"
            }
        }
    })
    
    const muiRteTheme: TMUIRichTextEditorStyles = {
        overrides: {
            MUIRichTextEditor: {
                root: {
                    backgroundColor: "#ebebeb",
                },
                container: {
                    display: "flex",
                    flexDirection: "column-reverse"
                },
                editor: {
                    backgroundColor: "#ebebeb",
                    padding: "20px",
                    height: "200px",
                    maxHeight: "200px",
                    overflow: "auto"
                },
                toolbar: {
                    borderTop: "1px solid gray",
                    backgroundColor: "#ebebeb"
                },
                placeHolder: {
                    backgroundColor: "#ebebeb",
                    paddingLeft: 20,
                    width: "inherit",
                },
                anchorLink: {
                    color: "#333333",
                    textDecoration: "underline"
                }
            }
        }
    }
    
    Object.assign(defaultTheme, muiRteTheme)
  return (
    <ThemeProvider
      theme={defaultTheme}
    >
      <MUIRichTextEditor label="Start typing..." />
    </ThemeProvider>
  );
}
*/
import React, { useEffect, useState } from "react";
import MUIRichTextEditor from "mui-rte";
import { useData } from "../../../contexts/DataContext";
import { readFromFile, saveToFile } from "../../../utils/FileHandler";
import { useSnackbar } from "../../../contexts/SnackbarContext";

export default function FileEditor() {
  const { selectedNode, findNode } = useData();
  const { displaySnackbarMessage } = useSnackbar();
  const [defaultValue, setDefaultValue] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    if (selectedNode === "") return;
    const tempNode = findNode(selectedNode);
    if (tempNode.type === "file") {
      setDefaultValue(readFromFile(selectedNode));
    }
  }, [selectedNode]);

  return (
    <MUIRichTextEditor
      label="Type something here..."
      defaultValue={defaultValue}
      onSave={(data: string) => {
        try {
          saveToFile(selectedNode, data);
        } catch (error) {
         displaySnackbarMessage("Unexpected error, couldn't save file", "error") 
        }
        displaySnackbarMessage("Saved file", "success");
      }}
      inlineToolbar={true}
    />
  );
}
