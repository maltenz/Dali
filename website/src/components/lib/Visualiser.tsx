import { Box, type SxProps } from "@mui/material";
import type { Theme } from "@mui/system";

type VisualiserProps = {
  sx?: SxProps<Theme>;
};

export default function Visualiser({ sx }: VisualiserProps) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#000",
        position: "relative",
        overflow: "hidden",

        ...sx,

        "> img": {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          display: "block",
        },
      }}
    >
      <img src="https://placehold.co/1920x1080/111/fff" alt="" />
    </Box>
  );
}
