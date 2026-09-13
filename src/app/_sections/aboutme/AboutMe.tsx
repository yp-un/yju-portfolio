"use client";

import Accordion, { type AccordionItem } from "./components/accordion/Accordion";
import Timeline from "./components/timeline/Timeline";
import style from "./AboutMe.module.scss";

export interface Data {
  title: string;
  date: string;
  content?: React.ReactNode;
}

const internshipItems: AccordionItem[] = [
  {
    title: "디자인 시스템 정비",
    descriptions: [
      "Headless UI, 직접 구현 등으로 혼재되어 있던 공통 컴포넌트를 shadcn/ui 중심으로 통일하여 재사용성과 유지보수성을 향상",
      "디자인 문서와 프론트엔드 간 불일치 문제를 구조적 이슈로 판단하고, 디자인 시스템 변경사항을 토큰화해 프론트엔드에 자동 반영되는 파이프라인 구축",
    ],
  },
  {
    title: "성능 최적화",
    descriptions: [
      "Lighthouse 점검 결과 70점대에 머무르던 성능 지표를 분석·개선하여 90점대로 향상",
      "최상위 컴포넌트의 불필요한 구독 구조를 개선해 전체 리렌더링 감소",
      "React Query 기반 캐싱 구조를 적용해 API 중복 요청을 줄이고, 약 300ms의 화면 표시 속도 개선",
      "약 1만 줄 규모의 Dead Code를 정리해 코드베이스의 가독성을 높이고, 이후 유지보수 부담을 감소",
    ],
  },
  {
    title: "신규 기능 개발",
    descriptions: [
      "디자인 문서를 바탕으로 신규 페이지 퍼블리싱 및 UI 구현",
      "Toss Payments 결제 기능 연동 및 결제 흐름 개발",
    ],
  },
  {
    title: "유지보수",
    descriptions: [
      "60건 이상의 QA 이슈 분석 및 수정",
      "QA 엔지니어와 협업하여 반복 이슈에 대응하고 서비스 안정성을 개선",
    ],
  },
];

export default function AboutMe({ company }: { company: string | string[] | undefined }) {
  const companyName = Array.isArray(company) ? company.join(", ") : company;
  const now = new Date();
  const formattedDate = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, "0")}`;
  const experience: Data[] = [
    ...(companyName ? [{ title: `${companyName} 입사 지원`, date: formattedDate }] : []),
    {
      title: "딥세일즈",
      date: "2025.04 — 2025.10",
      content: (
        <>
          <p className={style.role}>프론트엔드 개발 인턴</p>
          <p className={style.experienceIntro}>
            디자인 시스템부터 성능 최적화까지, 실제 서비스의 경험과 완성도를 개선했습니다.
          </p>
          <div className={style.metrics}>
            <div><strong>90<span>점대</span></strong><p>Lighthouse 성능 · 70점대에서 개선</p></div>
            <div><strong>300<span>ms</span></strong><p>화면 표시 시간 약 300ms 단축</p></div>
            <div><strong>60<span>+</span></strong><p>QA 이슈 해결</p></div>
          </div>
          <Accordion items={internshipItems} />
        </>
      ),
    },
    {
      title: "국립공주대학교 졸업",
      date: "2025.02",
      content: <p>컴퓨터공학부 소프트웨어전공</p>,
    },
    { title: "정보처리기사 취득", date: "2024.09" },
    {
      title: "영천고등학교 졸업",
      date: "2019.02",
      content: <p>과학중점 고등학교</p>,
    },
  ];

  return (
    <section id="AboutMe" className={style.container} aria-labelledby="about-title">
      <div className={style.wrapper}>
        <div className={style.introduction} data-reveal>
          <p className={style.kicker}>02 — ABOUT ME</p>
          <h2 id="about-title">화면 너머의<br />경험을 생각합니다<span>.</span></h2>
          <p className={style.description}>
            사용자가 느끼는 작은 불편에서 시작해,<br /> 더 나은 인터페이스를 만듭니다.
          </p>
          <p className={style.narrative}>
            실제 서비스를 개발하며 컴포넌트의 재사용성, 렌더링 성능, 그리고 팀이 함께 관리할 수 있는 코드의 중요성을 배웠습니다. 보기 좋은 화면에 편안한 사용 경험을 더하는 개발을 지향합니다.
          </p>
          <div className={style.profileNote}>
            <span className={style.noteIcon} aria-hidden="true">↗</span>
            <div><strong>배우고, 만들고, 개선합니다.</strong><p>2000.03 출생 · 소프트웨어 전공</p></div>
          </div>
        </div>
        <div className={style.timeline}>
          <p className={style.timelineLabel}>EXPERIENCE & EDUCATION</p>
          {experience.map((item, index) => (
            <Timeline key={`${item.title}-${item.date}`} data={item} isEnd={index === experience.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
