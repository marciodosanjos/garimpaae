import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";

export default function SuccessMsg({ msg, isOpened, onClose }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onClose(); // Chama a função do componente pai.
  };

  return (
    <>
      <Snackbar open={isOpened} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={msg?.includes("Erro") ? "error" : "success"}
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor: msg?.includes("Erro")
              ? "#9c0000"
              : "secondary.dark",
            color: "#ffffff",
          }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </>
  );
}
