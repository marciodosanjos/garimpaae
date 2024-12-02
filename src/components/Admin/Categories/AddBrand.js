import { useState } from "react";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import { useDispatch } from "react-redux";
import { Box, Button, Container, Grid } from "@mui/material";
import TitleUserProfileSection from "../../TitleUserProfileSection/TitleUserProfileSection";
import translateLabels from "../../../utils/translateLabels";
import FormTextField from "../../FormTextField/FormTextField";
import { addColorAction } from "../../../redux/slices/colors/colorsSlice";
import { createBrandAction } from "../../../redux/slices/brands/brandsSlice";

export default function AddBrand() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
  });

  //---onChange---
  const handleOnChange = (e) => {
    console.log(e.target.value);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  //onSubmit
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const payload = formData.name;

    console.log(payload);

    try {
      const result = await dispatch(createBrandAction(payload));
      if (createBrandAction.fulfilled.match(result)) {
        setSnackbarOpen(true);
        setFormData({ name: "" });
      } else {
        setErrorMessage("Erro ao adicionar marca.");
      }
    } catch (error) {
      console.log("Erro inesperado:", error);
      setErrorMessage("Erro inesperado.");
    }
  };

  return (
    <>
      <Container fixed>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TitleUserProfileSection
              title={"Adicionar nova marca"}
              description={"Adicione uma marca"}
              alignment={"center"}
            />
          </Grid>
          <Grid
            item
            container
            direction="column"
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ textAlign: "center", gap: 30, paddingBottom: "6rem" }}
          >
            <form
              onSubmit={handleOnSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 15,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {Object.entries(formData).map(([key, value], index) => {
                return (
                  <FormTextField
                    key={index}
                    label={translateLabels(key)}
                    value={value}
                    name={key}
                    onChange={handleOnChange}
                    compWidth="30rem"
                  />
                );
              })}
            </form>
            <Box sx={{ width: "100%" }}>
              <Button
                type="submit"
                variant="primary"
                sx={{ width: "30rem" }}
                onClick={handleOnSubmit}
              >
                Adicionar nova marca
              </Button>
            </Box>
            {isSnackbarOpen && (
              <SuccessMsg
                msg={"Marca adicionada com sucesso!"}
                isOpened={isSnackbarOpen}
                onClose={handleSnackbarClose}
              />
            )}
            {errorMessage.includes("Erro") && (
              <SuccessMsg
                msg={errorMessage}
                isOpened={true} // Garanta que o erro seja exibido
                onClose={() => setErrorMessage("")} // Limpe a mensagem de erro ao fechar
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
