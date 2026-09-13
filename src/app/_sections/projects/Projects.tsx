"use client";

import { useState } from "react";
import { projects } from "@/app/_constants/projects";
import Card from "./components/card/Card";
import { getProjectPresentation } from "./projectPresentation";
import style from "./Projects.module.scss";

const filters = ["All", "AI", "Platform", "Portfolio"] as const;

export default function Projects() {
	const [filter, setFilter] = useState<(typeof filters)[number]>("All");
	const visibleProjects = projects.filter(
		(project) => filter === "All" || getProjectPresentation(project).category === filter,
	);

	return (
		<section id="Projects" className={style.container} aria-labelledby="projects-title">
			<div className={style.heading} data-reveal>
				<div>
					<p className={style.eyebrow}>01 — SELECTED WORK</p>
					<h2 id="projects-title">Selected work<span>.</span></h2>
				</div>
				<p className={style.intro}>
					생각을 코드로, 아이디어를 서비스로.<br />
					직접 만들고 배우며 쌓아온 프로젝트입니다.
				</p>
			</div>
			<div className={style.toolbar}>
				<div className={style.filters} role="group" aria-label="프로젝트 유형 필터">
					{filters.map((category) => (
						<button
							key={category}
							type="button"
							aria-pressed={filter === category}
							className={filter === category ? style.selected : ""}
							onClick={() => setFilter(category)}
						>
							{category}
							{category === "All" && <span>{String(projects.length).padStart(2, "0")}</span>}
						</button>
					))}
				</div>
				<p className={style.count} aria-live="polite" aria-atomic="true">
					{String(visibleProjects.length).padStart(2, "0")} PROJECTS
				</p>
			</div>
			<div className={style.grid}>
				{visibleProjects.map((project) => (
					<Card key={project.key} project={project} />
				))}
			</div>
		</section>
	);
}
