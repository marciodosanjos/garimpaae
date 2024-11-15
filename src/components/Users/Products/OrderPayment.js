import { useDispatch, useSelector } from "react-redux";
import AddShippingAddress from "../Forms/AddShippingAddress";
import { useEffect } from "react";
import { getCartItemsAction } from "../../../redux/slices/cart/cartSlice";
import { Link, useLocation } from "react-router-dom";
import { placeOrderAction } from "../../../redux/slices/orders/ordersSlice";
import { getUserProfileAction } from "../../../redux/slices/users/usersSlice";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import useIsMobile from "../../../hooks/useIsMobile";

export default function OrderPayment() {
  const isMobile = useIsMobile();
  //get data from location
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItemsAction());
  }, [dispatch]);

  //---get cart items from store---
  const { cartItems } = useSelector((state) => state?.cart);

  //---get total price from cart items store ---
  const sumTotalPrice = cartItems?.reduce(
    (acc, curr) => acc + curr?.totalPrice,
    0
  );

  //create order submit handler
  //  // const createOrderSubmitHandler = (e) => {
  //     e.preventDefault();
  //   };

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  const { profile } = useSelector((state) => state?.users);
  const userShippingAddress = profile?.data?.shippingAddress;

  //place order action
  const placeOrderHandler = () => {
    dispatch(
      placeOrderAction({
        orderItems: cartItems,
        shippingAddress: userShippingAddress,
        totalPrice: sumTotalPrice,
      })
    );
    //empty cart items
    localStorage.removeItem("cartItems");
  };

  const { loading: orderLoading, error: orderErr } = useSelector(
    (state) => state?.orders
  );

  let data = [
    { title: "Subtotal", value: 300 },
    { title: "Frete", value: "free" },
    { title: "Taxa", value: 20 },
  ];

  return (
    <Container fixed sx={{ marginY: !isMobile && "8rem" }}>
      <>
        {/* Shipping Address */}
        <Grid
          container
          direction="row"
          sx={{ justifyContent: "space-between", gap: 1 }}
        >
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                variant="h3"
                sx={{
                  textAlign: isMobile && "center",
                  marginBottom: isMobile && "2rem",
                }}
              >
                Checkout
              </Typography>
              <Typography
                variant="body"
                sx={{
                  textAlign: isMobile && "center",
                  marginBottom: isMobile && "2rem",
                }}
              >
                Adicione seu endereço de envio, para podermos enviar o produto
                para você
              </Typography>
            </Box>
            <AddShippingAddress />
          </Grid>

          {/* Summary card */}
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              padding: 4,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: isMobile && "center",
                marginBottom: isMobile && "2rem",
              }}
            >
              Items no seu carrinho
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                }}
              >
                {cartItems?.map((product, index) => (
                  <Box>
                    <img
                      src={product?.image}
                      alt={product?.name}
                      height={60}
                      width={60}
                      style={{ borderRadius: "50%" }}
                    />
                  </Box>
                ))}
              </Box>
              <Button
                component={Link}
                to={"/shopping-cart"}
                sx={{
                  border: "1px solid #71747E",
                  color: "#71747E",
                  width: "auto",
                  height: "3rem",
                }}
              >
                Editar carrinho
              </Button>
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
              <Typography
                variant="body1"
                sx={{ color: "#71747E", fontWeight: "bold" }}
              >
                Total
              </Typography>
              <Typography variant="h6">
                R$ {sumTotalPrice + data[2].value}
              </Typography>
            </Box>
            <Button
              to="/order-payment"
              variant="primary"
              component={Link}
              sx={{ width: "100%", marginY: 2 }}
              onClick={placeOrderHandler}
            >
              Finalizar compra
            </Button>
            {orderLoading && <LoadingComponent />}
            <>{orderErr && <p>{orderErr?.message}</p>}</>
          </Grid>
        </Grid>
      </>
    </Container>
  );
}
