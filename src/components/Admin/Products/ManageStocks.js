import { Link } from "react-router-dom";
import ErrorMsg from "../../ErrorMsg/ErrorMsg";
import LoadingComponent from "../../LoadingComp/LoadingComponent";
import NoDataFound from "../../NoDataFound/NoDataFound";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteProductAtion,
  fecthProductsAction,
} from "../../../redux/slices/products/productsSlice";
import baseURL from "../../../utils/baseURL";
import { Grid } from "@mui/material";
import Table from "../../Table/Table";
import translateLabels from "../../../utils/translateLabels";

export default function ManageStocks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthProductsAction({ url: `${baseURL}/products` }));
  }, [dispatch]);

  const { products, loading, error } = useSelector((state) => state?.products);

  let [productsRows, setProductsRows] = useState([]);

  useEffect(() => {
    const productsRows =
      products &&
      products?.data?.map((product) => {
        return Object.keys(product)
          .filter((key) =>
            [
              "brand",
              "name",
              "price",
              "images",
              "sizes",
              "totalQty",
              "colors",
              "category",
            ].includes(key)
          )
          .reduce((obj, key) => {
            obj[key] = product[key];
            return obj;
          }, {});
      });

    setProductsRows(productsRows);
  }, [products]);

  console.log(productsRows);

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
            key === "category"
        )
        .map(([key]) => translateLabels(key));

    return keys;
  };

  //delete product handler
  const deleteProductHandler = (id) => {
    dispatch(deleteProductAtion(id))
      .then(() => {
        dispatch(fecthProductsAction({ url: `${baseURL}/products` }));
      })
      .catch((error) => {
        // Handle error if necessary
        console.error("Error deleting category:", error);
      });
  };

  return (
    <Grid
      container
      sx={{
        padding: 3,
        gap: 4,
        justifyContent: "center",
      }}
    >
      <Grid item sx={12} sm={12} md={12} lg={12} xl={12}>
        Lista de produtos
      </Grid>
      <Grid item>
        <Table
          title={"Lista de produtos"}
          tableHeadItems={tableHeadItems()}
          tableValues={productsRows}
        />
      </Grid>
    </Grid>
  );
}
