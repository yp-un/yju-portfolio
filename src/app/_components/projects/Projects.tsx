import Title from "../title/Title";
import style from "./Projects.module.scss";
import type { Project } from "@/app/_types/Project";
import Card from "./components/card/Card";

const data: Project[] = [
  {
    title: "Chrome-extension",
    skills: ["JavaScript"],
    src: "/chrome-extension/main.gif",
    images: ["/chrome-extension/main.gif"],
    introduce: "사람인 크롬 익스텐션",
    github: { owner: "yp-un", repo: "saramin-auto-input-portfolio" },
  },
  {
    title: "Transfer",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "React Native webview"],
    src: "/transfer/d-01.png",
    images: [
      "/transfer/d-01.png",
      "/transfer/d-02.png",
      "/transfer/d-03.png",
      "/transfer/m-01.PNG",
      "/transfer/m-02.PNG",
      "/transfer/m-03.PNG",
      "/transfer/m-04.PNG",
    ],
    introduce: "기차 환승",
    github: { owner: "yp-un", repo: "transfer" },
  },
  {
    title: "yju-portfolio",
    skills: ["Next.js", "TypeScript", "Sass", "Zustand"],
    src: process.env.NEXT_PUBLIC_BASE_URL as string,
    images: [
      "/portfolio/d1.png",
      "/portfolio/d2.png",
      "/portfolio/d3.png",
      "/portfolio/d4.png",
      "/portfolio/d5.png",
      "/portfolio/m1.jpg",
      "/portfolio/m2.jpg",
      "/portfolio/m3.jpg",
      "/portfolio/m4.jpg",
      "/portfolio/m5.jpg",
      "/portfolio/m6.jpg",
    ],
    introduce: "포트 폴리오",
    github: { owner: "yp-un", repo: "yju-portfolio" },
  },
  {
    title: "Qcraft",
    skills: ["React", "TypeScript", "Redux"],
    src: "/qcraft.png",
    images: [
      "/qcraft/main-desktop-light.png",
      "/qcraft/interview-desktop-light.png",
      "/qcraft/review-desktop-dark.png",
      "/qcraft/history-mobile-light.png",
      "/qcraft/signup-mobile-dark.png",
    ],
    introduce: "AI 가상 인터뷰",
    github: { owner: "Capstone-QCraft", repo: "client" },
  },
  {
    title: "Project Pulse BE",
    skills: ["Express", "JavaScript", "MongoDB"],
    src: "/project-pulse-be.png",
    images: [],
    introduce: "프로젝트 관리",
    github: { owner: "yp-un", repo: "ProjectPulse" },
  },
  {
    title: "Project Pulse FE",
    skills: ["React", "JavaScript", "Redux"],
    src: "/project-pulse-fe.png",
    images: [],
    introduce: `프로젝트 관리`,
    github: { owner: "yp-un", repo: "ProjectPulse" },
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
