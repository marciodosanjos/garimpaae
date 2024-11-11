import { Box, Button, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function Card({ id, image, name, price }) {
  return (
    <Grid
      item
      sm={12}
      md={6}
      lg={4}
      sx={{
        marginBottom: { sm: "1rem", md: "1rem" },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      key={id}
    >
      <Link to={`/products/${id}`}>
        <Box
          className="product-card"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-beetwen",
            //border: "1px solid black",
            gap: 2,
          }}
        >
          <Box
            className="product-card-image"
            sx={{
              height: 320,
              maxHeight: { xs: 233, md: 567 },
              maxWidth: { xs: 350, sm: 800, md: 850 },
              backgroundColor: "#F6F6F6",
              paddingX: "1rem",
              "&:hover": {
                opacity: "80%",
              },
            }}
          >
            <img
              src={
                image ||
                "https://sneakersul.com.br/cdn/shop/files/nike-sb-dunk-low-ebay-1.webp?v=1711918943"
              }
              alt={name}
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
              height: "3rem",
              gap: 1,
            }}
          >
            <Typography className="product-card-title" variant="h6">
              {name || "Nome do Produto"}
            </Typography>
            <Typography
              className="product-card-price"
              variant="body2"
              sx={{
                color: "#474B57",
              }}
            >
              R$ {price || "50000"}
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
}
