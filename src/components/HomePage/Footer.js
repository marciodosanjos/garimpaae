import { Container } from "@mui/material";

function Footer() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "background.default",
        height: "10vh",
        marginTop: "3rem",
      }}
    >
      <Container
        fixed
        sx={{
          backgroundColor: "background.default",
          height: "10vh",
          textAlign: "center",
        }}
      >
        Footer
      </Container>
    </Container>
  );
}

export default Footer;
