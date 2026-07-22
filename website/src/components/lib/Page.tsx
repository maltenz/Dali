import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import {
  type ReactNode,
  type UIEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useMenuStore } from "../../stores/menuStore";
import Header from "./Header";
import Nav from "./Nav";
import styled from "@emotion/styled";
import Hero from "./Hero";
import Artwork from "./Artwork";
import Visualiser from "./Visualiser";
import { darkTheme, lightTheme, type CurrentThemeMode } from "./theme";
import type { HomeProps } from "../pages/Home";

type HeroPostArray =
  HomeProps["heroData"]["data"]["heroArtConnection"]["edges"];

type PageProps = {
  children?: ReactNode;
  header?: boolean;
  hero?: boolean;
  heroImage?: string;
  heroData?: NonNullable<NonNullable<HeroPostArray>[number]>["node"][];
  nav?: boolean;
};

const StyledPage = styled.div<{
  $isSnapping: boolean;
  $menuOpen: boolean;
}>(({ $isSnapping, $menuOpen }) => ({
  position: "relative",
  height: "100vh",
  overflowY: $menuOpen ? "hidden" : "auto",
  overflowX: "hidden",
  scrollSnapType: $isSnapping ? "y mandatory" : "none",
  WebkitOverflowScrolling: "touch",
}));

const StyledHeroWrapper = styled.div({
  height: "100vh",
  scrollSnapAlign: "start",
  scrollSnapStop: "always",
});

const StyledSection = styled.section({
  height: "100vh",
  scrollSnapAlign: "start",
  scrollSnapStop: "always",
});

export default function Page({
  header = true,
  hero,
  heroData,
  heroImage,
  nav = true,
}: PageProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isSnapping, setIsSnapping] = useState(true);
  const [currentThemeMode, setCurrentThemeMode] =
    useState<CurrentThemeMode>("dark");

  const menuOpen = useMenuStore((state) => state.menuOpen);

  // New state to manage the text of your sticky section title
  const [currentTitle, setCurrentTitle] = useState("");

  useEffect(() => {
    console.log('LOAD')
    if (!containerRef.current) return;

    // Grab all elements that control page context configurations
    const sections = containerRef.current.querySelectorAll("[data-theme]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 1. Sync Theme Mode
            const targetTheme = entry.target.getAttribute("data-theme") as
              | "light"
              | "dark";
            setCurrentThemeMode(targetTheme);

            // 2. Sync Sticky Title Text from data-title attribute
            const targetTitle = entry.target.getAttribute("data-title") || "";
            setCurrentTitle(targetTitle);

            // 3. Keep scroll snapping active on Hero landing baseline
            if (entry.target.getAttribute("data-section") === "hero") {
              setIsSnapping(true);
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.51, // Matches the exact moment the panel snaps past mid-axis
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [hero]);

  const handleArtworkScroll = (e: UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;

    if (scrollTop <= 0) {
      setIsSnapping(true);
    } else if (scrollTop + clientHeight >= scrollHeight - 2) {
      setIsSnapping(true);
    } else {
      setIsSnapping(false);
    }
  };

  const activePageTheme = currentThemeMode === "dark" ? darkTheme : lightTheme;



  return (
    <ThemeProvider theme={activePageTheme}>
      <CssBaseline />

      <StyledPage
        ref={containerRef}
        $isSnapping={isSnapping}
        $menuOpen={menuOpen}
      >
        {hero && (
          <StyledHeroWrapper
            data-theme="dark"
            data-section="hero"
            data-title=""
          >
              <Hero image={heroImage} />
          </StyledHeroWrapper>
        )}

        <StyledSection
          data-theme="light"
          data-section="artwork"
          data-title="Artwork"
        >
          <Artwork
            onScroll={handleArtworkScroll}
            sx={{
              height: "100vh",
              overflowY: "auto",
              msOverflowStyle: "none",
              scrollbarWidth: "none",
              "&::Z-webkit-scrollbar": { display: "none" },
            }}
          />
        </StyledSection>

        <StyledSection
          data-theme="dark"
          data-section="visualiser"
          data-title="Visualiser"
        >
          <Visualiser />
        </StyledSection>
      </StyledPage>

      {header && <Header title={currentTitle} />}
      {nav && (
        <Nav currentThemeMode={currentThemeMode} currentTitle={currentTitle} />
      )}
    </ThemeProvider>
  );
}
