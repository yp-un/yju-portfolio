"use client";

import { type KeyboardEvent, useRef, useState } from "react";
import SkillButton from "./components/skill/Skill";
import style from "./Skills.module.scss";

export interface Skill {
  name: string;
  short: string;
  color: { bg: string; fg: "white" | "black" };
  proficiency: 1 | 2 | 3;
}

interface Category {
  title: string;
  description: string;
  symbol: string;
  skills: Skill[];
}

const data: Category[] = [
  {
    title: "Frontend",
    description: "사용자와 가장 가까운 곳",
    symbol: "</>",
    skills: [
      { name: "Next.js", short: "N", color: { bg: "black", fg: "white" }, proficiency: 3 },
      { name: "React", short: "Re", color: { bg: "#61DAFB", fg: "black" }, proficiency: 3 },
      { name: "Redux", short: "Rx", color: { bg: "#764ABC", fg: "white" }, proficiency: 2 },
      { name: "Zustand", short: "Zu", color: { bg: "rgb(73,31,31)", fg: "white" }, proficiency: 3 },
      { name: "React Query", short: "Rq", color: { bg: "#0769AD", fg: "white" }, proficiency: 3 },
      { name: "Jest", short: "Je", color: { bg: "#C21325", fg: "white" }, proficiency: 2 },
      { name: "Cypress", short: "Cy", color: { bg: "#69D3A7", fg: "white" }, proficiency: 1 },
      { name: "Storybook", short: "Sb", color: { bg: "#FF4785", fg: "white" }, proficiency: 1 },
      { name: "Sass", short: "Sa", color: { bg: "#CC6699", fg: "white" }, proficiency: 2 },
      { name: "Tailwind CSS", short: "Tw", color: { bg: "#06B6D4", fg: "white" }, proficiency: 3 },
      { name: "styled-components", short: "sc", color: { bg: "#DB7093", fg: "white" }, proficiency: 2 },
    ],
  },
  {
    title: "Language",
    description: "생각을 코드로 옮기는 기본",
    symbol: "{ }",
    skills: [
      { name: "TypeScript", short: "TS", color: { bg: "#3178C6", fg: "white" }, proficiency: 3 },
      { name: "JavaScript", short: "JS", color: { bg: "#F7DF1E", fg: "black" }, proficiency: 3 },
      { name: "Java", short: "Ja", color: { bg: "#007396", fg: "white" }, proficiency: 1 },
      { name: "Python", short: "Py", color: { bg: "#3776AB", fg: "white" }, proficiency: 1 },
      { name: "C", short: "C", color: { bg: "#A8B9CC", fg: "white" }, proficiency: 1 },
    ],
  },
  {
    title: "Backend",
    description: "화면을 지탱하는 구조",
    symbol: "[ ]",
    skills: [
      { name: "Node.js", short: "No", color: { bg: "#5FA04E", fg: "white" }, proficiency: 1 },
      { name: "Express", short: "Ex", color: { bg: "black", fg: "white" }, proficiency: 1 },
      { name: "Nest.js", short: "Ne", color: { bg: "#E0234E", fg: "white" }, proficiency: 1 },
      { name: "Type ORM", short: "Or", color: { bg: "#FE0803", fg: "white" }, proficiency: 1 },
      { name: "MongoDB", short: "Mo", color: { bg: "#47A248", fg: "white" }, proficiency: 1 },
      { name: "PostgreSQL", short: "Pg", color: { bg: "#4169E1", fg: "white" }, proficiency: 1 },
    ],
  },
  {
    title: "DevOps",
    description: "만든 것을 세상과 연결",
    symbol: "↗",
    skills: [
      { name: "Vercel", short: "Ve", color: { bg: "black", fg: "white" }, proficiency: 3 },
      { name: "AWS", short: "Aw", color: { bg: "#232F3E", fg: "white" }, proficiency: 1 },
    ],
  },
];

const levels = {
  3: { label: "상", description: "주요 이슈를 트러블슈팅할 수 있을 정도로 내부 구조를 이해하고 있습니다." },
  2: { label: "중", description: "책이나 인터넷 등 일부 참고 자료를 통해 개발할 수 있습니다." },
  1: { label: "하", description: "세부 구조에는 익숙하지 않지만, 기본적인 지식과 사용 경험이 있습니다." },
};

const categories = ["All tools", ...data.map((category) => category.title)];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("All tools");
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const visibleCategories = activeCategory === "All tools" ? data : data.filter((category) => category.title === activeCategory);

  function selectCategory(category: string) {
    setActiveCategory(category);
    setSelectedSkill(null);
  }

  function handleTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number;
    if (event.key === "ArrowRight") nextIndex = (index + 1) % categories.length;
    else if (event.key === "ArrowLeft") nextIndex = (index - 1 + categories.length) % categories.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = categories.length - 1;
    else return;

    event.preventDefault();
    selectCategory(categories[nextIndex]);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <section id="Skills" className={style.container} aria-labelledby="skills-title">
      <div className={style.wrapper}>
        <div className={style.heading} data-reveal>
          <div>
            <p className={style.kicker}>03 — TOOLKIT</p>
            <h2 id="skills-title">아이디어를 구현하는 도구들<span>.</span></h2>
          </div>
          <p className={style.intro}>React와 TypeScript를 중심으로,<br />필요한 기술을 배우며 가능성을 넓혀갑니다.</p>
        </div>

        <div className={style.tabs} role="tablist" aria-label="기술 분야">
          {categories.map((category, index) => {
            const count = category === "All tools" ? data.reduce((sum, item) => sum + item.skills.length, 0) : data.find((item) => item.title === category)!.skills.length;
            return (
              <button
                key={category}
                type="button"
                role="tab"
                id={`skills-tab-${index}`}
                aria-selected={category === activeCategory}
                aria-controls="skills-panel"
                tabIndex={category === activeCategory ? 0 : -1}
                className={style.tab}
                ref={(element) => { tabRefs.current[index] = element; }}
                onClick={() => selectCategory(category)}
                onKeyDown={(event) => handleTabKey(event, index)}
              >
                {category}<span>{String(count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        <div
          id="skills-panel"
          role="tabpanel"
          aria-labelledby={`skills-tab-${categories.indexOf(activeCategory)}`}
          tabIndex={0}
          className={style.groups}
        >
          {visibleCategories.map((category) => {
            const selected = category.skills.find((skill) => skill.name === selectedSkill);
            const panelId = `skill-detail-${category.title.toLowerCase()}`;
            return (
              <div key={category.title} className={style.group}>
                <div className={style.groupHeading} data-reveal>
                  <span className={style.symbol} aria-hidden="true">{category.symbol}</span>
                  <div><h3>{category.title}</h3><p>{category.description}</p></div>
                </div>
                <div className={style.groupContent}>
                  <div className={style.skills}>
                    {category.skills.map((skill) => (
                      <SkillButton
                        key={skill.name}
                        skill={skill}
                        selected={skill.name === selectedSkill}
                        panelId={panelId}
                        onSelect={() => setSelectedSkill(skill.name === selectedSkill ? null : skill.name)}
                      />
                    ))}
                  </div>
                  <div id={panelId} className={style.detail} hidden={!selected} role="status">
                    {selected && (
                      <>
                        <div className={style.detailHeading}>
                          <strong>{selected.name}</strong>
                          <span className={style.level}>숙련도 {levels[selected.proficiency].label}
                            <span className={style.levelBars} aria-hidden="true">
                              {[1, 2, 3].map((level) => <i key={level} data-filled={level <= selected.proficiency} />)}
                            </span>
                          </span>
                        </div>
                        <p>{levels[selected.proficiency].description}</p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className={style.hint}><span aria-hidden="true">↳</span> 기술을 선택하면 숙련도와 기준을 확인할 수 있습니다.</p>
      </div>
    </section>
  );
}
