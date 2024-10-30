import { Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategoriesAction } from "../../redux/slices/categories/categoriesSlice";
import LoadingComponent from "../LoadingComp/LoadingComponent";

export default function CategoriesSection() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const [listCategories, setListCategories] = useState([]);

  const { categories, loading, error } = useSelector(
    (state) => state?.categories
  );

  useEffect(() => {
    if (categories) {
      setListCategories(categories?.data);
    }
  }, [categories]);

  return (
    <>
      <Container sx={{ marginY: "4rem" }}>
        {loading && <LoadingComponent />}
        <Typography variant="h1">Nossas categorias</Typography>
      </Container>
      <Container>
        <Grid container spacing={1} sx={{ alignItems: "center" }}>
          {error && <p>{error?.message}</p>}
          {listCategories &&
            listCategories.map((category) => {
              return (
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    height: "50vh",
                    position: "relative",
                  }}
                >
                  <Link
                    to={`/products-filters?category=${category?.name}`}
                    style={{ width: "100vw", height: "50vh" }}
                  >
                    <div
                      style={{
                        backgroundImage: `url(${category.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          background: "rgba(0, 0, 0, 0.7)",
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            "&:hover": {
                              transform: "scale(1.2)",
                              background: "rgba(0, 0, 0, 0.1)",
                            },
                          }}
                        >
                          <Typography
                            variant="h1"
                            sx={{
                              color: "white",
                            }}
                          >
                            {category?.name.toUpperCase()}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
}
