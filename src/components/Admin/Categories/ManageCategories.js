import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteCategoryAction,
  fetchCategoriesAction,
} from "../../../redux/slices/categories/categoriesSlice";

import TitleUserProfileSection from "../../TitleUserProfileSection/TitleUserProfileSection";
import AdminTable from "../../Table/AdminTable";
import useIsMobile from "../../../hooks/useIsMobile";
import { Grid } from "@mui/material";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";

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
    fetchCategoriesAction();
  }, [isDeleted, isSnackbarOpen, dispatch]);

  const { categories } = useSelector((state) => state?.categories);

  const [categoriesData, setCategoriesData] = useState([]);

  useEffect(() => {
    if (categories) {
      const categoryNames = categories?.data?.map((item) => ({
        categoryName: item.name,
        _id: item._id,
      }));
      setCategoriesData(categoryNames);
    }
  }, [categories]);

  const tableHeadItems = ["Categoria", "Ação"];

  //delete category handler
  const deleteCategoryHandler = async (category) => {
    try {
      const result = await dispatch(deleteCategoryAction(category));

      if (deleteCategoryAction.fulfilled.match(result)) {
        console.log("categoria deletada");
        setIsDeleted(true);
        setSnackbarOpen(true);
        setErrorMessage("");
        dispatch(fetchCategoriesAction());
        setTimeout(() => {
          setSnackbarOpen(false);
        }, 6000);
      }

      if (deleteCategoryAction.rejected.match(result)) {
        console.log("Erro ao deletar categoria:", result.payload);
        setIsDeleted(false);
        setErrorMessage("Erro ao deletar categoria");
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
          title={"Categorias"}
          description={"Confira as categorias cadastradas na loja"}
          alignment={ismobile && "center"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <AdminTable
          title={"Lista de categorias"}
          tableHeadItems={tableHeadItems}
          tableValues={categoriesData}
          buttonText={"Criar categoria"}
          href={"/admin/add-category"}
          fn={deleteCategoryHandler}
          path={"edit-category"}
        />
        {isDeleted && (
          <SuccessMsg
            msg={"Categoria deletada com sucesso"}
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
