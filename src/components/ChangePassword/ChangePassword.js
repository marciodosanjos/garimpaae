import { Box, Button, Grid, Typography } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import { useState } from "react";
import FormTextField from "../FormTextField/FormTextField";
import { useDispatch } from "react-redux";
import translateLabels from "../../utils/translateLabels";

export default function ChangePassword() {
  const isMobile = useIsMobile();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  //const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  // };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography
            variant="h3"
            sx={{
              textAlign: isMobile && "center",
              marginBottom: isMobile && "2rem",
            }}
          >
            Seus dados de acesso
          </Typography>
          <Typography
            variant="body"
            sx={{
              textAlign: isMobile && "center",
              marginBottom: isMobile && "2rem",
            }}
          >
            Altere aqui seus dados de acesso, inserindo os novos dados no
            formulário abaixo.
          </Typography>

          <form style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {Object.entries(formData).map(([key, value], index) => (
              <FormTextField
                id={key.toLowerCase()}
                name={key}
                label={translateLabels(key)}
                value={value || ""}
                onChange={handleOnChange}
                type="password"
              />
            ))}
            <Button type="submit" variant="primary">
              Atualizar dados
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
}
