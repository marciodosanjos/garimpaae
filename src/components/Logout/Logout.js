import { Button, Grid } from "@mui/material";
import TitleUserProfileSection from "../TitleUserProfileSection/TitleUserProfileSection";
import { useDispatch } from "react-redux";
import { logoutUserAction } from "../../redux/slices/users/usersSlice";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logoutUserAction());
    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  return (
    <Grid container>
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TitleUserProfileSection
          title={"Logout"}
          description={"Clique no botão abaixo para encerrar sua sessão"}
          alignment={"flex-start"}
        />
        <Button variant="primary" onClick={handleLogout}>
          Encerrar sessão
        </Button>
      </Grid>
    </Grid>
  );
}
