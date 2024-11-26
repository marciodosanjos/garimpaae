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
import { Box, Button, Container, Grid } from "@mui/material";
import TitleUserProfileSection from "../../TitleUserProfileSection/TitleUserProfileSection";
import FormTextField from "../../FormTextField/FormTextField";
import translateLabels from "../../../utils/translateLabels";

export default function AddProduct() {
  const dispatch = useDispatch();

  //files
  const [files, setFiles] = useState([]);
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

  //sizes
  const sizes = ["S", "M", "L", "XL"];
  const [sizeOption, setSizeOption] = useState([]);

  const handleSizeChange = (sizes) => {
    setSizeOption(sizes);
  };

  const sizeOptionsCoverted = sizes.map((size) => {
    return {
      value: size,
      label: size,
    };
  });

  //categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  //select categories data from store
  const { categories } = useSelector((state) => state?.categories);

  //brands
  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);

  //select brands data from store
  const { brands } = useSelector((state) => state?.brands);

  //colors
  const [colorOption, setColorOption] = useState([]);

  useEffect(() => {
    dispatch(fetchColorsAction());
  }, [dispatch]);

  //select colors data from store
  const { colors } = useSelector((state) => state?.colors);

  let colorOptionsCoverted = colors?.data?.map((color) => {
    return {
      value: color.name,
      label: color.name,
    };
  });

  const handleColorChangeOption = (color) => {
    setColorOption(color);
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
  });

  //const { name, brand, category, description, totalQty, price } = formData;

  //onChange
  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const {
    isAdded,
    loading: loadingProduct,
    error: errProductCreation,
  } = useSelector((state) => {
    return state?.products;
  });

  //useEffect para resetar isAdded
  useEffect(() => {
    if (isAdded) {
      // Reseta isAdded após 3 segundos
      setTimeout(() => {
        dispatch(resetProductAdded());
      }, 3000);
    }
  }, [isAdded, dispatch]);

  //onSubmit
  const handleOnSubmit = (e) => {
    e.preventDefault();

    //dispatch action create product
    dispatch(
      addProductAction({
        ...formData,
        files,
        colors: colorOption?.map((color) => color.value),
        sizes: sizeOption?.map((size) => size.value),
      })
    );

    //reset form data
    // setFormData({
    //   name: "",
    //   description: "",
    //   category: "",
    //   sizes: "",
    //   brand: "",
    //   colors: "",
    //   images: "",
    //   price: "",
    //   totalQty: "",
    // });
  };

  return (
    <>
      {isAdded && <SuccessMsg message="Produto adicionado com sucesso" />}
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
            style={{ textAlign: "center", gap: 20, paddingBottom: "6rem" }}
          >
            <form
              onSubmit={handleOnSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {Object.entries(formData).map(([key, value], index) => {
                if (key == "description") {
                  return (
                    <FormTextField
                      key={index}
                      label={translateLabels(key)}
                      value={value}
                      onChange={handleOnChange}
                      compWidth="30rem"
                      name={value[index]}
                      rows={3}
                    />
                  );
                }
                return (
                  <FormTextField
                    key={index}
                    label={translateLabels(key)}
                    value={value}
                    name={value[index]}
                    onChange={handleOnChange}
                    compWidth="30rem"
                  />
                );
              })}
            </form>
            <Box sx={{ width: "100%" }}>
              <Button type="submit" variant="primary" sx={{ width: "57%" }}>
                Criar novo produto
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
