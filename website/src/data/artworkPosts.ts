type ArtworkFrontmatter = {
  title: string;
  image: string;
  excerpt: string;
};

type ArtworkModule = {
  frontmatter: ArtworkFrontmatter;
};

const modules = import.meta.glob<ArtworkModule>("../../content/artworks/*.md", {
  eager: true,
});

export type ArtworkPost = ArtworkFrontmatter & {
  slug: string;
};

export const artworkPosts: ArtworkPost[] = Object.entries(modules)
  .map(([filePath, module]) => {
    const slug = filePath.split("/").pop()?.replace(/\.md$/, "") || filePath;

    return {
      slug,
      ...module.frontmatter,
    };
  })
  .sort((left, right) => left.slug.localeCompare(right.slug));