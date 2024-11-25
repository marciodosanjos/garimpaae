import {
  Button,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { LinkIcon } from "lucide-react";

export default function Table({ title, tableHeadItems, tableValues }) {
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
            component={LinkIcon}
            to="/admin/orders"
            variant="primary"
            sx={{
              borderBottom: "1px solid grey",
              position: "absolute",
              right: 10,
              top: 10,
            }}
          >
            Ver todos
          </Button>
        </TableHead>
        <TableHead>
          <TableRow>
            {tableHeadItems?.map((tableHeadItem, index) => (
              <TableCell
                key={index}
                sx={{
                  borderBottom: "1px solid grey",
                  fontWeight: "bold !important",
                }}
              >
                {tableHeadItem}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableValues?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {tableValues &&
                Object.entries(row).map(([key, value]) => (
                  <TableCell key={index} align="right">
                    {value}
                  </TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
