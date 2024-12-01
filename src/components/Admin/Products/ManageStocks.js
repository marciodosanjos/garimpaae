import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteProductAtion,
  fecthProductsAction,
} from "../../../redux/slices/products/productsSlice";
import baseURL from "../../../utils/baseURL";
import { Grid } from "@mui/material";
import AdminTable from "../../Table/AdminTable";
import SuccessMsg from "../../SuccessMsg/SuccessMsg";
import TitleUserProfileSection from "../../TitleUserProfileSection/TitleUserProfileSection";
import useIsMobile from "../../../hooks/useIsMobile";

export default function ManageStocks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthProductsAction({ url: `${baseURL}/products` }));
  }, [dispatch]);

  const { products } = useSelector((state) => state?.products);

  let [productsRows, setProductsRows] = useState([]);

  useEffect(() => {
    const productsRows =
      products &&
      products?.data?.map((product) => {
        return Object.keys(product)
          .filter((key, value) =>
            [
              "brand",
              "name",
              "price",
              "images",
              "sizes",
              "totalQty",
              "colors",
              "category",
              "_id",
            ].includes(key)
          )
          .reduce((obj, key) => {
            if (key === "sizes" || key === "colors") {
              obj[key] = product[key].join(",");
              return obj;
            }

            obj[key] = product[key];
            return obj;
          }, {});
      });

    setProductsRows(productsRows);
    console.log(productsRows);
  }, [products]);

  //delete product handler
  const [isDeleted, setIsDeleted] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const ismobile = useIsMobile();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProductAtion(id))
      .then(() => {
        setIsDeleted(true);
        setSnackbarOpen(true);
        dispatch(fecthProductsAction({ url: `${baseURL}/products` }));
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const tableHeadItems = () => {
    const keys =
      products?.data &&
      Object.entries(products?.data[0] || [])
        .filter(
          ([key]) =>
            key === "brand" ||
            key === "name" ||
            key === "price" ||
            key === "images" ||
            key === "sizes" ||
            key === "totalQty" ||
            key === "colors" ||
            key === "category" ||
            key === "_id"
        )
        .map(([key]) => key);

    return keys;
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
          title={"Produtos"}
          description={"Confira os produtos cadastrados na loja"}
          alignment={ismobile && "center"}
        />
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <AdminTable
          title={"Lista de produtos"}
          tableHeadItems={tableHeadItems()}
          tableValues={productsRows}
          buttonText={"Criar produto"}
          href={"/admin/add-product"}
          fn={deleteProductHandler}
          path={"admin/products/edit"}
        />
        {isDeleted && (
          <SuccessMsg
            msg={"Produto deletado com sucesso"}
            isOpened={isSnackbarOpen}
            onClose={handleSnackbarClose}
          />
        )}
      </Grid>
    </Grid>
  );
}
