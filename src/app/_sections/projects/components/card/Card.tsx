import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/app/_types/Project";
import style from "./Card.module.scss";

interface Props {
	project: Project;
}

interface CaseStudy {
  scope: string;
  date: string;
  role: string;
  description: string;
  decisions: string[];
  screenshot: number;
  imageAlt: string;
}

const caseStudies: Record<string, CaseStudy> = {
  yourmillionaire: {
    scope: "팀 프로젝트",
    date: "2026.05",
    role: "프론트엔드 개발, 배포 구조 설계",
    description: "랜딩과 대시보드를 분리한 AI 회계 서비스",
    decisions: [
      "Next.js 랜딩과 React 대시보드를 분리하고 공통 디자인 시스템 적용",
      "변경된 서비스만 빌드·배포하는 AWS 자동화 구성",
    ],
    screenshot: 2,
    imageAlt: "YourMillionaire 회계 대시보드의 거래 수집과 월간 현금 흐름 화면",
  },
  shathing: {
    scope: "개인 프로젝트",
    date: "2026.01 ~ 2026.03",
    role: "기획, 웹·앱과 백엔드 개발, 배포",
    description: "필요한 물건을 이웃과 빌리고 나누는 플랫폼",
    decisions: [
      "물건 공유부터 실시간 채팅까지 웹과 모바일 앱으로 구현",
      "클라이언트 직접 이미지 업로드와 무료 플랜 중심의 운영 구조 설계",
    ],
    screenshot: 2,
    imageAlt: "Shathing 물건 공유 목록과 지역·카테고리 검색 화면",
  },
  tripplai: {
    scope: "5인 팀 프로젝트",
    date: "2025.04 ~ 2025.10",
    role: "로그인, 결제, 축제 정보 페이지 개발",
    description: "AI 추천과 공공데이터로 계획하는 나만의 여행",
    decisions: [
      "Toss Payments 결제 흐름과 SSR 기반 축제 정보 페이지 구현",
      "2025 관광데이터 활용 공모전 예선 통과",
    ],
    screenshot: 1,
    imageAlt: "Tripplai AI 여행 계획 서비스의 여행지와 일정 입력 화면",
  },
  portfolio: {
    scope: "개인 프로젝트",
    date: "2025.01",
    role: "기획, 디자인, 개발, SEO 대응, 배포",
    description: "작업과 경험을 한곳에서 살펴보는 개발자 포트폴리오",
    decisions: [
      "화면 크기와 기기 테마에 맞춘 반응형 인터페이스",
      "공유 가능한 URL과 탐색 위치를 유지하는 프로젝트 상세 모달 구현",
    ],
    screenshot: 1,
    imageAlt: "양정운 포트폴리오의 이전 버전 소개와 연락처 화면",
  },
};

export default function Card({ project }: Props) {
  const study = caseStudies[project.key];

  return (
    <Link
      href={`/project/${project.key}`}
      className={style.link}
      aria-label={`${project.title} 프로젝트 상세 보기`}
    >
      <article className={style.card}>
        <div className={`${style.viewBox} ${style[project.key] ?? ""}`}>
          <div className={style.snapshot}>
            <Image
              src={`/${project.key}/images/light/${study?.screenshot ?? 1}.webp`}
              alt={study?.imageAlt ?? `${project.title} 서비스 화면`}
              width={1440}
              height={900}
              sizes="(max-width: 900px) calc(100vw - 48px), (max-width: 1296px) 55vw, 650px"
              className={style.lightImage}
            />
            <Image
              src={`/${project.key}/images/dark/${study?.screenshot ?? 1}.webp`}
              alt={study?.imageAlt ?? `${project.title} 서비스 화면`}
              width={1440}
              height={900}
              sizes="(max-width: 900px) calc(100vw - 48px), (max-width: 1296px) 55vw, 650px"
              className={style.darkImage}
            />
          </div>
        </div>
        <div className={style.text}>
          <div className={style.meta}>
            <span>{study?.scope ?? "프로젝트"}</span>
            {study && <span className={style.date}>{study.date}</span>}
          </div>
          <h3 className={style.title}>{project.title}</h3>
          <p className={style.introduce}>{study?.description ?? project.introduce}</p>
          {study && (
            <>
              <p className={style.role}>{study.role}</p>
              <ul className={style.decisions}>
                {study.decisions.map((decision) => <li key={decision}>{decision}</li>)}
              </ul>
            </>
          )}
          <ul className={style.skills} aria-label="사용 기술">
            {project.skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
          <span className={style.detail}>
            프로젝트 상세 보기
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m9 5 7 7-7 7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </article>
    </Link>
  );
}
