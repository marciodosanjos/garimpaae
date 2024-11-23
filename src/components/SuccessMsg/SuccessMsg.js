import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function SuccessMsg({ msg, isOpened, onClose }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return; // Evita fechar o Snackbar se o motivo for um clique fora.
    }
    onClose(); // Chama a função do componente pai.
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="#ffff"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={isOpened}
      autoHideDuration={6000}
      onClose={handleClose}
      message={msg}
      action={action}
    />
  );
}
