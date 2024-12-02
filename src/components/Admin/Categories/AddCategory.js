import { useState } from "react";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import { useDispatch } from "react-redux";
import { addCategoryAction } from "../../../redux/slices/categories/categoriesSlice";
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  Typography,
} from "@mui/material";
import TitleUserProfileSection from "../../TitleUserProfileSection/TitleUserProfileSection";
import translateLabels from "../../../utils/translateLabels";
import FormTextField from "../../FormTextField/FormTextField";

export default function CategoryToAdd() {
  const [errorMessage, setErrorMessage] = useState("");
  const [files, setFiles] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();
  const [filesError, setFilesError] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
  });

  //---onChange---
  const handleOnChange = (e) => {
    console.log(e.target.value);

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const file = files;
  console.log(file[0]?.name);

  const newFormData = { ...formData, file };

  //file handle change
  const fileHandleChange = (event) => {
    const newFiles = Array.from(event.target.files);

    const newErrs = [];
    //validation
    newFiles.forEach((file) => {
      if (file?.size > 1000000) {
        newErrs.push(`${file.name} é muito grande`);
      }
      if (!file?.type?.startsWith("image/")) {
        newErrs.push(`${file.name} não é uma imagem `);
      }
    });

    setFiles(newFiles);
    setFilesError(newErrs);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  //onSubmit
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (filesError.length > 0) {
      setErrorMessage("Resolução dos erros antes de prosseguir.");
      return;
    }

    const payload = { ...formData, file: files[0] }; // Primeiro arquivo
    try {
      const result = await dispatch(addCategoryAction(payload));
      if (addCategoryAction.fulfilled.match(result)) {
        setSnackbarOpen(true);
        setFormData({ name: "" });
        setFiles([]);
      } else {
        setErrorMessage("Erro ao adicionar categoria.");
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
              title={"Adicionar nova categoria"}
              description={"Adicione uma categoria"}
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
              {Object.entries(newFormData).map(([key, value], index) => {
                if (key === "file") {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        width: "30rem",
                      }}
                    >
                      <InputLabel>Upload de imagens</InputLabel>
                      <div>
                        <input
                          id="file-upload"
                          name="images"
                          onChange={fileHandleChange}
                          type="file"
                          multiple
                          style={{ display: "none" }}
                        />

                        {/* Botão personalizado para acionar o input de arquivo */}
                        <Button
                          variant="outlined"
                          onClick={() =>
                            document.getElementById("file-upload").click()
                          }
                          sx={{ width: "100%" }}
                        >
                          Selecione fotos
                        </Button>

                        {/* Exibe o nome do arquivo ou o texto padrão */}
                        <Typography>
                          {files.length > 0
                            ? `Arquivos selecionados: ${files
                                .map((file) => file.name)
                                .join(", ")}`
                            : "Nenhum arquivo selecionado"}
                        </Typography>

                        {filesError.length > 0 &&
                          filesError.map((error) => (
                            <Typography sx={{ color: "red" }}>
                              {error}
                            </Typography>
                          ))}
                      </div>
                    </Box>
                  );
                }

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
                Criar nova categoria
              </Button>
            </Box>
            {isSnackbarOpen && (
              <SuccessMsg
                msg={"Categoria criada com sucesso!"}
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
