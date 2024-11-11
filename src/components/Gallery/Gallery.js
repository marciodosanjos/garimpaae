import React, { useState } from "react";
import { Grid, Card, CardMedia, IconButton, Box } from "@mui/material";
import { ArrowForward, ArrowBack } from "@mui/icons-material";
import useIsMobile from "../../hooks/useIsMobile";

const GallerySlider = ({ arr }) => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Índice da imagem selecionada
  const isMobile = useIsMobile();
  // Navega para a próxima imagem
  const handleNext = () => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % arr.length);
  };

  // Navega para a imagem anterior
  const handlePrev = () => {
    setSelectedIndex((prevIndex) => (prevIndex - 1 + arr.length) % arr.length);
  };

  return (
    <div>
      {/* Slider de imagens */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        sx={{
          width: "100%",
          height: "auto",
          maxHeight: "80vh",
          margin: "auto",
          backgroundColor: "grey",
        }}
      >
        {/* Botão para voltar (seta para a esquerda) */}
        <IconButton
          onClick={handlePrev}
          color="primary"
          sx={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            color: "black",
          }}
        >
          <ArrowBack />
        </IconButton>

        {/* Exibe a imagem selecionada */}
        <Card
          sx={{
            width: "100%",
            height: arr?.length > 1 || isMobile ? "20rem" : "29rem",
            maxHeight: "auto",
            boxShadow: "none",
            borderRadius: "unset",
            border: "none",
          }}
        >
          <CardMedia
            component="img"
            image={arr?.length > 1 ? arr[selectedIndex] : arr[0]}
            alt={"photos[selectedIndex].alt"}
            sx={{
              objectFit: "contain",
              height: "100%",
              backgroundColor: "#F6F6F6",
            }}
          />
        </Card>

        {/* Botão para avançar (seta para a direita) */}
        <IconButton
          onClick={handleNext}
          color="primary"
          sx={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            color: "black",
          }}
        >
          <ArrowForward />
        </IconButton>
      </Box>

      {/* Exibe miniaturas de todas as imagens */}
      <Grid
        container
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "0.1rem", display: isMobile && "none" }}
      >
        {arr?.length > 1 &&
          arr?.map((photo, index) => (
            <Grid item xs={3} key={index}>
              <Card
                onClick={() => setSelectedIndex(index)}
                style={{
                  cursor: "pointer",
                  boxShadow: "none",
                  borderRadius: "unset",
                  border: "none",
                }}
              >
                <CardMedia
                  component="img"
                  height="100"
                  image={photo}
                  alt={"photo.alt"}
                  style={{
                    objectFit: "cover",
                    backgroundColor: "#F6F6F6",
                  }}
                />
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default GallerySlider;
