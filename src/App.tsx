import React from "react";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import FileEditor from "./components/organisms/FileEditor/FileEditor";
import FileNavigation from "./components/organisms/FileNavigation/FileNavigation";
import { DataContextProvider } from "./contexts/DataContext";
import { SnackbarContextProvider } from "./contexts/SnackbarContext";

function App() {
  const myTheme = createTheme({});
  return (
    <ThemeProvider theme={myTheme}>
      <DataContextProvider>
        <SnackbarContextProvider>
          <div style={{ display: "flex", padding: 10 }}>
            <div style={{ maxWidth: "50%", flexGrow: 1, display: "flex", flexFlow: "column"}}>
              <FileNavigation />
            </div>
            <div style={{ maxWidth: "50%", marginTop: 6 }}>
              <FileEditor />
            </div>
          </div>
        </SnackbarContextProvider>
      </DataContextProvider>
    </ThemeProvider>
  );
}

export default App;
