import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FormMultiSelectField({
  arr,
  onChange,
  title,
  value,
  compWidth,
}) {
  return (
    <div>
      <FormControl
        sx={{
          width: compWidth,
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              //borderColor: "black",
            },
            "&:hover fieldset": {
              borderColor: "black",
            },
            "&.Mui-focused fieldset": {
              borderColor: "black",
              borderWidth: 2,
            },
          },
        }}
      >
        <InputLabel
          id="demo-multiple-name-label"
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
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={value}
          onChange={onChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {arr?.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
