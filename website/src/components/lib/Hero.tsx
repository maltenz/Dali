import { Box } from "@mui/material";
import styled from "@emotion/styled";
import { useEffect, useState, type MouseEvent, type ReactNode } from "react";

const StyledGallery = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  position: "relative",
  zIndex: 1,
});

const StyledTitle = styled.div({
  textAlign: "center",

  "> *": {
    margin: 0,
  },
  h1: {
    fontSize: "3em",
  },
  h2: {
    fontSize: "13em",
    fontFamily: '"Shrikhand", serif',
    lineHeight: 1,
    textShadow: "0 10px 100px black",
    color: "#fff",
  },
});

type HeroProps = {
  children?: ReactNode;
  image?: string;
};

export default function Hero({ children, image = "/public.png" }: HeroProps) {
  const [pointer, setPointer] = useState({ x: 50, y: 50 });
  const [isActive, setIsActive] = useState(false);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const timer = window.setInterval(() => {
      setRotation((current) => (current + 1) % 360);
    }, 16);

    return () => window.clearInterval(timer);
  }, [isActive]);

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    setPointer({ x, y });
    setIsActive(true);
  };

  return (
    <Box
      component="section"
      onMouseMove={handlePointerMove}
      onMouseLeave={() => setIsActive(false)}
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "#000",
        minHeight: "100vh",
        display: "flex",
        backgroundImage: `url('${image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        isolation: "isolate",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: isActive
            ? `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(255,255,255,0.28) 0 6%, transparent 9%), repeating-conic-gradient(from ${rotation}deg at ${pointer.x}% ${pointer.y}%, rgba(255,255,255,0.24) 0deg 8deg, transparent 8deg 22deg, rgba(255,255,255,0.1) 22deg 36deg, transparent 36deg 50deg)`
            : "transparent",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "scale(1)" : "scale(0.98)",
          transition: "opacity 400ms ease, transform 400ms ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: isActive
            ? `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(255,255,255,0.16) 0, rgba(0,0,0,0.16) 34%, rgba(0,0,0,0.6) 100%)`
            : "linear-gradient(135deg, rgba(0,0,0,0.08), rgba(0,0,0,0.2))",
          opacity: isActive ? 1 : 0,
          transition: "opacity 400ms ease",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <StyledGallery>
        <StyledTitle>
          <h2>
            Dali <br />
            Susanto
          </h2>
        </StyledTitle>
        {children}
      </StyledGallery>
    </Box>
  );
}
