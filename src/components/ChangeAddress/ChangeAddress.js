import { Box, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getUserProfileAction } from "../../redux/slices/users/usersSlice";
import AddShippingAddress from "../Users/Forms/AddShippingAddress";
import TitleUserProfileSection from "../TitleUserProfileSection/TitleUserProfileSection";

export default function ChangeAddress() {
  const dispatch = useDispatch();

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
          <TitleUserProfileSection
            title={"Checkout"}
            description={
              "Este é seu endereço atual na nossa loja. Se quiser alterá-lo, basta inserir os novos dados no formulário abaixo."
            }
            alignment={"flex-start"}
          />
        </Box>
        <Box>
          <AddShippingAddress buttonText={"Atualizar endereço"} />
        </Box>
      </Grid>
    </Grid>
  );
}
