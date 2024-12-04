import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlice";
import { logoutUserAction } from "../../redux/slices/users/usersSlice";
import {
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import { ShoppingCart, User, Menu } from "lucide-react";
import useIsMobile from "../../hooks/useIsMobile";
import { getCartItemsAction } from "../../redux/slices/cart/cartSlice";
import lowercaseFirstLetter from "../../utils/lowerCase";

export default function Navbar() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  //handling cart counting
  useEffect(() => {
    dispatch(getCartItemsAction());
  }, [dispatch]);
  const { cartItems: cartData } = useSelector((state) => state?.cart);

  const [cartItems, setCartItems] = useState(cartData);

  useEffect(() => {
    setCartItems(cartData);
  }, [cartData]);

  //fetch and display categories
  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const {
    categories: { data },
  } = useSelector((state) => state?.categories);

  const location = useLocation();
  const { pathname } = location;
  const adminRoute = pathname.includes("admin");

  //logout handler for mobile menu
  let logoutHandler = () => {
    dispatch(logoutUserAction());
    window.location.href = "/login";
  };

  const [hovered, setHovered] = useState(null);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  return (
    !adminRoute && (
      <header>
        <nav aria-label="Top">
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ backgroundColor: "secondary.dark" }}>
              <Container
                sx={{
                  color: "#ffffff",
                  display: "flex",
                  justifyContent: "center",
                  paddingY: "0.5rem",
                }}
              >
                <p>Frete grátis a partir de R$ 500</p>
              </Container>
            </Grid>
          </Grid>

          <Grid
            container
            spacing={2}
            sx={{
              height: "5rem",
              backgroundColor: "secondary.light",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Grid item xs={12}>
              <Container
                fixed
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {isMobile ? (
                  <>
                    <IconButton
                      onClick={() => setMobileMenuOpen(true)}
                      color="inherit"
                    >
                      <Menu size={24} />
                    </IconButton>
                    <Drawer
                      anchor="left"
                      open={mobileMenuOpen}
                      onClose={() => setMobileMenuOpen(false)}
                    >
                      <List sx={{ width: 250 }}>
                        {data?.map((category) => (
                          <ListItem button key={category?._id}>
                            <Link
                              to={`/products-filters?category=${category?.name}`}
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              <ListItemText
                                primary={lowercaseFirstLetter(category?.name)}
                              />
                            </Link>
                          </ListItem>
                        ))}
                        <ListItem button onClick={logoutHandler}>
                          <ListItemText primary="Logout" />
                        </ListItem>
                      </List>
                    </Drawer>
                    <div className="logo">
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
                  </>
                ) : (
                  <>
                    <div className="logo">
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
                    <div
                      style={{
                        display: "flex",
                        gap: "2rem",
                      }}
                    >
                      {data?.length <= 0 ? (
                        <div>Erro ao carregar categorias</div>
                      ) : (
                        data?.map((category, index) => (
                          <Link
                            key={category?._id}
                            to={`/products-filters?category=${category?.name}`}
                            style={{
                              color: hovered === index ? "#000" : "#71747E",
                              transition: "color 0.3s",
                            }}
                            onMouseOver={() => setHovered(index)}
                            onMouseOut={() => setHovered(null)}
                          >
                            {lowercaseFirstLetter(category?.name)}
                          </Link>
                        ))
                      )}
                    </div>
                  </>
                )}

                <div style={{ display: "flex", gap: "2rem" }}>
                  <div
                    onMouseOver={() => setHoveredIcon("cart")}
                    onMouseOut={() => setHoveredIcon(null)}
                    style={{ position: "relative" }} // Torna o contêiner pai um ponto de referência
                  >
                    <Link to="/shopping-cart">
                      <ShoppingCart
                        color={hoveredIcon === "cart" ? "#000" : "#71747E"}
                        strokeWidth={1}
                      />
                      <div
                        style={{
                          position: "absolute",
                          top: "-10px",
                          right: "-10px",
                          backgroundColor: "#9c0000",
                          color: "#fff",
                          borderRadius: "50%",
                          padding: "4px 8px",
                          fontSize: "0.5rem",
                          fontWeight: "bold",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {cartItems?.length}
                      </div>
                    </Link>
                  </div>
                  <div
                    onMouseOver={() => setHoveredIcon("user")}
                    onMouseOut={() => setHoveredIcon(null)}
                  >
                    <Link to="/user-profile">
                      <User
                        color={hoveredIcon === "user" ? "#000" : "#71747E"}
                        strokeWidth={1}
                      />
                    </Link>
                  </div>
                </div>
              </Container>
            </Grid>
          </Grid>
        </nav>
      </header>
    )
  );
}
