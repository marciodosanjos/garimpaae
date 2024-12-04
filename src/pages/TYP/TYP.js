import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCartItemsAction } from "../../redux/slices/cart/cartSlice";
import { getUserProfileAction } from "../../redux/slices/users/usersSlice";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import Teaser from "../../components/Teaser/Teaser";

export default function ThanksForOrdering() {
  //const location = useLocation();
  //const { sumTotalPrice } = location.state;
  const isMobile = useIsMobile();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItemsAction());
  }, [dispatch]);

  //---get cart items from store---
  const { cartItems } = useSelector((state) => state?.cart);
  const { profile } = useSelector((state) => state?.users);

  const ordersLength = profile?.data?.orders?.length;

  const lastOrder = profile?.data?.orders[ordersLength - 1];
  console.log(lastOrder);

  //calculate total price
  const sumTotalPrice = cartItems?.reduce((acc, curr) => {
    return acc + curr?.totalPrice;
  }, 0);

  //taxta

  const frete = 20;

  //user address
  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  let data = [
    { title: "Subtotal", value: 300 },
    { title: "Frete", value: 0 },
    { title: "Taxa", value: 20 },
  ];

  return (
    <>
      <Container fixed>
        <Grid
          container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginY: "4rem",
            gap: 4,
          }}
        >
          {/* Thank you message */}
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            lg={12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography
              variant="body1"
              sx={{
                border: "1px solid black",
                width: "auto",
                color: "black",
                textAlign: "center",
                paddingX: "1rem",
                borderRadius: 1,
              }}
            >
              Pagamento confirmado
            </Typography>
            <Typography variant="h1" sx={{ fontWeight: "bold" }}>
              Agradecemos o seu pedido
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              Estamos processando sua compra. Aguarde e enviaremos sua
              confirmação por WhatsApp em breve!
            </Typography>
          </Grid>

          {/* Summary card */}
          <Grid
            item
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              padding: 4,
              width: "50%",
              //border: "1px solid black",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                textAlign: "center",
                marginBottom: isMobile && "2rem",
              }}
            >
              Items na sua compra
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex",
                }}
              >
                {lastOrder?.orderItems?.map((product, index) => (
                  <Box key={index}>
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
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Typography>
                Aqui está o número do pedido. Guarde-o com você para casos de
                dúvidas
              </Typography>
              <Typography
                sx={{
                  border: "1px solid black",
                  width: "auto",
                  color: "black",
                  textAlign: "center",
                  paddingX: "1rem",
                  borderRadius: 1,
                }}
              >
                {lastOrder?.orderNumber}
              </Typography>
            </Box>
            <Box sx={{ borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)" }}>
              {data?.map((item, index) => (
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
                    R${" "}
                    {item.title === "Subtotal"
                      ? lastOrder?.totalPrice
                      : item.value}
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
                R$ {lastOrder?.totalPrice + data[2]?.value}
              </Typography>
            </Box>
            <Button
              to="/"
              variant="primary"
              component={Link}
              sx={{ width: "100%", marginY: 2 }}
            >
              Continuar comprando
            </Button>
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
