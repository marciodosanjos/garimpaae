import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";
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

  const { orders, error } = useSelector((state) => state?.orders);

  const { userFound } = JSON.parse(localStorage.getItem("userInfo"));

  const userOrders = orders?.data?.find(
    (item, index) => item?.user._id === userFound?._id
  );

  const orderItems = userOrders?.orderItems;

  const data = [
    {
      name: "Nike Dunk Low",
      totalPrice: "2023",
      image:
        "https://sneakersul.com.br/cdn/shop/files/nike-sb-dunk-low-ebay-1.webp?v=1711918943",
      status: "Pendente",
      quantity: 2,
      idItem: "666b8aa29f556b261822e564",
    },
    {
      name: "Nike Dunk Low",
      totalPrice: "2023",
      image:
        "https://sneakersul.com.br/cdn/shop/files/nike-sb-dunk-low-ebay-1.webp?v=1711918943",
      status: "Pendente",
      quantity: 2,
      idItem: "666b8aa29f556b261822e564",
    },
  ];

  return (
    <>
      {/* Produtos */}
      <Grid item xs={12} sm={12} md={12} lg={12}>
        <Box
          sx={{
            //borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)",
            paddingY: 1,
          }}
        >
          <Typography variant="h5" sx={{ textAlign: isMobile && "center" }}>
            Minhas compras
          </Typography>
        </Box>
        {data?.map((item) => (
          <Box
            key={item?._id}
            sx={{
              marginY: 3,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "0.5px solid rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box sx={{ marginRight: isMobile && 2 }}>
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
                  Status: {item?.status}
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
          </Box>
        ))}
      </Grid>
    </>
  );
}
