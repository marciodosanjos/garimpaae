import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../redux/slices/users/usersSlice";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const { loading, error } = useSelector((state) => state?.users?.userAuth);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Preencha os dados");
      return;
    }

    try {
      dispatch(loginUserAction({ email, password }));

      if (error) {
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

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
                Senha ou password errado. os dados novamente e tente outra vez.
              </Alert>
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography variant="h6">É novo por aqui?</Typography>
            <Link style={{ textDecoration: "underline" }} to={"/register"}>
              Crie sua conta rapidamente
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
