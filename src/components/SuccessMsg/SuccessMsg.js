import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function SuccessMsg({ msg, isOpened, onClose }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onClose(); // Chama a função do componente pai.
  };

  console.log(msg?.includes("failed"));

  return (
    <>
      <Snackbar open={isOpened} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          icon={
            msg?.includes("Erro") || msg?.includes("failed") ? (
              <ErrorOutlineIcon />
            ) : (
              <CheckCircleIcon />
            )
          }
          severity={msg?.includes("Erro") ? "error" : "success"}
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor:
              msg?.includes("Erro") || msg?.includes("failed")
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
