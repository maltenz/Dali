import { styled } from "@mui/material/styles";

type HeaderProps = {
  title?: string;
};

const StyledHeader = styled("header")(({ theme }) => ({
  padding: 20,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  position: "fixed",
  top: 20,
  right: 20,
  left: 0,
  zIndex: 10,
  textAlign: "right",

  " a": {
    display: "inline-flex",
    alignItems: "center",
    fontSize: 40,
    textDecoration: "none",
    fontWeight: 800,
    color: theme.palette.text.primary,
    transition: "color 0.5s",
    fontFamily: '"Shrikhand", serif',
  },
  h2: {
    margin: 0,
    marginTop: "-10px",
    fontWeight: 400,
  },
}));

export default function Header({ title }: HeaderProps) {
  if (title) {
    return (
      <StyledHeader>
        <div>
          <a href="/">Dali Susanto</a>
          <h2>{title}</h2>
        </div>
      </StyledHeader>
    );
  }
}
