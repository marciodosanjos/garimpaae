import React from "react";
import Link from "@mui/material/Link";
import AddIcon from "@mui/icons-material/Add";
import { Box, Button } from "@mui/material";

const Products = ({ products }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
        {products?.map((product) => (
          <>
            {/* new */}
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg group-hover:opacity-75">
              <div className="relative">
                <span className="absolute top-0 left-0 ml-6 mt-6 px-2 py-1 text-xs font-bold font-heading bg-white border-2 border-red-500 rounded-full text-red-500">
                  -15%
                </span>
                <Link
                  className="block"
                  to={{
                    pathname: `/products/${product?.id}`,
                    // state: {
                    //   product: product,
                    // },
                  }}
                >
                  <img
                    className="w-full h-64 object-cover"
                    src={product?.images[0]}
                    alt={product?.name}
                  />
                </Link>
                <div className="px-6 pb-6 mt-8">
                  <a
                    className="block px-6 mb-2"
                    href={`/products/${product?.id}`}
                  >
                    <h3 className="mb-2 text-xl font-bold font-heading">
                      {product?.name}
                    </h3>
                    <p className="text-lg font-bold font-heading black">
                      <span>${product?.price}</span>
                      <span className="text-xs text-gray-500 font-semibold font-heading line-through">
                        $40.99
                      </span>
                    </p>
                  </a>

                  <Box sx={{ textAlign: "end" }}>
                    <Button
                      sx={{
                        width: "1rem",
                        height: "1rem",
                      }}
                      href={`/products/${product?.id}`}
                    >
                      <AddIcon fontSize="large" color="black" />
                    </Button>
                  </Box>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Products;
