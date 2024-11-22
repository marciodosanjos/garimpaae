import React from "react";
import Card from "../Card/Card";
import Grid from "@mui/material/Grid";

const Products = ({ products }) => {
  return (
    <>
      <Grid
        spacing={1}
        direction="row"
        container
        item
        sm={12}
        xs={12}
        lg={12}
        sx={{
          alignItems: {
            xs: "center",
            sm: "center",
            md: "flex-start",
            lg: "flex-start",
          },
          justifyContent: {
            xs: "center",
            sm: "center",
            md: "flex-start",
            lg: "flex-start",
          },
          gap: { xs: 5, md: 0 },
          marginY: { xs: 4 },
          //border: "1px solid black",
        }}
      >
        {products?.map((product) => (
          <>
            <Card
              key={product.id}
              name={product?.name}
              image={product.images[0]}
              price={product.price}
              id={product.id}
            />
          </>
        ))}
      </Grid>
    </>
  );
};

export default Products;
