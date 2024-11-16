import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../redux/slices/users/usersSlice";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "admin3@gmail.com",
    password: "43221",
  });

  const { email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Preencha os dados");
      return;
    }
    dispatch(loginUserAction({ email, password }));
    if (localStorage.getItem("cartItems")) {
      navigate("/shopping-cart");
      return;
    }
  };

  const { loading, userInfo, error } = useSelector(
    (state) => state?.users?.userAuth
  );

  useEffect(() => {
    if (userInfo?.userFound && !localStorage.getItem("cartItems")) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <Container fixed>
      <Grid container>
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
            gap: 3,
            marginY: "4rem",
          }}
        >
          <div className="logo">
            <span
              style={{
                textTransform: "upperCase",
                fontWeight: 800,
              }}
            >
              Garimpa Aê
            </span>
          </div>
          <form onSubmit={onSubmitHandler}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <TextField
                id="user"
                label="Usuário"
                name="email"
                variant="outlined"
                value={email}
                onChange={onChangeHandler}
                sx={{
                  // Cor da borda quando focado
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "secondary.dark",
                    },
                  },
                  // Cor do label quando focado
                  "& .MuiInputLabel-root": {
                    color: "gray",
                    "&.Mui-focused": {
                      color: "secondary.dark",
                    },
                  },
                }}
              />
              <TextField
                id="password"
                label="Senha"
                name="password"
                type="password"
                variant="outlined"
                value={password}
                onChange={onChangeHandler}
                sx={{
                  // Cor da borda quando focado
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "secondary.dark",
                    },
                  },
                  // Cor do label quando focado
                  "& .MuiInputLabel-root": {
                    color: "gray",
                    "&.Mui-focused": {
                      color: "secondary.dark",
                    },
                  },
                }}
              />
              {loading ? (
                <LoadingComponent />
              ) : (
                <Button variant="primary" type="submit" sx={{ width: "100%" }}>
                  Login
                </Button>
              )}
            </Box>
          </form>
          {error?.message && (
            <Box sx={{ width: "50%" }}>
              <Alert severity="error" icon={false} sx={{ textAlign: "center" }}>
                Erro no login. Insira os dados novamente e tente outra vez
              </Alert>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
