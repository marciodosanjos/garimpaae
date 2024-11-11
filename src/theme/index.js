import { createTheme } from "@mui/material";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          height: "100vh",
          "& #__next": {
            height: "100%",
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          lineHeight: 1.3,
        },
      },
      variants: [
        {
          props: { variant: "outlined" },
          style: {
            backgroundColor: "#00468c",
            color: "white",
            borderRadius: "1rem",
            fontWeight: "none",
            "&:hover": {
              backgroundColor: "#e5e619",
            },
            textTransform: "capitalize",
            "@media (min-width:0px)": {
              fontSize: "18px",
            },
            "@media (min-width:600px)": {
              fontSize: "24px",
            },
            "@media (min-width:900px)": {
              fontSize: "28px",
            },
            "@media (min-width:1200px)": {
              fontSize: "28px",
            },
          },
        },
        {
          props: { variant: "primary" },
          style: {
            backgroundColor: "black",
            color: "white",
            borderRadius: 3,
            "&:hover": {
              backgroundColor: "#202533",
              color: "white",
              textDecoration: "none",
            },
            "&:active": {
              backgroundColor: "#202533",
              color: "white",
              textDecoration: "none",
            },
            "&:visited": {
              backgroundColor: "#202533",
              color: "white",
              textDecoration: "none",
            },
            textTransform: "none",
            "@media (min-width:0px)": {
              fontSize: "1rem",
            },
            "@media (min-width:600px)": {
              fontSize: "1rem",
            },
            "@media (min-width:900px)": {
              fontSize: "1rem",
              fontWeight: "200",
            },
            "@media (min-width:1200px)": {
              fontSize: "1rem",
            },
          },
        },
      ],
    },

    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          "&::before": {
            display: "none",
          },
          "&:not(:last-child)": {
            borderBottom: 1,
          },
          height: "0.5rem",
        },
      },
    },

    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          height: "0.5rem",
          paddingBottom: "0.5rem",
          borderRadius: "0.5rem",
          marginBottom: "0.5rem",
          fontWeight: "600",
          flexDirection: "row-reverse",
          borderTop: "unset",
          border: `0.5px solid rgba(0, 0, 9, .1);`,

          "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
            transform: "rotate(-180deg)",
          },
          "& .MuiAccordionSummary-content": {
            marginLeft: "1rem",
          },
        },
      },
    },

    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "2rem",
          backgroundColor: "white",
          marginBottom: "1rem",
          borderRadius: "0.5rem",
          border: "1px solid rgba(0, 0, 9, .1)",
          "& ul": {
            margin: "0",
            paddingLeft: "2rem",
          },
        },
      },
    },

    // MuiFormControlLabel: {
    //   styleOverrides: {
    //     root: {
    //       "& .MuiFormControlLabel-label": {
    //         fontSize: {
    //           xs: "14px",
    //           sm: "14px",
    //           md: "18px",
    //           lg: "18px",
    //           xl: "18px",
    //         },
    //         border: "none",
    //         paddingLeft: 0,
    //       },
    //       "& .Mui-checked": {
    //         color: "primary.main",
    //         backgroundColor: "white",
    //         width: "18px",
    //         height: "18px",
    //         marginLeft: "9px",
    //         marginRight: "9px",
    //         marginBottom: "9px",
    //         marginTop: "9px",
    //         "&:hover": {
    //           backgroundColor: "white",
    //         },
    //       },
    //       marginTop: "10px",
    //     },
    //   },
    // },

    MuiLink: {
      styleOverrides: {
        root: {
          // Sombra
          boxShadow: "none",
          backgroundColor: "transparent",
          color: "#00468c",
          fontSize: "14px",
          textDecoration: "underline",
          "&:hover": {
            color: "#004b76",
            textDecoration: "none",
          },
          "&:active": {
            color: "#00468c",
            textDecoration: "none",
          },
          "&:visited": {
            color: " #00468c",
            textDecoration: "none",
          },
        },
      },
    },
  },

  palette: {
    primary: {
      main: "#00468c",
      dark: "#0E1422",
      light: "#fffff",
      contrastText: "white",
    },
    secondary: {
      main: "#ecec53",
      dark: "#202533",
      light: "#ffffff",
    },
    background: {
      default: "white",
    },
    text: {
      primary: "#121212",
      secondary: "#71747E",
    },
  },
  typography: {
    fontFamily: ['"Open Sans"', "Helvetica", "Arial", "sans-serif"].join(","),

    h1: {
      fontSize: "40px",
      lineHeight: 1.2,
      color: " #121212",
      fontWeight: "semibold",
    },
    h2: {
      fontSize: "32px",
      lineHeight: 1.2,
      color: " #121212",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "24px",
      lineHeight: 1.2,
      color: " #121212",
      fontWeight: "bold",
    },
    h4: {
      fontSize: "18px",
      lineHeight: 1.2,
      color: " #121212",
      fontWeight: "bold",
    },
    h5: {
      fontSize: "16px",

      color: " #121212",
      "@media (min-width:0px)": {
        fontSize: "18px",
        fontWeight: "bold",
      },
      "@media (min-width:600px)": {
        fontSize: "24px",
        fontWeight: "bold",
      },
      "@media (min-width:900px)": {
        fontSize: "28px",
        fontWeight: "bold",
      },
      "@media (min-width:1200px)": {
        fontSize: "28px",
        fontWeight: "bold",
      },
    },
    h6: {
      fontSize: "14px",
      lineHeight: 1.2,
      color: " #121212",
      fontWeight: 600,
    },
    body1: {
      fontSize: "14px",
      lineHeight: 1.5,
      color: "#202533",
      fontWeight: "300",
    },
    body2: {
      lineHeight: 1.5,
      color: "#202533",
      "@media (min-width:0px)": {
        fontSize: "14px",
        fontWeight: "500",
      },
      "@media (min-width:600px)": {
        fontSize: "14px",
        fontWeight: "500",
      },
      "@media (min-width:900px)": {
        fontSize: "14px",
        fontWeight: "500",
      },
      "@media (min-width:1200px)": {
        fontSize: "14px",
        fontWeight: "500",
      },
    },
    overline: {
      color: " #121212",
      textTransform: "none",
      lineHeight: 1.4,

      "@media (min-width:0px)": {
        fontSize: "10px",
      },
      "@media (min-width:600px)": {
        fontSize: "12px",
      },
      "@media (min-width:900px)": {
        fontSize: "12px",
      },
      "@media (min-width:1200px)": {
        fontSize: "12px",
      },
    },
    subtitle2: {
      textTransform: "uppercase",
      "@media (min-width:0px)": {
        fontSize: "10px",
      },
      "@media (min-width:600px)": {
        fontSize: "12px",
      },
      "@media (min-width:900px)": {
        fontSize: "12px",
      },
      "@media (min-width:1200px)": {
        fontSize: "12px",
      },
    },
    caption: {
      lineHeight: 0,
      textTransform: "uppercase",
      textAlign: "center",
      "@media (min-width:0px)": {
        fontSize: "10px",
      },
      "@media (min-width:600px)": {
        fontSize: "12px",
      },
      "@media (min-width:900px)": {
        fontSize: "12px",
      },
      "@media (min-width:1200px)": {
        fontSize: "12px",
      },
    },
  },
});

export default theme;
