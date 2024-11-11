import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

export default function Sorting({ fn, sort }) {
  return (
    <Box sx={{}}>
      <select onChange={fn} value={sort} style={{ color: "#71747E" }}>
        <option value="">Ordenar</option>
        <option value="price_desc" name="Maior preço">
          Maior preço
        </option>
        <option value="price_asc" name="Menor preço">
          Menor preço
        </option>
      </select>
    </Box>
  );
}
