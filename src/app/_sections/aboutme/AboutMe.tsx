import type { ReactNode } from "react";
import Accordion, { type AccordionItem } from "./components/accordion/Accordion";
import Timeline from "./components/timeline/Timeline";
import style from "./AboutMe.module.scss";

export interface Data {
  title: string;
  date: string;
  content?: ReactNode;
}

const internshipItems: AccordionItem[] = [
  {
    title: "성능 최적화",
    descriptions: [
      "Lighthouse 점검 결과 70점대에 머무르던 성능 지표를 분석하고 개선해 90점대로 높였습니다.",
      "최상위 컴포넌트의 불필요한 구독 구조를 개선해 전체 리렌더링을 줄였습니다.",
      "React Query 기반 캐싱을 적용해 API 중복 요청을 줄이고, 화면 표시 속도를 약 300ms 개선했습니다.",
      "약 1만 줄의 Dead Code를 정리해 코드베이스의 가독성을 높이고 유지보수 부담을 줄였습니다.",
    ],
  },
  {
    title: "디자인 시스템 정비",
    descriptions: [
      "Headless UI와 직접 구현한 컴포넌트가 혼재된 구조를 shadcn/ui 중심으로 통일해 재사용성과 유지보수성을 높였습니다.",
      "디자인 문서와 프론트엔드의 불일치를 해결하기 위해 디자인 변경사항을 토큰화하고, 프론트엔드에 자동으로 반영하는 파이프라인을 구축했습니다.",
    ],
  },
  {
    title: "신규 기능 개발",
    descriptions: [
      "디자인 문서를 바탕으로 신규 페이지를 퍼블리싱하고 UI를 구현했습니다.",
      "Toss Payments를 연동하고 결제 흐름을 개발했습니다.",
    ],
  },
  {
    title: "유지보수",
    descriptions: [
      "60건 이상의 QA 이슈를 분석하고 수정했습니다.",
      "QA 엔지니어와 협업해 반복 이슈에 대응하고 서비스 안정성을 개선했습니다.",
    ],
  },
];

const outcomes = [
  { result: "Lighthouse 70점대 → 90점대", description: "성능 병목 분석과 렌더링 구조 개선" },
  { result: "화면 표시 약 300ms 단축", description: "React Query 캐싱으로 중복 API 요청 감소" },
  { result: "60건 이상의 QA 이슈 해결", description: "QA 엔지니어와 협업하며 반복 문제 개선" },
  { result: "디자인 토큰 자동 반영", description: "디자인 문서와 프론트엔드의 일치 유지" },
];

export default function AboutMe({ company }: { company: string | string[] | undefined }) {
  const companyName = Array.isArray(company) ? company.join(", ") : company;
  const currentDate = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
  }).format(new Date()).replace("-", ".");

  const milestones: Data[] = [
    ...(companyName ? [{ title: `${companyName} 입사 지원`, date: currentDate }] : []),
    { title: "국립공주대학교 졸업", date: "2025.02", content: <p>컴퓨터공학부 소프트웨어전공</p> },
    { title: "정보처리기사 취득", date: "2024.09" },
    { title: "영천고등학교 졸업", date: "2019.02", content: <p>과학중점 고등학교</p> },
    { title: "출생", date: "2000.03" },
  ];

  return (
    <section id="AboutMe" className={style.container} aria-labelledby="experience-heading">
      <div className={style.wrapper}>
        <header className={style.header}>
          <h2 id="experience-heading">실제 서비스에서 쌓은 경험</h2>
          <p>화면 구현을 넘어 성능과 유지보수까지 살피며,<br className={style.desktopBreak} /> 팀이 함께 개선할 수 있는 프론트엔드를 만듭니다.</p>
        </header>

        <article className={style.experience}>
          <div className={style.role}>
            <h3>딥세일즈</h3>
            <p>프론트엔드 개발 인턴</p>
            <span>2025.04 ~ 2025.10</span>
          </div>
          <div className={style.work}>
            <ul className={style.outcomes} aria-label="인턴십 주요 성과">
              {outcomes.map(({ result, description }) => (
                <li key={result}>
                  <strong>{result}</strong>
                  <p>{description}</p>
                </li>
              ))}
            </ul>
            <Accordion items={internshipItems} />
          </div>
        </article>

        <div className={style.background}>
          <div className={style.backgroundHeading}>
            <h3>걸어온 길</h3>
            <p>소프트웨어 전공과 자격을 바탕으로<br className={style.desktopBreak} /> 개발 경험을 이어왔습니다.</p>
          </div>
          <ol className={style.timeline} aria-label="학력과 주요 이력">
            {milestones.map((data, index) => (
              <Timeline key={`${data.title}-${data.date}`} data={data} isEnd={index === milestones.length - 1} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
