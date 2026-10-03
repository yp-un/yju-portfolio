import type { JSX } from "react";
import style from "./Skills.module.scss";

// Keep the original skill shape available for the reusable Skill component.
export interface Skill {
  name: string;
  color: { bg: string; fg: "white" | "black" };
  svg?: JSX.Element;
  proficiency: number;
}

interface Category {
  title: string;
  skills: Pick<Skill, "name" | "proficiency">[];
}

const categories: Category[] = [
  {
    title: "언어",
    skills: [
      { name: "TypeScript", proficiency: 3 },
      { name: "JavaScript", proficiency: 3 },
      { name: "Java", proficiency: 1 },
      { name: "Python", proficiency: 1 },
      { name: "C", proficiency: 1 },
    ],
  },
  {
    title: "프론트엔드",
    skills: [
      { name: "Next.js", proficiency: 3 },
      { name: "React", proficiency: 3 },
      { name: "Redux", proficiency: 2 },
      { name: "Zustand", proficiency: 3 },
      { name: "React Query", proficiency: 3 },
      { name: "Jest", proficiency: 2 },
      { name: "Cypress", proficiency: 1 },
      { name: "Storybook", proficiency: 1 },
      { name: "Sass", proficiency: 2 },
      { name: "Tailwind CSS", proficiency: 3 },
      { name: "styled-components", proficiency: 2 },
    ],
  },
  {
    title: "백엔드",
    skills: [
      { name: "Node.js", proficiency: 1 },
      { name: "Express", proficiency: 1 },
      { name: "Nest.js", proficiency: 1 },
      { name: "Type ORM", proficiency: 1 },
      { name: "MongoDB", proficiency: 1 },
      { name: "PostgreSQL", proficiency: 1 },
    ],
  },
  {
    title: "배포",
    skills: [
      { name: "Vercel", proficiency: 3 },
      { name: "AWS", proficiency: 1 },
    ],
  },
];

const capabilities = [
  {
    title: "컴포넌트와 화면 구현",
    description: "타입으로 UI의 경계를 명확히 하고, 재사용할 수 있는 컴포넌트로 화면을 구성합니다.",
    skills: ["TypeScript", "JavaScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "상태와 데이터 흐름",
    description: "서버 상태와 화면 상태를 나누고, 캐싱과 구독 범위를 조정해 중복 요청과 리렌더링을 줄입니다.",
    skills: ["React Query", "Zustand", "Redux"],
  },
  {
    title: "UI 품질과 배포",
    description: "Jest와 스타일링 도구로 구현을 점검하고, Vercel을 활용해 웹 서비스를 배포합니다.",
    skills: ["Jest", "Sass", "styled-components", "Vercel"],
  },
];

const proficiencyLabels: Record<number, string> = { 3: "능숙", 2: "활용", 1: "기초" };

export default function Skills() {
  return (
    <section id="Skills" className={style.container} aria-labelledby="skills-heading">
      <div className={style.wrapper}>
        <header className={style.header}>
          <h2 id="skills-heading">도구를 익히고,<br />문제에 맞게 사용합니다.</h2>
          <p>React와 TypeScript를 중심으로<br className={style.desktopBreak} /> 화면, 상태, 서비스 품질을 다룹니다.</p>
        </header>

        <div className={style.capabilities}>
          {capabilities.map((capability) => (
            <article key={capability.title} className={style.capability}>
              <div className={style.capabilityCopy}>
                <h3>{capability.title}</h3>
                <p>{capability.description}</p>
              </div>
              <ul className={style.stack} aria-label={`${capability.title}에 사용하는 기술`}>
                {capability.skills.map((name) => <li key={name}>{name}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <details className={style.details}>
          <summary className={style.summary}>
            <span>전체 기술과 숙련도</span>
            <span className={style.icon} aria-hidden="true" />
          </summary>
          <div className={style.detailsContent}>
            <dl className={style.legend}>
              <div>
                <dt>능숙 (상)</dt>
                <dd>내부 구조를 이해하고 주요 이슈를 해결할 수 있습니다.</dd>
              </div>
              <div>
                <dt>활용 (중)</dt>
                <dd>책이나 문서를 일부 참고하며 개발할 수 있습니다.</dd>
              </div>
              <div>
                <dt>기초 (하)</dt>
                <dd>기본 지식과 사용 경험이 있습니다.</dd>
              </div>
            </dl>
            <div className={style.categoryGrid}>
              {categories.map((category) => (
                <div key={category.title} className={style.category}>
                  <h3>{category.title}</h3>
                  <ul>
                    {category.skills.map((skill) => (
                      <li key={skill.name}>
                        <span>{skill.name}</span>
                        <span className={`${style.level} ${skill.proficiency === 3 ? style.proficient : ""}`}>
                          {proficiencyLabels[skill.proficiency]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </details>
      </div>
    </section>
  );
}
