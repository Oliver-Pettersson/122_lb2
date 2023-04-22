import { AlertColor } from "@mui/material";
import React, { createContext, useContext, useState } from "react";
import MuiSnackbar from "../components/atoms/MuiSnackbar/MuiSnackbar";

/**
 * SnackbarContextType defines the provided values
 */
type SnackbarContextType = {
  open: boolean;
  message: string;
  severity: AlertColor;
  close: () => void;
  displaySnackbarMessage: (message: string, severity?: AlertColor) => void;
  setSuccessMessage: (message: string) => void;
  setErrorMessage: (message: string) => void;
};

/**
 * defaultSnackbarContext constant holds the default values for the
 * SnackbarContext.
 */
const defaultSnackBarContext: SnackbarContextType = {
  open: false,
  message: "",
  severity: "info",
  close: () => {},
  displaySnackbarMessage: () => {},
  setSuccessMessage: () => {},
  setErrorMessage: () => {},
};

/**
 * SnackbarContext holds and provides values and modifiers for
 * the data which is used to display a snackbar.
 */
const SnackbarContext = createContext<SnackbarContextType>(
  defaultSnackBarContext
);
export default SnackbarContext;

/**
 * SnackbarContextProviderProps define the accepted props for
 * the SnackBarContextProvider.
 */
type SnackbarContextProviderProps = {
  children: React.ReactNode;
};

export const useSnackbar = () => useContext(SnackbarContext);


/**
 * SnackbarContextProvider provides values of the currently displayed snackbar, and a methods to set these values.
 * @param children consists of all the elements that are located inside the
 */
export const SnackbarContextProvider = ({
  children,
}: SnackbarContextProviderProps) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [variant, setVariant] = useState<AlertColor>("info");

  /**
   * Close the snackbar.
   */
  const close = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  /**
   * Display a snackbar with the given message and snackbar-variant
   * @param messageToShow
   * @param variantToShow
   */
  const displaySnackbarMessage = (
    messageToShow: string,
    variantToShow: AlertColor = "info"
  ) => {
    setMessage(messageToShow);
    setVariant(variantToShow);
    setOpen(true);
  };

  return (
    <SnackbarContext.Provider
      value={{
        severity: variant,
        open,
        message,
        close,
        displaySnackbarMessage,
        setErrorMessage: (messageToShow) =>
          displaySnackbarMessage(messageToShow, "error"),
        setSuccessMessage: (messageToShow) =>
          displaySnackbarMessage(messageToShow, "success"),
      }}
    >
      <MuiSnackbar
        message={message}
        variant={variant}
        open={open}
        close={close}
      />
      {children}
    </SnackbarContext.Provider>
  );
};
