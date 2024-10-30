import { Button, Grid, Typography, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fecthProductsAction } from "../../redux/slices/products/productsSlice";
import baseURL from "../../utils/baseURL";

export default function FeaturedProductHome() {
  let [productsList, setprodutcts] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthProductsAction({ url: `${baseURL}/products` }));
  }, [dispatch]);

  const { products, error } = useSelector((state) => state?.products);

  useEffect(() => {
    if (products !== null) {
      setprodutcts(products);
    }
  }, [products]);

  if (error) {
    console.log(error);
  }

  return (
    <Container maxWidth="lg" sx={{ paddingRight: 0 }}>
      <Grid
        container
        spacing={1}
        sx={{
          backgroundColor: "withe",
          height: {
            xs: "auto", // Definindo a altura para ocupar toda a viewport em dispositivos móveis
            sm: "auto",
            md: "auto", // Altura menor para telas maiores
            lg: " auto",
            xl: "auto",
          },
          display: "flex", // Usando flexbox para alinhar verticalmente os itens
          justifyContent: "center",
          alignItems: "center",
          marginTop: "1rem",
          padding: 0,
        }}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            justifyContent: "center",
            alignItems: {
              xs: "center",
              sm: "center",
              md: "flex-start",
              lg: "flex-start",
              xl: "flex-start",
            },
            order: { xs: 2, sm: 2, md: 1, lg: 1, xl: 1 },
            height: "40vh",
          }}
        >
          <Typography variant="h1">Nike Dunk Low 6</Typography>
          <Typography variant="body1">
            Uma nova forma de fechar seu look com o mais novo da Nike
          </Typography>
          <Button
            variant="primary"
            sx={{
              marginTop: "1rem",
              paddingY: "0.5rem",
              backgroundColor: "secondary.light",
              color: "black",
              fontWeight: 600,
              textTransform: "uppercase",
            }}
            href={`/products/${
              productsList?.data ? productsList?.data[0]?.id : null
            }`}
          >
            Comprar agora
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          sx={{
            height: "30rem",
            textAlign: "center",
            padding: 0,
            margin: 0,
            position: "relative",
            order: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 },
            backgroundImage:
              productsList && productsList?.data
                ? `url(${productsList?.data[0]?.images[0]})`
                : "none",
            backgroundSize: "cover", // ajusta o tamanho da imagem
            backgroundPosition: "center", // centraliza a imagem
          }}
        ></Grid>
      </Grid>
    </Container>
  );
}
