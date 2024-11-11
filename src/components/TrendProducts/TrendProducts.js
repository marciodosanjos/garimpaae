import { Typography, Container, Box, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function TrendProducts({ title, array }) {
  return (
    <>
      <Container fixed space={2} sx={{ marginBottom: "10rem" }}>
        <Grid
          container
          space={2}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "flex-start",
            gap: 3,
            marginTop: "5rem",
            marginBottom: "5rem",
            //border: "1px solid black",
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            sx={{
              marginBottom: { md: "1rem" },
              //border: "1px solid black",
              textAlign: "center",
            }}
          >
            <Typography variant="h5">{title}</Typography>
          </Grid>

          {array?.map((product) => {
            return (
              <Grid
                item
                md={3}
                sm={6}
                sx={{
                  marginBottom: { md: "1rem" },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                key={product.id}
              >
                <Link to={`/products/${product?.id}`}>
                  <Box
                    className="product-card"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      gap: 2,
                      width: "100%",
                    }}
                  >
                    <Box
                      className="product-card-image"
                      sx={{
                        height: 320,
                        maxHeight: { xs: 233, md: 567 },
                        maxWidth: { xs: 350, md: 550 },
                        backgroundColor: "#F6F6F6",
                        paddingX: "1rem",
                        "&:hover": {
                          opacity: "80%",
                        },
                      }}
                    >
                      <img
                        src={
                          product?.images[0] ||
                          "https://sneakersul.com.br/cdn/shop/files/nike-sb-dunk-low-ebay-1.webp?v=1711918943"
                        }
                        alt={product?.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                    <Box
                      className="product-card-text"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <Typography className="product-card-title" variant="h6">
                        {product?.name || "Nome do Produto"}
                      </Typography>
                      <Typography
                        className="product-card-price"
                        variant="body2"
                        sx={{
                          color: "#474B57",
                        }}
                      >
                        R$ {product?.price || "Preço"}
                      </Typography>
                    </Box>

                    <Box className="product-card-button">
                      <Button
                        variant="primary"
                        sx={{
                          width: "100%",
                        }}
                      >
                        Comprar
                      </Button>
                    </Box>
                  </Box>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
