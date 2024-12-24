//UpdateProduct.js
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import {
  fetchProductAtion,
  updateProductAction,
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
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";

export default function UpdateProduct() {
  const [files, setFiles] = useState("");
  const [filesError, setFilesError] = useState([]);
  const [isChecked, setIsChecked] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const dispatch = useDispatch();

  //sizes
  const sizes = ["S", "M", "L", "XL"];
  const sizesShoes = ["38", "39", "40", "41", "42", "43"];

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

  //select colors data from store
  useEffect(() => {
    dispatch(fetchColorsAction());
  }, [dispatch]);
  const { colors } = useSelector((state) => state?.colors);
  const colorItems = colors?.data?.map((item) => item.name) || [];

  const handleColorChangeOption = (e) => {
    const {
      target: { value },
    } = e;

    setColorOptions(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  //fetch single product
  const { id } = useParams();

  //products
  useEffect(() => {
    dispatch(fetchProductAtion(id));
  }, [id, dispatch]);

  const { product } = useSelector((state) => state?.products);
  const productData = product?.data;

  //form data
  const [formData, setFormData] = useState({
    name: productData?.name,
    description: productData?.description,
    category: productData?.category,
    sizes: productData?.sizes,
    brand: productData?.brand,
    colors: productData?.colors,
    price: productData?.price,
    totalQty: productData?.totalQty,
  });

  const [sizeOption, setSizeOption] = useState(productData?.sizes);
  const [colorOptions, setColorOptions] = useState(productData?.colors);

  useEffect(() => {
    if (productData?.sizes) {
      setSizeOption(productData.sizes);
    }
  }, [productData]);

  const { brand, category } = formData;

  const newFormData = {
    ...formData,
    id,
    sizes: sizeOption,
    colors: colorOptions,
  };

  //handlers
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  //Clean size array on category change
  useEffect(() => {
    setSizeOption([]);
    setIsChecked(false);
  }, [category]);

  //onSubmit
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    Object.entries(newFormData).some(([key, value], index) => {
      if (!value) {
        const errorMsg = "Erro: preencha todos os campos";
        setErrorMessage(errorMsg);
        console.log("dispara erro:", errorMsg); // Evite usar o estado diretamente aqui
        return; // Interrompa o fluxo se a validação falhar
      }
    });

    const sanitizedFormData = {};
    for (const [key, value] of Object.entries(newFormData)) {
      const sanitizedValue = DOMPurify.sanitize(value);
      if (sanitizedValue === "") {
        alert("Preencha os campos corretamente");
        return;
      }
      sanitizedFormData[key] = sanitizedValue;
    }

    try {
      // Despacha a ação para criar o produto e aguarda o resultado
      const result = await dispatch(updateProductAction(sanitizedFormData));

      // Aqui você pode manipular a resposta, caso seja necessário
      if (updateProductAction.fulfilled.match(result)) {
        console.log("obj a ser enviado", sanitizedFormData);
        console.log("Produto adicionado com sucesso:", result.payload);
        setSnackbarOpen(true);
        setErrorMessage("");
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 6000);
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
      } else if (updateProductAction.rejected.match(result)) {
        console.log("Erro ao adicionar produto:", result.error.message);
        setErrorMessage(
          "Erro ao adicionar produto. Preencha todos os campos corretamente"
        );
        setTimeout(() => {
          setErrorMessage("");
        }, 6000);
      }
    } catch (error) {
      console.log("Erro inesperado:", error);
      setErrorMessage("Erro inesperado");
    }
  };

  return (
    <>
      <Container fixed>
        {!sizeOption?.length > 0 ? (
          <LoadingComponent />
        ) : (
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <TitleUserProfileSection
                title={"Atualizar produto"}
                description={"Atualize os dados do produto"}
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
                        onChange={handleOnChange}
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
                        isChecked={(size) => sizeOption.includes(size)}
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
                            {files?.length > 0
                              ? `Arquivos selecionados: ${files
                                  .map((file) => file.name)
                                  .join(", ")}`
                              : "Nenhum arquivo selecionado"}
                          </Typography>

                          {filesError?.length > 0 &&
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
                        value={colorOptions || []}
                        name={key}
                      />
                    );
                  }
                  if (key === "colors") {
                    return (
                      <FormMultiSelectField
                        arr={colorItems || []}
                        title={"Cores"}
                        compWidth="30rem"
                        onChange={handleColorChangeOption}
                        value={colorOptions || []}
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
                  Atualizar produto
                </Button>
              </Box>
              {isSnackbarOpen && (
                <SuccessMsg
                  msg={"Produto atualizado com sucesso"}
                  isOpened={isSnackbarOpen}
                  onClose={handleSnackbarClose}
                />
              )}
              {errorMessage.includes("Erro") && (
                <SuccessMsg
                  msg={errorMessage}
                  isOpened={true} // Make sure the error is displayed
                  onClose={() => setErrorMessage("")} // Clear the error message when closing
                />
              )}
            </Grid>
          </Grid>
        )}
      </Container>
    </>
  );
}
