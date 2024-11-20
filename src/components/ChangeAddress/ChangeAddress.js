import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useIsMobile from "../../hooks/useIsMobile";
import { useEffect, useState } from "react";
import { getUserProfileAction } from "../../redux/slices/users/usersSlice";
import AddShippingAddress from "../Users/Forms/AddShippingAddress";

export default function ChangeAddress() {
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [isLogged, setIsLogged] = useState(true);

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  return (
    <Grid
      container
      direction="row"
      sx={{ justifyContent: "space-between", gap: 1 }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
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
            Este é seu endereço atual na nossa loja. Se quiser alterá-lo, basta
            inserir os novos dados no formulário abaixo.
          </Typography>
        </Box>
        <Box>
          <AddShippingAddress buttonText={"Atualizar endereço"} />
        </Box>
      </Grid>
    </Grid>
  );
}
