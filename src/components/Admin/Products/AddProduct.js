import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import makeAnimated from "react-select/animated";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import {
  addProductAction,
  fecthProductsAction,
  resetProductAdded,
} from "../../../redux/slices/products/productsSlice";
import { fetchCategoriesAction } from "../../../redux/slices/categories/categoriesSlice";
import { fetchBrandsAction } from "../../../redux/slices/brands/brandsSlice";
import { fetchColorsAction } from "../../../redux/slices/colors/colorsSlice";
import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  Typography,
} from "@mui/material";
import TitleUserProfileSection from "../../TitleUserProfileSection/TitleUserProfileSection";
import FormTextField from "../../FormTextField/FormTextField";
import translateLabels from "../../../utils/translateLabels";
import FormSelectField from "../../FormSelectField/FormSelectField";
import FormMultiSelectField from "../../FormMultiSelectField/FormMultiSelectField";

export default function AddProduct() {
  const dispatch = useDispatch();

  //files
  const [files, setFiles] = useState("");
  const [filesError, setFilesError] = useState([]);

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

  //clean data if error
  useEffect(() => {
    if (filesError.length > 0) {
      setTimeout(() => {
        setFilesError([]);
        setFiles([]);
      }, 3000);
    }
  }, [filesError]);

  //select categories data from store
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  const { categories } = useSelector((state) => state?.categories);
  const categoriesItems = categories?.data?.map((item) => item.name) || [];

  //select brands data from store
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);
  const { brands } = useSelector((state) => state?.brands);
  const brandsItems = brands?.data?.map((item) => item.name) || [];

  //select categories data from store
  const [colorOptions, setColorOptions] = useState([]);

  useEffect(() => {
    dispatch(fetchColorsAction());
  }, [dispatch]);

  //select colors data from store
  const { colors } = useSelector((state) => state?.colors);
  const colorItems = colors?.data?.map((item) => item.name) || [];

  let colorOptionsCoverted = colors?.data?.map((color) => {
    return {
      value: color.name,
      label: color.name,
    };
  });

  const handleColorChangeOption = (e) => {
    const {
      target: { value },
    } = e;

    setColorOptions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //products
  useEffect(() => {
    dispatch(fecthProductsAction());
  }, [dispatch]);

  //---form data---
  const [formData, setFormData] = useState({
    name: "Dunk Low",
    description: "Lorem ipsum",
    category: "",
    sizes: "",
    brand: "",
    colors: "",
    price: "200",
    totalQty: "2",
    images: "",
  });

  const { name, brand, category, description, totalQty, price, images } =
    formData;

  //default onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //sizes
  const sizes = ["S", "M", "L", "XL"];
  const sizesShoes = ["38", "39", "40", "41", "42", "43"];
  const [sizeOption, setSizeOption] = useState([]);
  const [isChecked, setIsChecked] = useState(true);

  //Clean size array on category change
  useEffect(() => {
    setSizeOption([]);
    setIsChecked(false);
  }, [category]);

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;

    setSizeOption((prevValue) => {
      if (checked) {
        // Adiciona o tamanho se estiver marcado
        return [...prevValue, value];
      } else {
        // Remove o tamanho se estiver desmarcado
        return prevValue.filter((size) => size !== value);
      }
    });
  };

  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState(false);

  //useEffect to reset isAdded
  useEffect(() => {
    if (isAdded) {
      // Reseta isAdded após 3 segundos
      setTimeout(() => {
        dispatch(resetProductAdded());
      }, 3000);
    }
  }, [isAdded, dispatch]);

  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  //onSubmit
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      // Despacha a ação para criar o produto e aguarda o resultado
      const result = await dispatch(
        addProductAction({
          ...formData,
          images: files,
          sizes: sizeOption,
          colors: colorOptions,
        })
      );

      // Aqui você pode manipular a resposta, caso seja necessário
      if (addProductAction.fulfilled.match(result)) {
        console.log("Produto adicionado com sucesso:", result.payload);
        setSnackbarOpen(true);
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 6000);
      } else if (addProductAction.rejected.match(result)) {
        console.log("Erro ao adicionar produto:", result.payload);
        setError(true);
      }
    } catch (error) {
      console.log("Erro inesperado:", error);
    }

    // Resetar os dados do formulário
    setFormData({
      name: "",
      description: "",
      category: "",
      sizes: "",
      brand: "",
      colors: "",
      images: "",
      price: "",
      totalQty: "",
    });
  };

  return (
    <>
      <Container fixed>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <TitleUserProfileSection
              title={"Adicionar produto"}
              description={"Adicione um novo produto"}
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
                if (key === "description") {
                  return (
                    <FormTextField
                      key={index}
                      label={translateLabels(key)}
                      value={value}
                      onChange={handleOnChange}
                      compWidth="30rem"
                      name={key}
                      rows={3}
                    />
                  );
                }

                if (key === "category") {
                  return (
                    <FormSelectField
                      arr={categoriesItems || []}
                      title={"Categoria"}
                      compWidth="30rem"
                      onChange={handleOnChange} // Passando onChange para o FormSelectField
                      value={formData.category}
                      name={key}
                    />
                  );
                }
                if (key === "brand") {
                  return (
                    <FormSelectField
                      arr={brandsItems || []}
                      title={"Marca"}
                      compWidth="30rem"
                      onChange={handleOnChange}
                      value={brand}
                      name={key}
                    />
                  );
                }
                if (key === "sizes") {
                  return (
                    <FormSelectField
                      arr={category === "sneaker" ? sizesShoes : sizes || []}
                      title={"Tamanhos"}
                      compWidth="30rem"
                      onChange={handleSizeChange}
                      value={sizeOption}
                      name={key}
                      isChecked={isChecked}
                    />
                  );
                }
                if (key === "images") {
                  return (
                    <Box
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
                if (key === "colors") {
                  return (
                    <FormMultiSelectField
                      arr={colorItems || []}
                      title={"Cores"}
                      compWidth="30rem"
                      onChange={handleColorChangeOption}
                      value={colorOptions}
                      name={key}
                    />
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
                Criar novo produto
              </Button>
            </Box>
            {isSnackbarOpen && (
              <SuccessMsg
                msg={"Produto adicionado ao carrinho"}
                isOpened={isSnackbarOpen}
                onClose={handleSnackbarClose}
              />
            )}
            {error && (
              <SuccessMsg
                msg={"Produto já existe"}
                isOpened={isSnackbarOpen}
                onClose={handleSnackbarClose}
              />
            )}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
