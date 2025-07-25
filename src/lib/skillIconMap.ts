export type Skill = {
  name: string;
  icon: string;
};

export const skillIconMap = {
  // Languages
  markdown: { name: "Markdown", icon: "devicon:markdown" },
  javascript: { name: "JavaScript", icon: "devicon:javascript" },
  typescript: { name: "TypeScript", icon: "devicon:typescript" },
  rust: { name: "Rust", icon: "devicon:rust" },
  // Fronted
  css: { name: "CSS", icon: "devicon:css3" },
  react: { name: "React", icon: "devicon:react" },
  angular: { name: "Angular", icon: "devicon:angular" },
  nextjs: { name: "Next", icon: "devicon:nextjs" },
  astro: { name: "Astro", icon: "devicon:astro" },
  tailwindcss: { name: "Tailwindcss", icon: "devicon:tailwindcss" },
  remix: { name: "Remix", icon: "devicon:remix" },
  electron: { name: "Electron", icon: "devicon:electron" },
  //  Back end
  nodejs: { name: "Node.js", icon: "devicon:nodejs" },
  nestjs: { name: "Nestjs", icon: "devicon:nestjs" },
  // Mobile
  "react native": { name: "React Native", icon: "tabler:brand-react-native" },
  flutter: { name: "Flutter", icon: "devicon:flutter" },
  // Tools
  git: { name: "Git", icon: "devicon:git" },
  postgresql: { name: "Postgresql", icon: "devicon:postgresql" },
  apollo: { name: "Apollo-graphql", icon: "devicon:apollographql-wordmark" },
  //
  neovim: { name: "Neovim", icon: "devicon:neovim" },
  //
  "clean architecture": { name: "Clean Architecture", icon: "mdi:layers" },
} as const;
