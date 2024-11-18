import { Box, Container, Grid, Typography } from "@mui/material";
import { ShoppingCart, MapPinHouse, Key, LogOut } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    destination: "/",
    icon: ShoppingCart,
    text: "Minhas compras",
  },
  {
    destination: "/",
    icon: MapPinHouse,
    text: "Endereço",
  },
  {
    destination: "/",
    icon: Key,
    text: "Senha",
  },
  {
    destination: "/",
    icon: LogOut,
    text: "Encerrar sessão",
  },
];

export default function UserProfile() {
  const [hovered, setHovered] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  return (
    <Container fixed>
      <Grid container sx={{ marginY: "3rem" }}>
        <Grid item xs={6} sm={6} md={4} lg={4} xl={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: 2,
            }}
          >
            {menuItems?.map((item, index) => (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  gap: 2,
                }}
              >
                <Link to={item?.destination} key={index}>
                  <item.icon
                    color={hovered === index ? "#000" : "#71747E"}
                    strokeWidth={1}
                    onMouseOver={() => setHovered(index)}
                    onMouseOut={() => setHovered(null)}
                  />
                </Link>
                <Typography
                  sx={{
                    color: hovered === index ? "#000" : "#71747E",
                    cursor: "pointer",
                  }}
                  onMouseOver={() => setHovered(index)}
                  onMouseOut={() => setHovered(null)}
                >
                  {item?.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={8}
          lg={8}
          xl={8}
          sx={{ backgroundColor: "grey" }}
        >
          2
        </Grid>
      </Grid>
    </Container>
  );
}
