"use client";

import Timeline from "./components/timeline/Timeline";
import Title from "../title/Title";
import style from "./AboutMe.module.scss";

export interface Data {
  title: string;
  date: string;
  content?: string | React.ReactNode;
}

export default function AboutMe({ company }: { company: string | string[] | undefined }) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const formattedDate = `${year}.${month}`;

  const data: Data[] = [
    { title: "출생", date: "2000.03" },
    { title: "영천고등학교 졸업", date: "2019.02", content: "과학중점 고등학교" },
    { title: "정보처리기사 취득", date: "2024.09" },
    {
      title: "국립공주대학교 졸업",
      date: "2025.02",
      content: "컴퓨터공학부 소프트웨어전공",
    },
    {
      title: "딥세일즈 인턴",
      date: "2025.04 ~ 2025.10",
      content:
        "1. 성능 최적화\nReact Developer Tools를 활용해 컴포넌트 최상단의 구독 상태로 인해 불필요한 전체 리렌더링이 발생하는 문제를 발견하고, 구독 상태를 하위 컴포넌트로 분리하여 렌더링 성능과 사용성을 개선했습니다.\n반복적으로 요청되던 데이터를 React Query로 캐싱하여 로딩 시간을 단축하고, 불필요한 네트워크 요청을 줄여 서비스 효율성을 개선했습니다.\n\n2. 구조 개선\n기존 DDD 기반 폴더 구조에서 도메인별 파일이 여러 계층에 분산되어 기능 단위 파악이 어렵고 수정 누락 가능성이 있는 문제를 확인했습니다. 이를 해결하기 위해 FSD 아키텍처를 도입해 feature를 최상위 기준으로 재구성하고, 기능 단위 응집도를 높여 코드 탐색성과 유지보수성을 개선했습니다.\n약 1만 줄 규모의 Dead Code를 정리해 코드베이스의 가독성을 높이고, 이후 유지보수 부담을 감소시켰습니다.\n\n3. 기능 개발\n디자이너가 정의한 디자인 문서를 기준으로 신규 페이지를 개발하였습니다. Toss Payments 결제 연동을 포함한 핵심 기능 구현을 담당해 서비스 기능 확장에 기여했습니다.\n위 과정에서 Frontend와 Figma 간 불일치 요소를 식별해 누락을 방지하는 협업 파이프라인을 구축했습니다. 또한 디자인 시스템을 shadcn/ui 기반으로 통일하는 리팩토링을 진행했습니다.\n\n4. 유지보수\nQA 엔지니어와 협업하며 다수의 QA 이슈를 분석·처리해 서비스 전반의 버그를 수정하고 안정성을 개선했습니다.",
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
