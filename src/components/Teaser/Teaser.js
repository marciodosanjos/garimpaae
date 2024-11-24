import { Box, Button, Typography, Container, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fecthProductsAction } from "../../redux/slices/products/productsSlice";
import baseURL from "../../utils/baseURL";
import { Link } from "react-router-dom";

export default function Teaser({
  title,
  text,
  buttonText,
  img,
  blockHeight,
  imgHeight,
  imgWidth,
  titleSize,
  destination,
}) {
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

  return (
    <>
      <Grid
        className="hero"
        container
        spacing={2}
        sx={{
          height: blockHeight,
          background: "linear-gradient(45deg, #F6F6F6, #E6E7E8)",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Container
            fixed
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
                lg: "row",
              },
              justifyContent: {
                xs: "center",
                md: "space-between",
                lg: "space-between",
              },
              alignItems: {
                xs: "center",
                md: "space-between",
                lg: "space-between",
              },
            }}
          >
            <Box
              className="hero-text"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: {
                  xs: "center",
                  md: "flex-start",
                  lg: "flex-start",
                },
                gap: "1.5rem",
                order: {
                  xs: 2,
                  md: 1,
                },
              }}
            >
              <Box>
                <Typography
                  variant={titleSize}
                  sx={{
                    fontWeight: "600",
                    textAlign: {
                      xs: "center",
                      sm: "center",
                      md: "start",
                      lg: "start",
                    },
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="body"
                  sx={{
                    display: "flex",
                    justifyContent: {
                      xs: "center",
                      md: "flex-start",
                      lg: "flex-start",
                    },
                  }}
                >
                  {text}
                </Typography>
              </Box>
              <Box>
                <Link to={destination}>
                  <Button variant="primary">{buttonText}</Button>
                </Link>
              </Box>
            </Box>
            <Box
              className="hero-img"
              sx={{
                height: imgHeight,
                width: imgWidth,
                maxHeight: { xs: 233, md: 567 },
                maxWidth: { xs: 350, md: 550 },
                zIndex: 100,
                order: {
                  xs: 1,
                  md: 2,
                },
              }}
            >
              <img
                src={img}
                alt="The house from the offer."
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
