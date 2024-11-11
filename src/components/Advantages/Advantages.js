import { Typography, Container, Box, Grid } from "@mui/material";
import { Truck, ShieldCheck, Trophy } from "lucide-react";

const advantages = [
  {
    icon: (color, strokeWidth) => {
      return <Truck size={30} color={color} strokeWidth={strokeWidth} />;
    },
    colorIcon: "black",
    strokeWidth: 1,
    title: "Frete grátis",
    text: "Atualize seu estilo e obtenha frete GRÁTIS em todos os pedidos",
  },
  {
    icon: (color, strokeWidth) => {
      return <ShieldCheck size={30} color={color} strokeWidth={strokeWidth} />;
    },
    colorIcon: "black",
    strokeWidth: 1,
    title: "Pagamento seguro",
    text: "Sua segurança é nossa prioridade. Seu pagamento está seguro com a gente",
  },
  {
    icon: (color, strokeWidth) => {
      return <Trophy size={30} color={color} strokeWidth={strokeWidth} />;
    },
    colorIcon: "black",
    strokeWidth: 1,
    title: "Satisfação garantida",
    text: "Ame nossos produtos ou tenha seu dinheiro de volta",
  },
];

export default function Advantages() {
  return (
    <Container
      className="advantages"
      fixed
      sx={{
        height: { xs: "60vh", sm: "60vh", md: "20vh", xl: "30vh" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: {
          xs: "fle-start",
          sm: "flext-start",
          md: "center",
          lg: "center",
          xl: "center",
        },
        //border: "1px solid black",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          marginTop: "1rem",
          height: "20vh",
          backgroundColor: "white",
        }}
      >
        {advantages.map((advantage, index) => (
          <Grid
            key={index}
            item
            xs={12}
            md={4}
            sx={{
              marginBottom: { md: "2rem" },
              height: "20vh",
              backgroundColor: "white",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                borderRadius: "50%",
                width: "3rem",
                height: "3rem",
                backgroundColor: "#E6E7E8",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {advantage.icon(advantage.colorIcon, advantage.strokeWidth)}
            </Box>

            <Typography variant="h6">{advantage.title}</Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#474B57",
                textAlign: { xs: "center", sm: "center", md: "center" },
              }}
            >
              {advantage.text}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
