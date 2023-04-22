import React from "react";
import "./MuiSnackbar.css";

import {
  Snackbar,
  AlertColor,
  IconButton,
  SnackbarContent,
  SvgIconTypeMap,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { CheckCircle, Close, Error, Info, Warning } from "@mui/icons-material";

type VariantIconType = {
  success: OverridableComponent<SvgIconTypeMap>;
  warning: OverridableComponent<SvgIconTypeMap>;
  error: OverridableComponent<SvgIconTypeMap>;
  info: OverridableComponent<SvgIconTypeMap>;
};

/**
 * variantIcon defines what icon will be shown depending on the snackbar-variant.
 */
const variantIcon: VariantIconType = {
  success: CheckCircle,
  warning: Warning,
  error: Error,
  info: Info,
};

/**
 * SnackBarProps defines all properties that are accepted by
 * the Snackbar component.
 */
export interface SnackbarProps {
  message: string;
  variant: AlertColor;
  open: boolean;
  close: () => void;
}

/**
 * Snackbar displays a Material-UI Snackbar.
 * @param message that is displayed inside the snackbar
 * @param variant (one of SnackbarVariant type)
 * @param open state of the snackbar
 * @param close function to hide the snackbar
 */
const MuiSnackbar = ({ message, variant, open, close }: SnackbarProps) => {
  const Icon = variantIcon[variant];

  /**
   * renderSnackbarMessage renders the message of the snackbar
   */
  const renderSnackbarMessage = () => {
    return (
      <span id="snackbar">
        <Icon className={"icon iconVariant iconError"} />
        {message}
      </span>
    );
  };

  /**
   * renderSnackbarAction renders the actions of the snackbar
   */
  const renderSnackbarAction = () => {
    return (
      <IconButton
        className={"closeButton"}
        key="close"
        aria-label="close"
        color="inherit"
        onClick={close}
      >
        <Close className={"icon"} />
      </IconButton>
    );
  };

  /**
   * renderSnackbarContent renders the content of the snackbar
   */
  const renderSnackbarContent = () => {
    return (
      <SnackbarContent
        className={variant + " snackbar-container message"}
        message={renderSnackbarMessage()}
        action={[renderSnackbarAction()]}
      />
    );
  };

  return (
    <div>
      <Snackbar
        autoHideDuration={5000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={open}
        onClose={close}
      >
        {renderSnackbarContent()}
      </Snackbar>
    </div>
  );
};

export default MuiSnackbar;
