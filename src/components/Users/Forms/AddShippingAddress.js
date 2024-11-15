import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfileAction,
  updateUserShippingAdressAction,
} from "../../../redux/slices/users/usersSlice";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import { Box, Button, TextField } from "@mui/material";
import FormTextField from "../../FormTextField/FormTextField";

const AddShippingAddress = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProfileAction());
  }, [dispatch]);

  const { loading, error, profile } = useSelector((state) => state?.users);
  const user = profile?.data;

  const [formData, setFormData] = useState({
    firstName: user?.shippingAddress?.firstName,
    lastName: "",
    address: "",
    city: "",
    country: "",
    region: "",
    postalCode: "",
    phone: "",
  });

  console.log(formData);

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
        return "Região";
      case "postalCode":
        return "CEP";
      case "phone":
        return "Telefone";
      default:
        return "Outro";
    }
  };

  return (
    <>
      {/* shipping details */}
      {user?.hasShippingAddress ? (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900">
            Endereço de envio atual
          </h3>

          <p className="mt-1 text-sm text-gray-500">Revise suas informações </p>
          <div>
            <p className="mt-1 text-sm text-gray-500">
              First Name : {user?.shippingAddress?.firstName}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Last Name : {user?.shippingAddress?.lastName}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Address : {user?.shippingAddress?.address}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              City : {user?.shippingAddress?.city}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Country : {user?.shippingAddress?.country}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              phone : {user?.shippingAddress?.phone}
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 1,
              flexWrap: "wrap",
              marginY: 2,
              width: "100%",
              //border: "1px solid black",
            }}
          >
            {Object.entries(formData).map(([key, value], index) => (
              <FormTextField
                key={index}
                id={key.toLowerCase()}
                name={key}
                label={translatedValues(key)}
                value={value || ""}
                onChange={onChange}
                sx={{
                  flexGrow: key === "address" ? 1 : 0, // "address" ocupa todo o espaço disponível
                  flexBasis: key === "address" ? "100%" : "calc(50% - 16px)", // 100% para address, 50% para os demais
                  minWidth: key === "address" ? "0" : "300px", // Remove limite para address
                }}
              />
            ))}
          </Box>

          {loading ? (
            <LoadingComponent />
          ) : (
            <Button
              variant="primary"
              sx={{ width: "100%" }}
              type="submit"
              onClick={onSubmit}
            >
              Adicionar endereço
            </Button>
          )}
          {error && <p>{error?.message}</p>}
        </form>
      )}
    </>
  );
};

export default AddShippingAddress;
