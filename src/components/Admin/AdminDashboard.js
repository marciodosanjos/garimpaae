import { Box, Container, Grid, Typography } from "@mui/material";
import {
  LayoutDashboard,
  PackageSearch,
  ShoppingCart,
  Palette,
  Ungroup,
  LogOut,
  Compass,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileAction } from "../../redux/slices/users/usersSlice";
import { fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlice";

const menuItems = [
  {
    destination: "dashboard",
    icon: LayoutDashboard,
    text: "Dashboard",
  },
  {
    destination: "products",
    icon: PackageSearch,
    text: "Produtos",
  },
  {
    destination: "orders",
    icon: ShoppingCart,
    text: "Pedidos",
  },
  {
    destination: "categories",
    icon: Ungroup,
    text: "Categorias",
  },
  {
    destination: "colors",
    icon: Palette,
    text: "Cores",
  },
  {
    destination: "brands",
    icon: Compass,
    text: "Marcas",
  },
  {
    destination: "logout",
    icon: LogOut,
    text: "Encerrar sessão",
  },
];

export default function UserProfile() {
  const [hovered, setHovered] = useState(null);
  const [isActive, setIsActive] = useState(0);
  const isMobile = useIsMobile();
  const [isLogged, setIsLogged] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  const { error } = useSelector((state) => state?.users);

  const errorMsg = error?.message;

  useEffect(() => {
    if (errorMsg === "Invalid token") {
      setIsLogged(false);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  }, []);

  function handleClick(index) {
    setIsActive(index);

    if (index === 3) {
      dispatch(fetchCategoriesAction());
    }
  }

  return (
    <Container maxWidth="lg">
      <Grid
        container
        sx={{
          flexDirection: isMobile && "column",
          alignItems: isMobile && "center",
          gap: isMobile && 7,
          paddingTop: 10,
        }}
      >
        {/* Menu items */}
        <Grid item xs={12} sm={12} md={3} lg={3} xl={3} sx={{ width: "100%" }}>
          <div
            className="logo"
            style={{
              marginBottom: "4rem",
            }}
          >
            <Link to="/">
              <span
                style={{
                  textTransform: "upperCase",
                  fontWeight: 800,
                }}
              >
                Garimpa Aê
              </span>
            </Link>
          </div>
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
                  onClick={() => {
                    handleClick(index);
                  }}
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
        {/* Outlet renders dinamically the content based on the route */}
        <Grid container item xs={12} sm={12} md={9} lg={9} xl={9}>
          <Outlet />
        </Grid>
      </Grid>
    </Container>
  );
}
