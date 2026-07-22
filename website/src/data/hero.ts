type HeroFrontmatter = {
  title: string;
  image: string;
};

type HeroModule = {
  frontmatter: HeroFrontmatter;
};

const modules = import.meta.glob<HeroModule>("../../content/hero/*.md", {
  eager: true,
});

export const heroRecord = Object.values(modules)[0]?.frontmatter ?? {
  title: "Dali Susanto",
  image: "/uploads/dali.jpg",
};
