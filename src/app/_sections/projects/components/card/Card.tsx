import Link from "next/link";
import type { Project } from "@/app/_types/Project";
import { getProjectPresentation } from "../../projectPresentation";
import Picture from "../picture/Picture";
import style from "./Card.module.scss";

export default function Card({ project }: { project: Project }) {
	const details = getProjectPresentation(project);

	return (
		<Link href={`/project/${project.key}`} scroll={false} className={style.card} aria-label={`${project.title} 프로젝트 상세 보기`} data-reveal>
			<div className={style.preview} style={{ backgroundColor: details.color }}>
				<div className={style.previewLabel}>
					<span>{details.label}</span>
					<span>{details.number} / 04</span>
				</div>
				<div className={style.browser}>
					<div className={style.browserBar} aria-hidden="true">
						<div className={style.dots}><i /><i /><i /></div>
						<span>{project.serviceUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}</span>
						<div className={style.browserIcon}>↗</div>
					</div>
					<div className={style.screenshot}><Picture project={project} idx={1} /></div>
				</div>
				<span className={style.previewCta} aria-hidden="true">프로젝트 보기 ↗</span>
			</div>
			<div className={style.content}>
				<div className={style.meta}><span>{details.role}</span><span>{details.date}</span></div>
				<div className={style.titleRow}>
					<h3>{project.title}</h3>
					<span className={style.arrow} aria-hidden="true">↗</span>
				</div>
				<p className={style.description}>{details.description}</p>
				<div className={style.foot}>
					<ul className={style.skills} aria-label="사용 기술">
						{project.skills.slice(0, 3).map((skill) => <li key={skill}>{skill}</li>)}
						{project.skills.length > 3 && <li>+{project.skills.length - 3}</li>}
					</ul>
					<span className={style.detailLink}>자세히 보기 <span aria-hidden="true">↗</span></span>
				</div>
			</div>
		</Link>
	);
}
