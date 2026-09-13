"use client";

import { A11y, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Project } from "@/app/_types/Project";
import { getProjectPresentation } from "../../projectPresentation";
import Markdown from "../Markdown";
import Picture from "../picture/Picture";
import style from "./ProjectDetail.module.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface Props {
	project: Project;
	inModal?: boolean;
}

export default function ProjectDetail({ project, inModal = false }: Props) {
	const details = getProjectPresentation(project);
	const Heading = inModal ? "h2" : "h1";

	return (
		<article className={style.container}>
			<header className={style.header}>
				<p className={style.eyebrow}>{details.number} — {details.label}</p>
				<Heading id={`project-title-${project.key}`}>{project.title}</Heading>
				<p className={style.description}>{details.description}</p>
				<div className={style.meta}>
					<span>{details.role}</span><span>{details.date}</span>
				</div>
				<ul className={style.skills} aria-label="사용 기술">
					{project.skills.map((skill) => <li key={skill}>{skill}</li>)}
				</ul>
				<div className={style.links}>
					<a href={project.serviceUrl} target="_blank" rel="noopener noreferrer">
						서비스 열기 <span aria-hidden="true">↗</span>
						<span className={style.srOnly}> (새 탭)</span>
					</a>
					<a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
						GitHub <span aria-hidden="true">↗</span>
						<span className={style.srOnly}> (새 탭)</span>
					</a>
				</div>
				{project.key === "tripplai" && (
					<p className={style.notice}>백엔드 운영이 중단되어 일부 서비스 기능이 제한될 수 있습니다.</p>
				)}
			</header>
			<div className={style.gallery} style={{ backgroundColor: details.color }}>
				<Swiper
					slidesPerView={1}
					loop={false}
					pagination={project.imgCnt > 1 ? { clickable: true } : false}
					navigation={project.imgCnt > 1}
					keyboard={{ enabled: true, onlyInViewport: true }}
					a11y={{
						prevSlideMessage: "이전 프로젝트 화면",
						nextSlideMessage: "다음 프로젝트 화면",
						paginationBulletMessage: "{{index}}번 프로젝트 화면 보기",
					}}
					modules={[Pagination, Navigation, Keyboard, A11y]}
				>
					{Array.from({ length: project.imgCnt }, (_, idx) => (
						<SwiperSlide key={`${project.key}-${idx}`}>
							<div className={style.img}><Picture project={project} idx={idx + 1} /></div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<div className={style.markdown} data-color-mode="light">
				<Markdown projectKey={project.key} />
			</div>
			<footer className={style.foot}>
				<span>더 자세한 구현이 궁금하다면</span>
				<a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
					GitHub에서 코드 보기 <span aria-hidden="true">↗</span>
					<span className={style.srOnly}> (새 탭)</span>
				</a>
			</footer>
		</article>
	);
}
