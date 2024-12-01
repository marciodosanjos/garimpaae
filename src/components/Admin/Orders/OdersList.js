import { useDispatch, useSelector } from "react-redux";
import OrdersStats from "./OrdersStatistics";
import { useState } from "react";
import { fetchOrdersAction } from "../../../redux/slices/orders/ordersSlice";
import { Button, Grid } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import translateLabels from "../../../utils/translateLabels";
import LoadingComponent from "../../LoadingComp/LoadingComponent";

export default function OrdersList() {
  const dispatch = useDispatch();

  useState(() => {
    dispatch(fetchOrdersAction());
  }, []);

  const { orders, error } = useSelector((state) => state?.orders);

  const ordersData = orders?.data;

  return (
    <>
      <Grid
        container
        direction="row"
        sx={{
          padding: 3,
          gap: 4,
          justifyContent: "center",
          //          border: "1px solid black",
        }}
      >
        {/* order stats */}
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <OrdersStats />
        </Grid>

        {/* order list */}
        {!ordersData ? (
          <LoadingComponent />
        ) : (
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead
                  sx={{ borderBottom: "1px solid grey", position: "relative" }}
                >
                  <TableCell
                    sx={{
                      borderBottom: "1px solid grey",
                      fontWeight: "bold !important",
                    }}
                  >
                    Pedidos recentes
                  </TableCell>
                  <Button
                    component={Link}
                    to="/admin/orders"
                    variant="primary"
                    sx={{
                      borderBottom: "1px solid grey",
                      position: "absolute",
                      right: 10,
                      top: 10,
                    }}
                  >
                    Ver todos
                  </Button>
                </TableHead>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        borderBottom: "1px solid grey",
                        fontWeight: "bold !important",
                      }}
                    >
                      N. do pedido
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: "bold !important",
                        borderBottom: "1px solid grey",
                      }}
                    >
                      Data do pedido
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontWeight: "bold !important",
                        borderBottom: "1px solid grey",
                        fontStyle: "bold",
                      }}
                    >
                      Itens
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        borderBottom: "1px solid grey",
                        fontWeight: "bold !important",
                      }}
                    >
                      Preço total
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        borderBottom: "1px solid grey",
                        fontWeight: "bold !important",
                      }}
                    >
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ordersData?.slice(0, 9).map((row) => (
                    <TableRow
                      key={row.orderNumber}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.orderNumber}
                      </TableCell>
                      <TableCell align="right">
                        {row.createdAt.slice(0, 10)}
                      </TableCell>
                      <TableCell align="right">
                        {row.orderItems.length}
                      </TableCell>
                      <TableCell align="right"> R$ {row.totalPrice}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Button
              component={Link}
              to="/admin/orders"
              variant="primary"
              sx={{
                width: "100%",
                marginTop: 3,
              }}
            >
              Ver todos
            </Button>
          </Grid>
        )}
      </Grid>
    </>
  );
}
