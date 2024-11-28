import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { useState } from "react";

export default function FormTextField({
  id,
  label,
  name,
  value,
  onChange,
  compWidth = "inherit",
  type = "text",
  rows = 0,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {name === "password" ? (
        <FormControl
          variant="outlined"
          fullWidth
          sx={{
            // Alterando a cor da label ao focar
            "& .MuiInputLabel-root": {
              color: "gray", // Cor padrão da label
              "&.Mui-focused": {
                color: "black", // Cor da label ao focar
              },
            },
            // Alterando a borda ao focar
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black", // Cor da borda ao focar
              },
            },
          }}
        >
          {/* Label */}
          <InputLabel htmlFor={id}>{label}</InputLabel>

          {/* Input */}
          <OutlinedInput
            id={id}
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={label}
            name={name}
            onChange={onChange}
            value={value}
            sx={{
              // Alterando o estilo diretamente no campo ao focar
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "black", // Cor da borda ao focar
                color: "black",
              },
              // Alterando a cor da label ao focar
              "& + .MuiInputLabel-root": {
                color: "gray", // Cor padrão da label
                "&.Mui-focused": {
                  color: "black", // Cor da label ao focar
                },
              },
            }}
          />
        </FormControl>
      ) : (
        <TextField
          id={id}
          label={label}
          name={name}
          type={type}
          variant="outlined"
          value={value || ""}
          onChange={onChange}
          multiline
          maxRows={4}
          rows={rows}
          sx={{
            // Cor da borda quando focado
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": {
                borderColor: "secondary.dark",
              },

              flexGrow: 1,
              width: compWidth,
            },
            // Cor do label quando focado
            "& .MuiInputLabel-root": {
              color: "gray",
              "&.Mui-focused": {
                color: "secondary.dark",
              },
            },
          }}
        />
      )}
    </>
  );
}
