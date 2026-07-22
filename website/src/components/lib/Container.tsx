import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import type { SxProps } from "@mui/material";
import type { Theme } from "@mui/system";
import type { ReactNode } from "react";

const StyledContainer = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr",
  margin: "0 auto",
  maxWidth: 920,
  padding: "0 20px",
});

type ContainerProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
};

export default function Container({ children, sx }: ContainerProps) {
  return <StyledContainer sx={sx}>{children}</StyledContainer>;
}
