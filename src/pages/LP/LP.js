import * as React from "react";
import Box from "@mui/material/Box";
import Advantages from "../../components/Advantages/Advantages";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fecthProductsAction } from "../../redux/slices/products/productsSlice";
import baseURL from "../../utils/baseURL";
import TrendProducts from "../../components/TrendProducts/TrendProducts";
import Teaser from "../../components/Teaser/Teaser";

export default function LandingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fecthProductsAction({ url: `${baseURL}/products` }));
  }, [dispatch]);

  const { products } = useSelector((state) => state?.products);

  const featuredProducts1 =
    products.data && products.data.slice(products.data.length - 3);

  const featuredProducts2 = products.data && products.data.slice(3, 6);

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#ffffff" }}>
      <Teaser
        title={"Novidades chegando"}
        text={"Descubra nossa coleção hoje"}
        buttonText={"Descobrir agora"}
        img={
          "https://sneakersul.com.br/cdn/shop/files/nike-sb-dunk-low-ebay-1.webp?v=1711918943"
        }
        blockHeight={"60vh"}
        titleSize={"h1"}
        imgHeight={333}
        imgWidth={350}
        destination={"/"}
      />
      <Advantages />
      <TrendProducts title={"Destaques do mês"} array={featuredProducts1} />
      <Teaser
        title={"Descubra nosso paraíso de produtos"}
        text={"Entre no mundo do estilo explorando nossa coleção diversa"}
        buttonText={"Descobrir agora"}
        img={
          "https://static.vecteezy.com/system/resources/thumbnails/041/714/543/small_2x/ai-generated-black-blank-t-shirt-front-mockup-on-a-transparent-background-png.png"
        }
        blockHeight={{ xs: "60vh", sm: "60vh", md: "40vh" }}
        titleSize={"h3"}
        imgHeight={233}
        imgWidth={250}
        destination={"/"}
      />
      <TrendProducts
        title={"Adicionados recentemente"}
        array={featuredProducts2}
      />
      <Teaser
        title={"Ficou com dúvidas?"}
        text={"Entre em contato com a gente e saiba mais"}
        buttonText={"Entrar em contato"}
        img={
          "https://static.vecteezy.com/system/resources/thumbnails/041/714/543/small_2x/ai-generated-black-blank-t-shirt-front-mockup-on-a-transparent-background-png.png"
        }
        blockHeight={{ xs: "60vh", sm: "60vh", md: "40vh" }}
        titleSize={"h3"}
        imgHeight={233}
        imgWidth={250}
        destination={"/"}
      />
    </Box>
  );
}
