import { Box, Container, Grid, Typography } from "@mui/material";
import { ShoppingCart, MapPinHouse, Key, LogOut } from "lucide-react";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import { BorderBottom } from "@mui/icons-material";

const menuItems = [
  {
    destination: "/user-profile",
    icon: ShoppingCart,
    text: "Minhas compras",
  },
  {
    destination: "address",
    icon: MapPinHouse,
    text: "Endereço",
  },
  {
    destination: "change-password",
    icon: Key,
    text: "Senha",
  },
  {
    destination: "logout",
    icon: LogOut,
    text: "Encerrar sessão",
  },
];

export default function UserProfile() {
  const [hovered, setHovered] = useState(null);
  const [isActive, setIsActive] = useState(1);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const isMobile = useIsMobile();

  return (
    <Container fixed>
      <Grid
        container
        sx={{
          marginY: "3rem",
          flexDirection: isMobile && "column",
          alignItems: isMobile && "center",
          gap: isMobile && 7,
        }}
      >
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} sx={{ width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "row" : "column",
              justifyContent: "space-between",
              alignItems: "space-between",
              gap: 3,
              width: !isMobile ? "70%" : "100%",
            }}
          >
            {menuItems?.map((item, index) => (
              <Link to={item?.destination} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 2,

                    paddingBottom: 0.5,
                    borderBottom:
                      isActive === index
                        ? "0.5px solid rgba(0, 0, 0, 0.1)"
                        : "none", // Aplica borderBottom ao item ativo
                  }}
                  onClick={() => setIsActive(index)}
                >
                  <item.icon
                    color={isActive === index ? "#000" : "#71747E"}
                    sx={{
                      borderBottom: isActive === index ? "black" : "green",
                    }}
                    strokeWidth={1}
                    onMouseOver={() => setHovered(index)}
                    onMouseOut={() => setHovered(null)}
                    onClick={() => setIsActive(index)}
                  />

                  <Typography
                    sx={{
                      color: isActive === index ? "#000" : "#71747E",
                      cursor: "pointer",
                      display: isMobile && "none",
                    }}
                    onMouseOver={() => setHovered(index)}
                    onMouseOut={() => setHovered(null)}
                  >
                    {item?.text}
                  </Typography>
                </Box>
              </Link>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          {/* O Outlet renderiza o conteúdo dinâmico baseado na rota */}
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
}
