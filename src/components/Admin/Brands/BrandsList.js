import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TitleUserProfileSection from "../../TitleUserProfileSection/TitleUserProfileSection";
import AdminTable from "../../Table/AdminTable";
import useIsMobile from "../../../hooks/useIsMobile";
import { Grid } from "@mui/material";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import { fetchColorsAction } from "../../../redux/slices/colors/colorsSlice";
import {
  deleteBrandAction,
  fetchBrandsAction,
} from "../../../redux/slices/brands/brandsSlice";

export default function BrandsList() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const ismobile = useIsMobile();
  const dispatch = useDispatch();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [isDeleted, isSnackbarOpen, dispatch]);

  const { brands } = useSelector((state) => state?.brands);

  const [brandsData, setBrandsData] = useState([]);

  useEffect(() => {
    if (brands) {
      const brandsNames = brands?.data?.map((item) => ({
        colorName: item.name,
        _id: item._id,
      }));
      setBrandsData(brandsNames);
    }
  }, [brands]);

  const tableHeadItems = ["Marca", "Ação"];

  //delete category handler
  const deleteHandler = async (id) => {
    try {
      const result = await dispatch(deleteBrandAction(id));

      if (deleteBrandAction.fulfilled.match(result)) {
        console.log("Cor deletada");
        setIsDeleted(true);
        setSnackbarOpen(true);
        setErrorMessage("");
        dispatch(fetchColorsAction());
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 6000);
      }

      if (deleteBrandAction.rejected.match(result)) {
        console.log("Erro ao deletar cor:", result.payload);
        setIsDeleted(false);
        setErrorMessage("Erro ao deletar cor");
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
    <Grid
      container
      direction="row"
      sx={{
        padding: 3,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <TitleUserProfileSection
          title={"Marcas"}
          description={"Confira as marcas cadastradas na loja"}
          alignment={ismobile && "center"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <AdminTable
          title={"Lista de marcas"}
          tableHeadItems={tableHeadItems}
          tableValues={brandsData}
          buttonText={"Criar marca"}
          href={"/admin/add-brand"}
          fn={deleteHandler}
          path={"add-brand"}
        />
        {isDeleted && (
          <SuccessMsg
            msg={"Marca deletada com sucesso"}
            isOpened={isSnackbarOpen}
            onClose={handleSnackbarClose}
          />
        )}
        {errorMessage.includes("Erro") && (
          <SuccessMsg
            msg={errorMessage}
            isOpened={true}
            onClose={() => setErrorMessage("")}
          />
        )}
      </Grid>
    </Grid>
  );
}
