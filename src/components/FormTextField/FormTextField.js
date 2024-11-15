import { TextField } from "@mui/material";

export default function FormTextField({ id, label, name, value, onChange }) {
  return (
    <TextField
      id={id}
      label={label}
      name={name}
      type="text"
      variant="outlined"
      value={value}
      onChange={onChange}
      sx={{
        // Cor da borda quando focado
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": {
            borderColor: "secondary.dark",
          },

          flexGrow: 1,
        },
        // Cor do label quando focado
        "& .MuiInputLabel-root": {
          color: "gray",
          "&.Mui-focused": {
            color: "secondary.dark",
          },
        },

        flexGrow: name === "address" ? "40" : "1",
      }}
    />
  );
}
