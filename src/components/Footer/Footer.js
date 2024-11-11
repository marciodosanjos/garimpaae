import { Typography, Box, Container, Grid } from "@mui/material";
import { Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer style={{ backgroundColor: "white" }} className="footer">
        <Container
          className="footer-container"
          fixed
          sx={{
            backgroundColor: "white",
            height: "40vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: {
                xs: 3,
                md: 0,
                lg: 0,
              },
            }}
          >
            <Grid item xs={12} sm={12} md={6} className="footer-item">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: {
                    xs: "center",
                    md: "flex-start",
                    lg: "flex-start",
                  },

                  gap: 1,
                }}
              >
                <Link to="/">
                  <span
                    style={{
                      textTransform: "upperCase",
                      fontWeight: 800,
                    }}
                  >
                    Garimpa Aê
                  </span>
                </Link>
                <Typography variant="body2" sx={{ color: "grey" }}>
                  Sua loja preferida para produtos hype
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "flex-start",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Link to="/">
                      <Instagram color="#71747E" strokeWidth={1} />
                    </Link>
                    <Link to="/">
                      <Facebook color="#71747E" strokeWidth={1} />
                    </Link>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} className="footer-item">
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  justifyContent: {
                    xs: "center",
                    md: "flex-end",
                    lg: "flex-end",
                  },
                }}
              >
                <Link to="/">
                  <Typography sx={{ color: "grey" }}>Sobre nós</Typography>
                </Link>
                <Link to="/">
                  <Typography sx={{ color: "grey" }}>Políticas</Typography>
                </Link>
                <Link to="/">
                  <Typography sx={{ color: "grey" }}>Contato</Typography>
                </Link>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </>
  );
}
