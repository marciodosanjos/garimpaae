import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeCartQtyAction,
  getCartItemsAction,
  removeItemCartAction,
} from "../../redux/slices/cart/cartSlice";
import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { Trash2 } from "lucide-react";
import useIsMobile from "../../hooks/useIsMobile";
import Teaser from "../../components/Teaser/Teaser";

export default function ShoppingCart() {
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState({});
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(getCartItemsAction());
  }, [dispatch]);

  const { cartItems } = useSelector((state) => state?.cart);

  const changeOrderItemQtyHandler = (productId, qty) => {
    dispatch(changeCartQtyAction({ productId, qty }));
    dispatch(getCartItemsAction());
  };

  const removeOrderItemFromLocalStorageHandler = (productId) => {
    dispatch(removeItemCartAction(productId));
    dispatch(getCartItemsAction());
  };

  const handleQuantityChange = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
    changeOrderItemQtyHandler(productId, newQuantity);
  };

  const sumTotalPrice = cartItems?.reduce(
    (acc, curr) => acc + curr?.totalPrice,
    0
  );

  let data = [
    { title: "Subtotal", value: 300 },
    { title: "Frete", value: "free" },
    { title: "Taxa", value: 20 },
  ];

  return (
    <>
      <Container sx={{ marginY: 10 }}>
        <Grid
          container
          direction="row"
          sx={{
            gap: 4,
            justifyContent: "space-between",
          }}
        >
          {/* Produtos */}
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <Box
              sx={{
                borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)",
                paddingY: 1,
              }}
            >
              <Typography variant="h5" sx={{ textAlign: isMobile && "center" }}>
                Seu carrinho
              </Typography>
            </Box>
            {cartItems?.map((item) => (
              <Box
                key={item?._id}
                sx={{
                  marginY: 3,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <img
                    src={item?.image}
                    alt={item?.name}
                    height={150}
                    width={150}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    paddingLeft: 2,
                  }}
                >
                  <Typography variant="h6">{item?.name}</Typography>
                  <Typography variant="body1">{item?.color}</Typography>
                  <Typography variant="body1">{item?.size}</Typography>
                  <Typography variant="body2">R$ {item?.totalPrice}</Typography>
                </Box>
                <Box>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(
                          item?._id,
                          (quantities[item?._id] || 1) - 1
                        )
                      }
                      disabled={(quantities[item?._id] || 1) <= 1}
                    >
                      <Remove />
                    </IconButton>
                    <TextField
                      value={quantities[item?._id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(
                          item?._id,
                          parseInt(e.target.value, 10) || 1
                        )
                      }
                      type="number"
                      inputProps={{ min: 1 }}
                      sx={{
                        width: "3rem",
                        display: "flex",
                        alignItems: "center",
                        "& input": {
                          textAlign: "center",
                        },
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                          {
                            WebkitAppearance: "none",
                            margin: 0,
                          },
                      }}
                      InputProps={{
                        min: 1,
                        style: {
                          textAlign: "center",
                          MozAppearance: "textfield",
                        },
                      }}
                    />
                    <IconButton
                      onClick={() =>
                        handleQuantityChange(
                          item?._id,
                          (quantities[item?._id] || 1) + 1
                        )
                      }
                    >
                      <Add />
                    </IconButton>
                  </Box>
                </Box>
                <Box>
                  <Trash2
                    strokeWidth={1}
                    onClick={() =>
                      removeOrderItemFromLocalStorageHandler(item?._id)
                    }
                    color={"#71747E"}
                  />
                </Box>
              </Box>
            ))}
          </Grid>

          {/* Resumo */}
          <Grid
            item
            xs={12}
            sm={12}
            md={4}
            lg={4}
            sx={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", padding: 4 }}
          >
            <Box sx={{ marginBottom: 6 }}>
              <Typography variant="h4" sx={{ textAlign: isMobile && "center" }}>
                Resumo
              </Typography>
            </Box>
            <Box sx={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)" }}>
              {data.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginY: 3,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: "#71747E", fontWeight: "bold" }}
                  >
                    {item?.title}
                  </Typography>
                  <Typography variant="h6">
                    R$ {item.title === "Subtotal" ? sumTotalPrice : item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginY: 3,
              }}
            >
              <Typography variant="body1" sx={{ color: "#71747E" }}>
                Total
              </Typography>
              <Typography variant="h6">
                R$ {sumTotalPrice + data[2].value}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                href="/order-payment"
                variant="primary"
                component={Link}
                sx={{ width: "100%", marginY: 2 }}
              >
                Checkout
              </Button>
              <Link to={"/"} style={{ textDecorationLine: "underline" }}>
                Continuar comprando
              </Link>
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
    </>
  );
}
