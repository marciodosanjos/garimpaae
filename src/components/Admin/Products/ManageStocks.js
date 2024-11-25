import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fecthProductsAction } from "../../../redux/slices/products/productsSlice";
import baseURL from "../../../utils/baseURL";
import { Grid } from "@mui/material";
import translateLabels from "../../../utils/translateLabels";
import AdminTable from "../../Table/AdminTable";

export default function ManageStocks() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthProductsAction({ url: `${baseURL}/products` }));
  }, [dispatch]);

  const { products, loading, error } = useSelector((state) => state?.products);

  console.log(products, error, loading);

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
              "_id",
            ].includes(key)
          )
          .reduce((obj, key) => {
            obj[key] = product[key];
            return obj;
          }, {});
      });

    setProductsRows(productsRows);
  }, [products]);

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
      sx={{
        padding: 3,
        gap: 4,
        justifyContent: "center",
      }}
    >
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        Lista de produtos
      </Grid>
      <Grid item>
        <AdminTable
          title={"Lista de produtos"}
          tableHeadItems={tableHeadItems()}
          tableValues={productsRows}
          buttonText={"Criar produto"}
          href={"/admin/add-product"}
        />
      </Grid>
    </Grid>
  );
}
