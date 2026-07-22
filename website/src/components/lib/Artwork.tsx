import { Box, Typography, type SxProps } from "@mui/material";
import Container from "./Container";
import type { Theme } from "@mui/system";
import type { UIEvent } from "react";
import { artworkPosts } from "../../data/artworkPosts";

type ArtWorkProps = {
  sx?: SxProps<Theme>;
  onScroll?: (e: UIEvent<HTMLDivElement>) => void;
};

export default function Artwork({ sx }: ArtWorkProps) {
  return (
    <Container
      sx={{
        paddingTop: "20px",
        paddingBottom: "20px",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "20px",
        maxWidth: "100%",
        alignItems: "start",
        ...sx,
      }}
    >
      {artworkPosts.map((post) => (
        <Box
          key={post.slug}
          component="article"
          sx={{
            display: "grid",
            gap: 1.25,
            color: "text.primary",
            mb: 2,
          }}
        >
          <Box
            component="img"
            src={post.image}
            alt={post.title}
            sx={{
              width: "100%",
              aspectRatio: "2 / 3",
              objectFit: "cover",
              display: "block",
              borderRadius: 1.5,
            }}
          />

          <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
            {post.title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.7 }}>
            {post.excerpt}
          </Typography>
        </Box>
      ))}
    </Container>
  );
}
