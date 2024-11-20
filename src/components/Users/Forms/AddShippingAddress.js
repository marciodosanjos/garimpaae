import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfileAction,
  updateUserShippingAdressAction,
} from "../../../redux/slices/users/usersSlice";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import { Box, Button, Grid } from "@mui/material";
import FormTextField from "../../FormTextField/FormTextField";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

const AddShippingAddress = ({ buttonText }) => {
  const dispatch = useDispatch();
  const [hasAddress, setHasAddress] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  const { loading, error, profile } = useSelector((state) => state?.users);
  const user = profile?.data;

  console.log(user);

  useEffect(() => {
    if (user) {
      Object.entries(user?.shippingAddress).map(([key, value], index) => {
        if (!value) {
          setHasAddress(false);
        }
      });
    }
  }, [user]);

  const [formData, setFormData] = useState({
    firstName: user?.shippingAddress?.firstName,
    lastName: user?.shippingAddress?.lastName,
    address: user?.shippingAddress?.address,
    city: user?.shippingAddress?.city,
    country: user?.shippingAddress?.country,
    region: user?.shippingAddress?.region,
    postalCode: user?.shippingAddress?.postalCode,
    phone: user?.shippingAddress?.phone,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Atualiza apenas o campo correspondente
    }));
  };

  //onsubmit
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserShippingAdressAction({ ...formData }));
    setIsUpdated(true);
  };

  const translatedValues = (value) => {
    switch (value) {
      case "firstName":
        return "Nome";
      case "lastName":
        return "Sobrenome";
      case "address":
        return "Endereço";
      case "city":
        return "Cidade";
      case "country":
        return "País";
      case "region":
        return "Estado";
      case "postalCode":
        return "CEP";
      case "phone":
        return "Telefone";
      default:
        return "Outro";
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <Grid
        xs={12}
        sm={12}
        lg={12}
        xl={12}
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-betwwen",
          alignItems: "space-betwwen",
          gap: 1,
          flexWrap: "wrap",
          marginY: 2,
          width: "100%",
          //border: "1px solid black",
        }}
      >
        {Object.entries(formData).map(([key, value], index) => (
          <Grid
            item
            xs={12}
            sm={12}
            md={12}
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-betwwen",
              alignItems: "space-betwwen",
              flexWrap: "wrap",
              width: "100%",

              //border: "1px solid black",
            }}
          >
            <FormTextField
              id={key.toLowerCase()}
              name={key}
              label={translatedValues(key)}
              value={value || ""}
              onChange={onChange}
            />
          </Grid>
        ))}

        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {loading ? (
            <LoadingComponent />
          ) : (
            <Button
              variant="primary"
              sx={{ width: "100%" }}
              type="submit"
              onClick={onSubmit}
            >
              {buttonText}
            </Button>
          )}
          {error && <p>{error?.message}</p>}
          {isUpdated && (
            <Alert
              icon={<CheckIcon fontSize="inherit" />}
              sx={{ marginY: 2 }}
              severity="success"
            >
              Endereço atualizado com sucesso
            </Alert>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default AddShippingAddress;
