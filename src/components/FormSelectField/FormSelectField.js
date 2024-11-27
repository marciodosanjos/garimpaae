import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function FormSelectField({
  compWidth = "inherit",
  arr,
  onChange,
  title,
  value,
  name,
}) {
  return (
    <FormControl
      variant="outlined"
      sx={{
        width: compWidth, // Customizando a borda padrão
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: "black", // Borda preta padrão
          },
          "&:hover fieldset": {
            borderColor: "black", // Borda preta no hover
          },
          "&.Mui-focused fieldset": {
            borderColor: "black", // Borda preta quando focado
            borderWidth: 2, // Aumenta a espessura da borda no foco (opcional)
          },
        },
      }}
    >
      <InputLabel
        id={`select-${title}-label`}
        sx={{
          // Cor padrão do texto
          color: "black",
          // Cor do texto no foco
          "&.Mui-focused": {
            color: "black", // Cor do texto quando focado
          },
        }}
      >
        {title}
      </InputLabel>
      <Select
        labelId={`select-${title}-label`}
        id={`select-${title}`}
        value={value}
        name={name}
        onChange={onChange}
        input={<OutlinedInput label={title} />}
      >
        {arr?.map((item) => (
          <MenuItem key={item} value={item} onChange={onChange}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
