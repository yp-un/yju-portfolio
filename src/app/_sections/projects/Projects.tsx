import Title from "@/app/_components/title/Title";
import style from "./Projects.module.scss";
import type { Project } from "@/app/_types/Project";
import Card from "./components/card/Card";

const data: Project[] = [
  {
    title: "Shathing",
    skills: ["Next.js", "Spring Boot", "WebSocket", "PostgreSQL"],
    thumbnail: "/shathing/1.webp",
    images: ["/shathing/1.webp", "/shathing/2.webp", "/shathing/3.webp", "/shathing/4.webp"],
    introduce: "물건 공유 플랫폼",
    githubUrl: "https://github.com/orgs/shathing/repositories",
    serviceUrl: "https://shathing.shop",
    readme: {
      owner: "yp-un",
      repo: "yju-portfolio",
      filePath: "public/shathing/description.md",
    },
  },
  {
    title: "Tripplai",
    skills: ["Next.js", "TypeScript", "Zustand", "ReactQuery", "Tailwind CSS"],
    thumbnail: "/tripplai/1.webp",
    images: ["/tripplai/1.webp", "/tripplai/2.webp", "/tripplai/3.webp", "/tripplai/4.webp", "/tripplai/5.webp"],
    introduce: "AI 기반 여행 계획 플랫폼",
    githubUrl: "https://github.com/Tripplai/client",
    serviceUrl: "https://tripplai.vercel.app",
    readme: {
      owner: "yp-un",
      repo: "yju-portfolio",
      filePath: "public/tripplai/description.md",
    },
  },
  {
    title: "yju-portfolio",
    skills: ["Next.js", "TypeScript", "Zustand", "Sass"],
    thumbnail: "/og-image.webp",
    images: process.env.NEXT_PUBLIC_BASE_URL!,
    introduce: "포트폴리오",
    githubUrl: "https://github.com/yp-un/yju-portfolio",
    serviceUrl: "https://yju-portfolio.com",
    readme: {
      owner: "yp-un",
      repo: "yju-portfolio",
      filePath: "public/portfolio/description.md",
    },
  },
];

export default function Projects() {
  return (
    <section id="Projects" className={style.container}>
      <Title title="Projects" />
      <div className={style.wrapper}>
        <div className={style.inner}>
          {data.map((v) => (
            <Card key={v.title} project={v} />
          ))}
        </div>
      </div>
    </section>
  );
}
