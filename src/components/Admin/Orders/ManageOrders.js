import { useDispatch, useSelector } from "react-redux";
import OrdersStats from "./OrdersStatistics";
import { useState } from "react";
import {
  fetchOrdersAction,
  updateOrderAction,
} from "../../../redux/slices/orders/ordersSlice";
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
import TitleUserProfileSection from "../../TitleUserProfileSection/TitleUserProfileSection";
import FormSelectField from "../../FormSelectField/FormSelectField";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";

export default function OrdersList() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);

  useState(() => {
    dispatch(fetchOrdersAction());
  }, []);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const { orders, error } = useSelector((state) => state?.orders);
  const ordersData = orders?.data || [];
  console.log(ordersData[1]);

  const orderStatusItems = ["shipped", "pending", "processing"];
  const [orderStatus, setOrderStatus] = useState("");

  //handlers
  const handleOnChange = async (e, orderId) => {
    //setOrderStatus(e.target.event);
    const newStatus = e.target.value;

    try {
      const result = await dispatch(
        updateOrderAction({ id: orderId, status: orderStatus })
      );

      if (updateOrderAction.fulfilled.match(result)) {
        setSnackbarOpen(true);
        setErrorMessage("");
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 6000);
      }

      if (updateOrderAction.rejected.match(result)) {
        console.log("Erro ao adicionar produto:", result.payload);
        setErrorMessage("Erro ao atualizar o status");
        setTimeout(() => {
          setErrorMessage("");
        }, 6000);
      }
    } catch (error) {
      console.log("Erro inesperado:", error);
      setErrorMessage("Erro inesperado");
    }
  };

  return (
    <>
      {error && <p>{error?.message}</p>}
      <Grid
        container
        direction="row"
        sx={{
          padding: 3,
          gap: 4,
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <TitleUserProfileSection
            title={"Pedidos"}
            description={"Administre seus produtos aqui"}
          />
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
                  {ordersData?.map((row, index) => (
                    <TableRow
                      key={index}
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
                      <TableCell align="right">
                        <FormSelectField
                          arr={orderStatusItems || []}
                          title={"Status"}
                          compWidth="10rem"
                          onChange={(e) => handleOnChange(e, row._id)}
                          value={orderStatus ? orderStatus : row.status}
                          name="status"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            {isSnackbarOpen && (
              <SuccessMsg
                msg={"Status atualizado com sucesso"}
                isOpened={isSnackbarOpen}
                onClose={handleSnackbarClose}
              />
            )}
            {errorMessage.includes("Erro") && (
              <SuccessMsg
                msg={errorMessage}
                isOpened={true} // Garanta que o erro seja exibido
                onClose={() => setErrorMessage("")} // Limpe a mensagem de erro ao fechar
              />
            )}
          </Grid>
        )}
      </Grid>
    </>
  );
}
