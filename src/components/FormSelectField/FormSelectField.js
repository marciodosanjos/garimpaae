import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

export default function FormSelectField({
  compWidth = "inherit",
  arr,
  onChange,
  title,
  value,
  name,
  isChecked,
}) {
  return (
    <div>
      {arr?.includes("42") || arr?.includes("L") ? (
        <Box sx={{ width: "30rem" }}>
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

          <FormGroup
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {arr?.map((item, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    onChange={onChange}
                    value={item}
                    checked={value.includes(item)} // Verifica se o item já está selecionado
                    sx={{
                      "&.Mui-checked": {
                        color: "primary.dark", // Cor quando selecionado (checked)
                      },
                    }}
                  />
                }
                label={item}
              />
            ))}
          </FormGroup>
        </Box>
      ) : arr.includes("green") ? (
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
            {arr?.map((item, index) => (
              <MenuItem
                key={index}
                value={item}
                name={item}
                onChange={onChange}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
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
              <MenuItem key={item} value={item}>
                {item + 1}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
}
