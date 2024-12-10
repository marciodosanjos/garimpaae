import { Box, Typography } from "@mui/material";
import useIsMobile from "../../hooks/useIsMobile";

export default function TitleUserProfileSection({
  title,
  description,
  alignment,
}) {
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        marginBottom: 2,
        alignItems: alignment,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          textAlign: isMobile && "center",
          marginBottom: isMobile && "2rem",
        }}
      >
        {title}
      </Typography>
      <Typography
        variant="body"
        sx={{
          textAlign: isMobile && "center",
          marginBottom: isMobile && "2rem",
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
