import { createTheme, type ThemeOptions } from "@mui/material/styles";

export type CurrentThemeMode = "light" | "dark";

const baseThemeOptions: ThemeOptions = {
  typography: {
    fontFamily: '"Public Sans", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
    },
  },
  shape: {
    borderRadius: 8,
  },
};

export const lightTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: "light",
    primary: {
      main: "#0070f3",
      light: "#3291ff",
      dark: "#0051b3",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ff0070",
    },
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#666666",
    },
  },
});

export const darkTheme = createTheme({
  ...baseThemeOptions,
  palette: {
    mode: "dark",
    primary: {
      main: "#3291ff",
    },
    background: {
      default: "#0a0a0a",
      paper: "#121212",
    },
  },
});
