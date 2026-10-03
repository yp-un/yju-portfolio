"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./Main.module.scss";

const previews = [
  {
    key: "yourmillionaire",
    name: "YourMillionaire",
    description: "AI 회계 서비스의 랜딩과 대시보드",
    focus: "공통 디자인 시스템과 AWS 배포 구조",
    image: "/yourmillionaire/images/light/2.webp",
  },
  {
    key: "shathing",
    name: "Shathing",
    description: "필요한 물건을 이웃과 나누는 플랫폼",
    focus: "웹부터 모바일 앱, 실시간 채팅까지",
    image: "/shathing/images/light/2.webp",
  },
  {
    key: "tripplai",
    name: "Tripplai",
    description: "AI와 함께 만드는 나만의 여행 계획",
    focus: "로그인, 결제, 축제 정보 페이지 구현",
    image: "/tripplai/images/light/1.webp",
  },
];

export default function Main() {
  const [selected, setSelected] = useState(0);
  const project = previews[selected];

  return (
    <section id="Home" className={style.container} aria-labelledby="intro-heading">
      <div className={style.inner}>
        <div className={style.intro}>
          <p className={style.identity}>개발자 양정운</p>
          <h1 id="intro-heading">사용하기 좋은<br />화면을 만듭니다.</h1>
          <p className={style.description}>
            반응형 UI부터 디자인 시스템, 배포까지.<br />
            사용자 경험을 코드와 구조로 연결합니다.
          </p>
          <div className={style.actions}>
            <a href="#Projects" className={style.primary}>프로젝트 보기</a>
            <a href="#AboutMe" className={style.secondary}>어떤 개발자인가요?</a>
          </div>
          <ul className={style.stack} aria-label="주로 사용하는 기술">
            <li>React</li><li>Next.js</li><li>TypeScript</li>
          </ul>
        </div>
        <div className={style.workbench}>
          <div className={style.projectPicker} role="group" aria-label="프로젝트 미리보기 선택">
            {previews.map((preview, index) => (
              <button
                key={preview.key}
                type="button"
                aria-pressed={selected === index}
                aria-controls="project-preview"
                className={`${style.projectButton} ${selected === index ? style.selected : ""}`}
                onClick={() => setSelected(index)}
              >{preview.name}</button>
            ))}
          </div>
          <div id="project-preview" className={style.preview}>
            <div className={style.browserBar}>
              <span className={style.windowDots} aria-hidden="true"><i /><i /><i /></span>
              <span>{project.name}</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" width="16" height="16"><rect x="3" y="4" width="14" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5" /><path d="M3 8h14" stroke="currentColor" strokeWidth="1.5" /></svg>
            </div>
            <Link className={style.screen} href={`/project/${project.key}`} aria-label={`${project.name} 프로젝트 상세 보기`}>
              <Image
                src={project.image}
                alt={`${project.name}의 실제 서비스 화면`}
                fill
                sizes="(max-width: 760px) calc(100vw - 48px), (max-width: 1200px) 50vw, 550px"
                priority={selected === 0}
              />
            </Link>
          </div>
          <div className={style.caption} aria-live="polite" aria-atomic="true">
            <div><p>{project.description}</p><span>{project.focus}</span></div>
            <Link href={`/project/${project.key}`} className={style.detail}>자세히 보기</Link>
          </div>
        </div>
      </div>
      <div className={style.heroFoot}>
        <span>화면에 담긴 결과, 그 뒤의 고민까지.</span>
        <a href="#Projects" aria-label="프로젝트 목록으로 이동"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4v16m-6-6 6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></a>
      </div>
    </section>
  );
}
