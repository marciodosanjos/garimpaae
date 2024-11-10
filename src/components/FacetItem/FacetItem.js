import { Typography, Box, Checkbox } from "@mui/material";

export default function FacetItem({ title, type, arr, fn, selectedItems }) {
  return (
    <Box sx={{ paddingLeft: "1rem" }}>
      <Typography variant="h6" sx={{ paddingY: "1rem" }}>
        {title}
      </Typography>

      {arr?.map((brandItem) => (
        <div
          key={brandItem?._id}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            gap: 10,
            marginBottom: "1rem",
            borderBottom: "solid 1px rgb(1,1,1, 0.05)",
            width: "80%",
            paddingBottom: "0.5rem",
          }}
        >
          {/* Checkbox do Material-UI */}
          <Checkbox
            checked={selectedItems.includes(brandItem?.name)}
            onChange={() => {
              fn((prevSelected) =>
                prevSelected.includes(brandItem?.name)
                  ? prevSelected.filter((b) => b !== brandItem?.name)
                  : [...prevSelected, brandItem?.name]
              );
            }}
            sx={{
              width: "1rem",
              height: "1rem",
              outline: "none",
              boxShadow: "none",
              borderRadius: 1,
              border: "solid 1px rgb(1,1,1, 0.2)", // Remove qualquer borda extra
              backgroundColor: selectedItems.includes(brandItem?.name)
                ? "secondary.dark"
                : "transparent",
              // Estilização ao ser selecionado
              "&.Mui-checked": {
                backgroundColor: "secondary.dark",
                borderColor: "white", // Borda branca quando marcado
              },
              "& .MuiSvgIcon-root": {
                fontSize: "2rem",
                color: selectedItems.includes(brandItem?.name)
                  ? "white"
                  : "transparent", // Cor do checkmark
              },
              ":hover": {
                backgroundColor: selectedItems.includes(brandItem?.name)
                  ? "secondary.dark"
                  : "transparent",
              },
            }}
          />
          <label style={{ color: "#71747E" }}>{brandItem?.name}</label>
        </div>
      ))}
    </Box>
  );
}
