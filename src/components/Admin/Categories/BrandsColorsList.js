import LoadingComponent from "../../LoadingComp/LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import TitleUserProfileSection from "../../TitleUserProfileSection/TitleUserProfileSection";
import AdminTable from "../../Table/AdminTable";
import useIsMobile from "../../../hooks/useIsMobile";
import { Grid } from "@mui/material";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import {
  deleteColorAction,
  fetchColorsAction,
} from "../../../redux/slices/colors/colorsSlice";

export default function ManageCategories() {
  const [isDeleted, setIsDeleted] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const ismobile = useIsMobile();
  const dispatch = useDispatch();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    dispatch(fetchColorsAction());
  }, [isDeleted, isSnackbarOpen, dispatch]);

  const { colors } = useSelector((state) => state?.colors);

  const [colorsData, setColorsData] = useState([]);

  useEffect(() => {
    if (colors) {
      const colorNames = colors?.data?.map((item) => ({
        colorName: item.name,
        _id: item._id,
      }));
      setColorsData(colorNames);
    }
  }, [colors]);

  const tableHeadItems = ["Cor", "Ação"];

  //delete category handler
  const deleteColorHandler = async (id) => {
    try {
      const result = await dispatch(deleteColorAction(id));

      if (deleteColorAction.fulfilled.match(result)) {
        console.log("Cor deletada");
        setIsDeleted(true);
        setSnackbarOpen(true);
        setErrorMessage("");
        dispatch(fetchColorsAction());
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 6000);
      }

      if (deleteColorAction.rejected.match(result)) {
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
          title={"Cores"}
          description={"Confira as cores cadastradas na loja"}
          alignment={ismobile && "center"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <AdminTable
          title={"Lista de cores"}
          tableHeadItems={tableHeadItems}
          tableValues={colorsData}
          buttonText={"Criar cor"}
          href={"/admin/add-color"}
          fn={deleteColorHandler}
          path={"add-color"}
        />
        {isDeleted && (
          <SuccessMsg
            msg={"Cor deletada com sucesso"}
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
