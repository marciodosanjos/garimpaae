import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrdersStatsAction } from "../../../redux/slices/orders/ordersSlice";
import { Box, Grid, Typography } from "@mui/material";
import translateLabels from "../../../utils/translateLabels";
import LoadingComponent from "../../LoadingComp/LoadingComponent";

export default function OrdersStats() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(OrdersStatsAction());
  }, [dispatch]);

  const { stats } = useSelector((state) => state?.orders);

  const obj = stats?.data[0];

  console.log(obj);

  return (
    <Grid
      container
      item
      direction="row"
      sx={{ justifyContent: "space-between", gap: 3 }}
    >
      {!obj ? (
        <LoadingComponent />
      ) : (
        obj &&
        Object.entries(obj).map(([key, value], index) => {
          if (key === "totalSales" || key === "avgSales" || key === "maxSale") {
            return (
              <Grid
                key={index}
                item
                sx={{
                  backgroundColor: "#ffff",
                  width: "auto",
                  height: "6rem",
                  borderRadius: "0.5rem",
                  padding: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexGrow: 1,
                  flexShrink: 1,
                }}
              >
                <Box>
                  <Typography variant="h4">{translateLabels(key)}</Typography>
                  <Typography>este mês</Typography>
                </Box>
                <Box>
                  <Typography variant="h4">{Math.floor(value)}</Typography>
                </Box>
              </Grid>
            );
          }
          return null;
        })
      )}
    </Grid>
  );
}
