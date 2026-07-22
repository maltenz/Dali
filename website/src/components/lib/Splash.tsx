import { gsap } from "gsap";
import styled from "@emotion/styled";
import { useEffect, useRef } from "react";

const StyledSplash = styled.div({
  display: "flex",
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "#fff",

  "> div": {
    position: "absolute",
    width: "50vw",
    height: "50vh",
    fontSize: "10vw",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",

    ":nth-of-type(1)": {
      top: 0,
      left: 0,
      backgroundImage: "url(/logo/D.svg)",
      backgroundColor: "#260449",
    },
    ":nth-of-type(2)": {
      top: 0,
      right: 0,
      backgroundImage: "url(/logo/A.svg)",
      backgroundColor: "#F3B426",
    },
    ":nth-of-type(3)": {
      bottom: 0,
      left: 0,
      backgroundImage: "url(/logo/L.svg)",
      backgroundColor: "#F75643",
    },
    ":nth-of-type(4)": {
      right: 0,
      bottom: 0,
      backgroundImage: "url(/logo/I.svg)",
      backgroundColor: "#7B3BB9",
    },
  },
});

const LETTERS = Array.from({ length: 4 }, (_, i) => i);

export default function Splash() {
  const splashRef = useRef<HTMLDivElement | null>(null);
  const letterRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!splashRef.current) {
      return;
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { duration: 0.65 } });
      const letters = letterRefs.current.filter(Boolean);

      timeline.fromTo(
        letters,
        {
          autoAlpha: 0,
          rotation: () => gsap.utils.random(-10, 10),
          y: "+=220",
        },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          ease: "back.out(1.8)",
          rotation: 0,
          stagger: 0.25,
        },
      );

      timeline.to(
        letters,
        {
          autoAlpha: 0,
          y: "+=420",
          scale: 0.92,
          rotation: () => gsap.utils.random(-10, 10),
          ease: "power2.in",
          stagger: {
            each: 0.08,
            from: "random",
          },
        },
        ">0.2",
      );

      timeline.to(
        splashRef.current,
        {
          autoAlpha: 0,
          duration: 0.6,
          ease: "power1.out",
        },
        ">0.15",
      );
    }, splashRef);

    return () => context.revert();
  }, []);

  return (
    <StyledSplash ref={splashRef}>
      {LETTERS.map((index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) {
              letterRefs.current[index] = el;
            }
          }}
          style={{ opacity: 0 }}
        ></div>
      ))}
    </StyledSplash>
  );
}
