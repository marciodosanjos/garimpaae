import { Box, Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import FormTextField from "../FormTextField/FormTextField";
import { useDispatch, useSelector } from "react-redux";
import translateLabels from "../../utils/translateLabels";
import { updateUserLoginData } from "../../redux/slices/users/usersSlice";
import LoadingComponent from "../LoadingComp/LoadingComponent";
import CheckIcon from "@mui/icons-material/Check";
import Alert from "@mui/material/Alert";
import TitleUserProfileSection from "../TitleUserProfileSection/TitleUserProfileSection";
import DOMPurify from "dompurify";

export default function ChangePassword() {
  const [isUpdated, setIsUpdated] = useState(false);

  //select store data
  const { error, loading, profile } = useSelector((state) => {
    return state?.users;
  });

  useEffect(() => {
    if (profile?.data?.email) {
      setFormData((prev) => ({
        ...prev,
        username: profile.data.email,
      }));
    }
  }, [profile]);

  const [formData, setFormData] = useState({
    username: profile?.data?.email || "",
    password: "",
  });
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const { username, password } = formData;

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const sanitizedUsername = DOMPurify.sanitize(username);
    const sanitizedPassword = DOMPurify.sanitize(password);

    if (sanitizedUsername === "" || sanitizedPassword === "") {
      return;
    }

    dispatch(
      updateUserLoginData({
        email: sanitizedUsername,
        password: sanitizedPassword,
      })
    );
    setIsUpdated(true);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <TitleUserProfileSection
            title={" Seus dados de acesso"}
            description={
              "Altere aqui seus dados de acesso, inserindo os novos dados no formulário abaixo"
            }
            alignment={"flex-start"}
          />

          <form style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {Object.entries(formData).map(([key, value], index) => (
              <FormTextField
                id={key.toLowerCase()}
                name={key}
                label={translateLabels(key)}
                value={value || ""}
                onChange={handleOnChange}
                type="password"
              />
            ))}
            <Button type="submit" variant="primary" onClick={handleOnSubmit}>
              Atualizar dados
            </Button>
          </form>
          {loading && <LoadingComponent />}
          {isUpdated && (
            <Alert
              icon={<CheckIcon fontSize="inherit" />}
              sx={{ marginY: 2 }}
              severity="success"
            >
              Login atualizado com sucesso
            </Alert>
          )}
          {error && (
            <Alert sx={{ marginY: 2 }} severity="error">
              {error?.message === "Invalid token"
                ? "Faça o login novamente e tente outra vez"
                : "Verfique suas informações e tente novamente"}
            </Alert>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}
