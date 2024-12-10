import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import baseURL from "../../utils/baseURL";
import LoadingComponent from "../../components/LoadingComp/LoadingComponent";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import Products from "../../components/Products/Products";
import { useSearchParams } from "react-router-dom";
import { Button, Container, Drawer, Grid } from "@mui/material";
import { fetchBrandsAction } from "../../redux/slices/brands/brandsSlice";
import debounce from "lodash.debounce";
import FacetItem from "../../components/FacetItem/FacetItem";
import Sorting from "../../components/Sorting/Sorting";
import useIsMobile from "../../hooks/useIsMobile";
import { useCallback } from "react";

export default function PLP() {
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingData, setLoadingData] = useState(false);
  const [productsData, setProductsData] = useState([]);
  const [hasMore, setHasMore] = useState(true); // Novo estado para controlar se há mais produtos
  const [sort, setSort] = useState("");
  const [params] = useSearchParams();
  const category = params.get("category");
  const dispatch = useDispatch();
  const isMobile = useIsMobile();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBrandsAction());
  }, [dispatch]);

  const { products, error } = useSelector((state) => state?.products);
  const { brands } = useSelector((state) => state?.brands);
  const brandsData = brands?.data?.slice(3, 8);

  const sizeCategories = [
    {
      name: "XXS",
    },
    {
      name: "XL",
    },
    {
      name: "L",
    },
  ];

  const fetchProducts = useCallback(async () => {
    if (!hasMore) return; // Não carregar mais produtos se não houver mais páginas

    setLoadingData(true);
    const brandString = selectedBrands.join(",");
    const sizesString = selectedSizes.join(",");

    const productUrl = `${baseURL}/products?category=${category || ""}&brand=${
      brandString || ""
    }&color=${color || ""}&price=${
      price || ""
    }&size=${sizesString}&page=${page}&sort=${sort}&limit=4`;

    try {
      const data = await fetch(productUrl);
      const res = await data.json();
      setProductsData((prevData) =>
        page === 1 ? res.data : [...prevData, ...res.data]
      );

      // Verificar se há próxima página
      setHasMore(!!res.pagination.next); // Se `next` for null ou undefined, `hasMore` será false
    } catch (error) {
      console.error("Erro na requisição de produtos:", error);
    }
    setLoadingData(false);
  }, [
    hasMore,
    selectedBrands,
    selectedSizes,
    category,
    color,
    price,
    page,
    sort,
  ]);

  // Carrega produtos ao alterar filtros ou página
  useEffect(() => {
    if (category || color || price || sort) {
      fetchProducts();
    }
  }, [
    category,
    selectedSizes,
    selectedBrands,
    color,
    price,
    page,
    sort,
    fetchProducts,
  ]);

  // Reinicia a página ao mudar qualquer filtro de busca
  useEffect(() => {
    setPage(1);
    setProductsData([]); // Limpa a lista de produtos quando qualquer filtro muda
    setHasMore(true); // Redefine `hasMore` ao alterar os filtros
  }, [category, selectedBrands, selectedSizes, color, sort]);

  // Função de scroll infinito com debounce
  useEffect(() => {
    const handleScroll = debounce(() => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        // Incrementa a página ao atingir o final da página
        if (!loadingData && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      }
    }, 200); // Debounce de 200ms

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadingData, hasMore]);

  const handleSortOption = (e) => {
    setSort(e.target.value);
    setPage(1);
    setProductsData([]);
  };

  return (
    <Container fixed>
      <Grid
        container
        spacing={2}
        direction="row"
        sx={{ marginY: "5rem", justifyContent: "center" }}
      >
        {!isMobile ? (
          <>
            {/* Filtros desktop */}
            <Grid
              item
              sm={4}
              md={3}
              lg={3}
              sx={{
                height: "auto",
                border: "0.01rem solid rgba(128, 128, 128, 0.3)",
                borderRadius: "0.5rem",
                paddingBottom: "10rem",
              }}
            >
              <FacetItem
                title="Marca"
                type="checkbox"
                arr={brandsData}
                fn={setSelectedBrands}
                selectedItems={selectedBrands}
              />
              <FacetItem
                title="Tamanho"
                type="checkbox"
                arr={sizeCategories}
                fn={setSelectedSizes}
                selectedItems={selectedSizes}
              />
            </Grid>
          </>
        ) : (
          <Grid item xs={12} sm={12} sx={{}}>
            <Button
              sx={{
                border: "1px solid grey",
                color: "black",
                width: "100%",
                marginY: "2rem",
                //position: "sticky",
                //top: 0,
              }}
              onClick={() => {
                setModalIsOpen(true);
              }}
            >
              Filtros
            </Button>
            <Drawer
              anchor="bottom"
              open={modalIsOpen}
              onClose={() => setModalIsOpen(false)}
              sx={{ margin: "20rem" }}
            >
              <Container>
                <FacetItem
                  title="Marca"
                  type="checkbox"
                  arr={brandsData}
                  fn={setSelectedBrands}
                  selectedItems={selectedBrands}
                />
                <FacetItem
                  title="Tamanho"
                  type="checkbox"
                  arr={sizeCategories}
                  fn={setSelectedSizes}
                  selectedItems={selectedSizes}
                />
              </Container>

              <Button
                variant="primary"
                onClick={() => setModalIsOpen(false)}
                sx={{ margin: "2rem" }}
              >
                Ativar filtros
              </Button>
            </Drawer>
          </Grid>
        )}

        {/* Produtos */}
        <Grid
          container
          item
          xs={12}
          sm={8}
          md={9}
          lg={9}
          sx={{
            height: products ? "auto" : "100vh",
            display: "block",
            marginTop: -2,
          }}
        >
          {/* Sorting */}
          <Grid
            item
            xs={12}
            sx={{
              textAlign: "end",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              height: "2rem",
              width: "100rem",
            }}
          >
            <div style={{ color: "#71747E" }}>Resultados</div>
            <Sorting fn={handleSortOption} sortValue={sort} />
          </Grid>
          {/* Products */}
          <Products products={productsData} />
          {loadingData && <LoadingComponent />}
          {error && <ErrorMsg message={error?.message} />}
          {/* {!hasMore && <p>Não há mais produtos para carregar</p>} */}
          {/* Mensagem quando não há mais produtos */}
        </Grid>
      </Grid>
    </Container>
  );
}
