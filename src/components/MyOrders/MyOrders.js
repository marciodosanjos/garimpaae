import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersAction } from "../../redux/slices/orders/ordersSlice";
import { Link } from "react-router-dom";
import useIsMobile from "../../hooks/useIsMobile";

export default function MyOrders() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, [dispatch]);

  const { orders } = useSelector((state) => state?.orders);

  const { userFound } = JSON.parse(localStorage.getItem("userInfo"));

  const userOrders = orders?.data?.filter(
    (item, index) => item?.user?._id === userFound?._id
  );

  const toDate = (value) => {
    const newDate = new Date(value);
    return `${newDate.getDate()}-${
      newDate.getMonth() + 1
    }-${newDate.getFullYear()}`;
  };

  return (
    <>
      {/* Produtos */}
      <Grid container item xs={12} sm={12} md={12} lg={12}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{
            //borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)",
            paddingY: 1,
          }}
        >
          <Typography variant="h5" sx={{ textAlign: isMobile && "center" }}>
            Minhas compras
          </Typography>
        </Grid>
        {userOrders?.length > 0 ? (
          userOrders?.map((item, index) => (
            <Grid
              key={index}
              container
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              sx={{
                marginY: 3,
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 2,
              }}
            >
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography variant="h6">Pedido {index + 1}</Typography>
                <Typography variant="body2" sx={{ color: "grey" }}>
                  Data: {toDate(item.createdAt)}
                </Typography>
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: 2,
                  borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)",
                }}
              >
                <Box sx={{ marginRight: isMobile && 2 }}>
                  <img
                    src={
                      item?.image
                        ? item?.image
                        : "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/1022px-Placeholder_view_vector.svg.png?20220519031949"
                    }
                    alt={item?.name}
                    height={150}
                    width={150}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <Box>
                    <Typography variant="h6">{item?.name}</Typography>
                    <Typography variant="body1">
                      Quantidade: {item?.quantity}
                    </Typography>
                    <Typography variant="body2">
                      Preço total: R$ {item?.totalPrice}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      sx={{ color: "grey", textDecoration: "underline" }}
                    >
                      Status:{" "}
                      {item?.status === "pending"
                        ? "Pendente"
                        : item?.status === "shipped"
                        ? "Enviado"
                        : item?.status === "processing"
                        ? "Processando"
                        : item?.status}
                    </Typography>
                  </Box>
                  <Box>
                    <Button
                      component={Link}
                      to={`/products/${item?.idItem}`}
                      variant="primary"
                      sx={{ textAlign: "center" }}
                    >
                      {isMobile ? "Ver" : "Ver item"}
                    </Button>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          ))
        ) : (
          <Typography>Não há pedidos</Typography>
        )}
      </Grid>
    </>
  );
}
