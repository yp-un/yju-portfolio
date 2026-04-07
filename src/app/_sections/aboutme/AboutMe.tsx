"use client";

import Accordion, { type AccordionItem } from "./components/accordion/Accordion";
import Timeline from "./components/timeline/Timeline";
import Title from "../title/Title";
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
      "약 1만 줄 규모의 Dead Code를 정리해 코드베이스의 가독성을 높이고, 이후 유지보수 부담을 감소시켰습니다.",
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
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const formattedDate = `${year}.${month}`;

  const data: Data[] = [
    { title: "출생", date: "2000.03" },
    { title: "영천고등학교 졸업", date: "2019.02", content: <p>과학중점 고등학교</p> },
    { title: "정보처리기사 취득", date: "2024.09" },
    {
      title: "국립공주대학교 졸업",
      date: "2025.02",
      content: <p>컴퓨터공학부 소프트웨어전공</p>,
    },
    {
      title: "딥세일즈 인턴",
      date: "2025.04 ~ 2025.10",
      content: <Accordion items={internshipItems} />,
    },
    ...(company ? [{ title: company + " 입사 지원", date: formattedDate }] : []),
  ];

  data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <section id="AboutMe" className={style.container}>
      <Title title="AboutMe" />
      <div className={style.wrapper}>
        {data.map((v, i) => (
          <Timeline key={i} data={v} isEnd={i === data.length - 1} />
        ))}
      </div>
    </section>
  );
}
