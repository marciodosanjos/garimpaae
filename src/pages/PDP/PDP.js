import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductAtion } from "../../redux/slices/products/productsSlice";
import {
  addOrderAction,
  getCartItemsAction,
} from "../../redux/slices/cart/cartSlice";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  Grid,
} from "@mui/material";

import useIsMobile from "../../hooks/useIsMobile";
import Teaser from "../../components/Teaser/Teaser";
import Gallery from "../../components/Gallery/Gallery";
import SuccessMsg from "../../components/SuccessMsg/SuccessMsg";

export default function PDP() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [error, setError] = useState("");

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  //get id from params;
  const { id } = useParams();

  //get single product productData
  useEffect(() => {
    dispatch(fetchProductAtion(id));
  }, [dispatch, id]);

  const { product } = useSelector((state) => state?.products);
  const productData = product?.data;

  //get cart
  useEffect(() => {
    dispatch(getCartItemsAction());
  }, [dispatch]);

  const { cartItems } = useSelector((state) => state?.cart);

  const productInCart = cartItems?.find(
    (item) => item?._id?.toString() === productData?._id?.toString()
  );

  //Add to cart handler
  const addToCartHandler = () => {
    if (selectedSize === "") {
      setError("Erro: Selecione um tamanho correto");
      setSnackbarOpen(true);
      return;
    }

    //check if product is in cart
    if (productInCart) {
      console.log("erro");
      setError("Erro: Produto já adicionado ao carrinho");
      setSnackbarOpen(true);
      return;
    }

    dispatch(
      addOrderAction({
        _id: productData?._id,
        name: productData?.name,
        qty: 1,
        price: productData?.price,
        description: productData?.description,
        color: selectedColor,
        size: selectedSize,
        image: productData?.images[0],
        totalPrice: productData?.price,
        qtyLeft: productData?.qtyLeft,
      })
    );
    setSnackbarOpen(true);
  };

  return (
    <>
      <Container className="product" sx={{ marginY: "3rem" }}>
        <Grid
          container
          sm={12}
          md={12}
          sx={{ height: "auto", gap: 0, marginBottom: 30 }}
        >
          <Grid item xs={12} sm={12} md={5} lg={6}>
            <Gallery arr={productData?.images} />
          </Grid>
          <Grid
            container
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={{
              flexDirection: "column",
              gap: 3,
              paddingX: 4,
              paddingY: isMobile && 3,
              justifyContent: "space-between",
              alignItems: { xs: "center", sm: "center", md: "flex-start" },
            }}
          >
            <Box
              className="product-infos"
              sx={{
                textAlign: isMobile && "center",
                display: "flex",
                flexDirection: "column",

                gap: 1,
              }}
            >
              <Typography variant="h1">{productData?.name}</Typography>
              <Typography
                variant="body1"
                sx={{
                  border: "1px solid grey",
                  width: isMobile ? "100%" : "30%",
                  color: "grey",
                  textAlign: "center",
                  borderRadius: 1,
                  marginBottom: 3,
                }}
              >
                Em estoque
              </Typography>
              <Typography variant="h4">R$ {productData?.price}</Typography>
              <Typography>{productData?.description}</Typography>
            </Box>
            <Box className="product-color">
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  sx={{
                    textTransform: "uppercase",
                    textAlign: isMobile && "center",
                  }}
                >
                  Cor
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  sx={{
                    paddingX: !isMobile && 1.1,
                    //border: "1px solid black",
                    textAlign: isMobile && "end",
                  }}
                >
                  {productData?.colors?.length > 0
                    ? productData?.colors.map((color) => (
                        <FormControlLabel
                          value={color}
                          control={
                            <Radio
                              sx={{
                                backgroundColor: color,
                                color: color,
                                opacity: "90%",

                                "&:hover": {
                                  backgroundColor: color,
                                  color: color,
                                },
                                "&.Mui-checked": {
                                  backgroundColor: color,
                                  color: color,
                                  border: "3px solid black",
                                },
                                "&.Mui-active": {
                                  backgroundColor: color,
                                  color: color,
                                },
                              }}
                            />
                          }
                        />
                      ))
                    : ["orange", "green", "grey", "black"].map((color) => (
                        <FormControlLabel
                          sx={{
                            textAlign: isMobile && "center",
                          }}
                          value={color}
                          control={
                            <Radio
                              sx={{
                                backgroundColor: color,
                                color: color,
                                opacity: "90%",
                                "&:hover": {
                                  backgroundColor: color,
                                  color: color,
                                },
                                "&.Mui-checked": {
                                  backgroundColor: color,
                                  color: color,
                                  border: "3px solid black",
                                },
                                "&.Mui-active": {
                                  backgroundColor: color,
                                  color: color,
                                },
                              }}
                            />
                          }
                        />
                      ))}
                </RadioGroup>
              </FormControl>
            </Box>
            <Box className="product-size">
              <Typography sx={{ textTransform: "uppercase", marginBottom: 1 }}>
                Tamanho
              </Typography>
              <Box display="flex" flexDirection="row" gap={2}>
                {productData?.sizes.map((size) => (
                  <Button
                    key={size}
                    onClick={(e) => setSelectedSize(e.target.event)}
                    value={size}
                    sx={{
                      display: "flex",
                      width: 40,
                      height: 40,
                      border: "2px solid grey",
                      backgroundColor: selectedSize ? "#71747E" : "#ffffff",
                      color: selectedSize ? "#ffffff" : "#71747E",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "lightgrey",
                      },
                      "&:active": {
                        backgroundColor: "lightgrey",
                      },
                    }}
                    aria-checked={selectedSize}
                    role="checkbox"
                  >
                    {size}
                  </Button>
                ))}
              </Box>
            </Box>

            <Box className="product-add-cart" sx={{ width: "100%" }}>
              {/* add to cart */}
              <Button
                onClick={() => addToCartHandler()}
                variant="primary"
                sx={{
                  backgroundColor: "black",
                  color: "#ffffff",
                  width: "100%",
                  marginY: "1rem",
                }}
              >
                Adicionar ao carrinho
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Teaser
        title={"Ficou com dúvidas?"}
        text={"Entre em contato com a gente e saiba mais"}
        buttonText={"Entrar em contato"}
        img={
          "https://static.vecteezy.com/system/resources/thumbnails/041/714/543/small_2x/ai-generated-black-blank-t-shirt-front-mockup-on-a-transparent-background-png.png"
        }
        blockHeight={{ xs: "60vh", sm: "60vh", md: "40vh" }}
        titleSize={"h3"}
        imgHeight={233}
        imgWidth={250}
        destination={"/"}
      />
      {isSnackbarOpen && (
        <SuccessMsg
          msg={"Produto adicionado ao carrinho"}
          isOpened={isSnackbarOpen}
          onClose={handleSnackbarClose}
        />
      )}
      {error && (
        <SuccessMsg
          msg={error}
          isOpened={isSnackbarOpen}
          onClose={handleSnackbarClose}
        />
      )}
    </>
  );
}
