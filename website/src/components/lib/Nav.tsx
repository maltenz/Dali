import { styled, ThemeProvider, useTheme } from "@mui/material/styles";
import { darkTheme, lightTheme, type CurrentThemeMode } from "./theme";
import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { gsap } from "gsap";
import { useMenuStore } from "../../stores/menuStore";

type NavProps = {
  currentThemeMode: CurrentThemeMode;
  currentTitle: string;
};

const BREAKPOINT = "md";

const StyledNav = styled("nav", {
  shouldForwardProp: (prop) => prop !== "activeTitle",
})<{ activeTitle: string }>(({ theme }) => ({
  [theme.breakpoints.up(BREAKPOINT)]: {
    display: "flex",
  },
  display: "none",
  position: "fixed",
  left: 0,
  bottom: 0,

  "> ul": {
    listStyle: "none",
    margin: 0,
    padding: 0,
    paddingBottom: 60,
    paddingLeft: 60,

    " a": {
      fontSize: "2em",
      textDecoration: "none",
      color: theme.palette.text.primary,
      transition: "color 0.5s",
      fontWeight: "bold",
    },

    " a.active": {
      color: theme.palette.secondary.main,
    },
  },
}));

const StyledHamburger = styled("div")(({ theme }) => ({
  width: 80,
  height: 80,
  padding: 10,
  backgroundColor: theme.palette.background.paper,
  position: "fixed",
  bottom: 60,
  left: 60,
  cursor: "pointer",
  zIndex: 1300,
  [theme.breakpoints.up(BREAKPOINT)]: {
    display: "none",
  },
}));

const links = [
  { label: "Home", href: "/" },
  { label: "Artwork", href: "/artwork" },
  { label: "Visualiser", href: "/visualiser" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Nav({ currentTitle, currentThemeMode }: NavProps) {
  const activePageTheme = currentThemeMode === "dark" ? lightTheme : darkTheme;
  const menuOpen = useMenuStore((state) => state.menuOpen);
  const setMenuOpen = useMenuStore((state) => state.setMenuOpen);
  const toggleMenu = useMenuStore((state) => state.toggleMenu);
  const theme = useTheme();

  const menuRef = useRef<HTMLDivElement>(null);

  // GSAP Animation Logic
  useEffect(() => {
    if (!menuRef.current) return;

    if (menuOpen) {
      // Clear current tweens to avoid animation fighting on rapid clicking
      gsap.killTweensOf(menuRef.current);

      // 1. OPENING TIMELINE (Bottom right corner leads, then settles with top right corner extended)
      gsap
        .timeline()
        .to(menuRef.current, {
          left: 0,
          clipPath: "polygon(0% 0%, 75% 0%, 100% 100%, 0% 100%)", // Bottom right leads heavily
          duration: 0.35,
          ease: "power2.out",
        })
        .to(menuRef.current, {
          left: 0,
          clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 0% 100%)", // Settles into your final layout
          duration: 0.25,
          ease: "back.out(1.2)",
        });
    } else {
      // Clear current tweens to cleanly snap backward
      gsap.killTweensOf(menuRef.current);

      // 2. CLOSING ANIMATION (Snaps out cleanly backward)
      gsap.to(menuRef.current, {
        left: "-70vw",
        clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 0% 100%)",
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [menuOpen]);

  return (
    <>
      <StyledNav activeTitle={currentTitle}>
        <ul>
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={link.label === currentTitle ? "active" : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </StyledNav>

      <ThemeProvider theme={activePageTheme}>
        {/* Menu Container controlled by GSAP */}
        <Box
          ref={menuRef}
          sx={{
            position: "fixed",
            top: 0,
            bottom: 0,
            width: "60vw",
            backgroundColor: theme.palette.background.default,
            left: "-70vw", // Initial closed state position (GSAP takes over from here)
            clipPath: "polygon(0% 0%, 100% 0%, 80% 100%, 0% 100%)",
            zIndex: 1200,
            // Desktop safety override
            [theme.breakpoints.up(BREAKPOINT)]: {
              left: "-100% !important",
            },
          }}
        />

        <StyledHamburger onClick={toggleMenu}>
          <svg
            className="hb"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 10 10"
            stroke={theme.palette.background.default}
            strokeWidth=".6"
            fill="transparent"
            strokeLinecap="round"
          >
            <path d="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7">
              <animate
                dur="0.2s"
                attributeName="d"
                values="M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7;M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7"
                fill="freeze"
                begin="start.begin"
              />
              <animate
                dur="0.2s"
                attributeName="d"
                values="M3,3L5,5L7,3M5,5L5,5M3,7L5,5L7,7;M2,3L5,3L8,3M2,5L8,5M2,7L5,7L8,7"
                fill="freeze"
                begin="reverse.begin"
              />
            </path>
            <rect width="10" height="10" stroke="none">
              <animate
                dur="2s"
                id="reverse"
                attributeName="width"
                begin="click"
              />
            </rect>
            <rect width="10" height="10" stroke="none">
              <animate
                dur="0.001s"
                id="start"
                attributeName="width"
                values="10;0"
                fill="freeze"
                begin="click"
              />
              <animate
                dur="0.001s"
                attributeName="width"
                values="0;10"
                fill="freeze"
                begin="reverse.begin"
              />
            </rect>
          </svg>
        </StyledHamburger>
      </ThemeProvider>
    </>
  );
}
