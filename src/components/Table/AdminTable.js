import {
  Button,
  Paper,
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LinkIcon } from "lucide-react";
import capitalize from "../../utils/capitalize";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import {
  deleteProductAtion,
  fecthProductsAction,
} from "../../redux/slices/products/productsSlice";
import { useDispatch } from "react-redux";
import baseURL from "../../utils/baseURL";
import translateLabels from "../../utils/translateLabels";

export default function AdminTable({
  title,
  tableHeadItems,
  tableValues,
  buttonText,
  href,
}) {
  const dispatch = useDispatch();

  //delete product handler
  const deleteProductHandler = (id) => {
    dispatch(deleteProductAtion(id))
      .then(() => {
        dispatch(fecthProductsAction({ url: `${baseURL}/products` }));
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  return (
    <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead
          sx={{ borderBottom: "1px solid grey", position: "relative" }}
        >
          <TableCell
            sx={{
              borderBottom: "1px solid grey",
              fontWeight: "bold !important",
            }}
          >
            {title}
          </TableCell>
          <Button
            href={href}
            variant="primary"
            sx={{
              borderBottom: "1px solid grey",
              position: "absolute",
              right: 10,
              top: 10,
            }}
          >
            {buttonText}
          </Button>
        </TableHead>
        <TableHead>
          <TableRow>
            {tableHeadItems
              ?.filter((item) => item !== "_id") // Filtra os itens que não são "_id"
              .map((tableHeadItem, index) => (
                <TableCell
                  key={index}
                  sx={{
                    borderBottom: "1px solid grey",
                    fontWeight: "bold !important",
                  }}
                >
                  {translateLabels(tableHeadItem)}
                </TableCell>
              ))}
            {/* Adiciona a célula de '_id' como última coluna */}
            {tableHeadItems.includes("_id") && (
              <TableCell
                key="_id"
                sx={{
                  borderBottom: "1px solid grey",
                  fontWeight: "bold !important",
                }}
              >
                {translateLabels(tableHeadItems.find((item) => item === "_id"))}
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableValues?.map((row, index) => {
            const entries = Object.entries(row);
            const idEntry = entries.find(([key]) => key === "_id");
            const otherEntries = entries.filter(([key]) => key !== "_id");

            return (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {otherEntries.map(([key, value]) => (
                  <TableCell key={`${index}-${key}`} align="right">
                    {key === "images" ? (
                      <img src={value} height={50} width={50} alt={"alt"} />
                    ) : key === "brand" ? (
                      value
                    ) : (
                      value
                    )}
                  </TableCell>
                ))}

                {/* Renderiza a célula com a chave '_id' como a última */}
                {idEntry && (
                  <TableCell key={`${index}-id`} align="right">
                    <Trash2
                      strokeWidth={1}
                      onClick={() => deleteProductHandler(idEntry)}
                      //style={{ cursor: "pointer" }}
                    />
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
