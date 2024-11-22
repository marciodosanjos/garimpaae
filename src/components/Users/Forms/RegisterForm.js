import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { registrationUserAction } from "../../../redux/slices/users/usersSlice";
import { Alert, Box, Button, Container, Grid, TextField } from "@mui/material";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import CheckIcon from "@mui/icons-material/Check";
import TitleUserProfileSection from "../../TitleUserProfileSection/TitleUserProfileSection";

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { email, password, fullname } = formData;
  const { loading } = useSelector((state) => state?.users);

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "" || fullname === "") {
      alert("Preencha os dados");
      return;
    }

    try {
      dispatch(registrationUserAction({ email, password, fullname })).then(
        (res) => {
          if (res?.error?.message) {
            setIsCreated(false);
            setError(true);
            setTimeout(() => {
              navigate("/register");
            }, 2000);
          } else {
            setIsCreated(true);
            setError(false);
            setTimeout(() => {
              setIsCreated(false);
              navigate("/");
            }, 5000);
          }
        }
      );
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

          <TitleUserProfileSection
            title={"Novo por aqui?"}
            description={
              "Inscreva-se e tenha acesso aos melhores produtos hype"
            }
            alignment={"center"}
          />
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
                id="name"
                label="Nome completo"
                name="fullname"
                variant="outlined"
                value={fullname}
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
                id="user"
                label="Email"
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
                  Criar usuário
                </Button>
              )}
            </Box>
          </form>
          {isCreated && (
            <Alert
              icon={<CheckIcon fontSize="inherit" />}
              sx={{ marginY: 2 }}
              severity="success"
            >
              Conta criada com sucesso. Você será redirecionado para a página
              inicial em 5 segundos
            </Alert>
          )}
          {error && (
            <Box sx={{ width: "50%" }}>
              <Alert severity="error" icon={false} sx={{ textAlign: "center" }}>
                Parece que já existe um usuário com este email. Tente usar outro
                e-mail
              </Alert>
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default RegisterForm;
