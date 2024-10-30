// ProductCarousel.js
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Importa os estilos do carrossel
import { CardMedia, Typography, Grid, Container, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fecthProductsAction } from "../../redux/slices/products/productsSlice";

// Função para agrupar produtos em conjuntos de três
const chunkArray = (arr, size) => {
  const results = [];
  while (arr.length) {
    results.push(arr.splice(0, size));
  }
  return results;
};

const HomeCloths = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthProductsAction());
  }, [dispatch]);

  const [listProducts, setListProducts] = useState([]);

  const { products } = useSelector((state) => state?.products);

  useEffect(() => {
    if (products && Array.isArray(products.data)) {
      const filteredProducts = products.data.filter(
        (product) => product.category === "roupas"
      );
      if (filteredProducts.length > 0) {
        setListProducts(filteredProducts);
      }
    }
  }, [products]);

  const productChunks = listProducts ? chunkArray([...listProducts], 3) : [];

  return (
    <>
      {productChunks && (
        <Container sx={{ marginTop: "4rem", marginBottom: "2rem" }}>
          <Typography variant="h1">Roupas</Typography>
        </Container>
      )}
      <Container container space={2}>
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
        >
          {productChunks.map((chunk, index) => {
            return (
              <Grid container spacing={2} key={index}>
                {chunk?.map((product) => {
                  return (
                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                      <Link to="/">
                        <CardMedia
                          sx={{ height: 340 }}
                          image={product?.images[0]}
                          title="green iguana"
                        />
                      </Link>

                      <Box sx={{ marginY: "2rem" }}>
                        <Link to={`/products/${product?.id}`}>
                          <Typography variant="h4" sx={{ textAlign: "start" }}>
                            {product?.name}
                          </Typography>
                          <Typography
                            sx={{ textAlign: "start", marginTop: "1rem" }}
                          >
                            {product?.description}
                          </Typography>
                          <Typography sx={{ textAlign: "start" }}>
                            R$ {product?.price}
                          </Typography>
                        </Link>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            );
          })}
        </Carousel>
      </Container>
    </>
  );
};

export default HomeCloths;
