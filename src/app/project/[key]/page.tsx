import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectByKey, projects } from "@/app/_constants/projects";
import ProjectDetail from "@/app/_sections/projects/components/project-detail/ProjectDetail";
import style from "./page.module.scss";

interface Props {
	params: Promise<{ key: string }>;
}

export function generateStaticParams() {
	return projects.map((project) => ({ id: project.key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { key } = await params;
	const project = getProjectByKey(key);
	if (!project) return { title: "프로젝트" };

	const title = `${project.title} 프로젝트`;

	return {
		title,
		openGraph: {
			title,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/project/${key}`,
			images: {
				url: `${process.env.NEXT_PUBLIC_BASE_URL}/${key}/1.webp`,
				alt: title,
			},
		},
	};
}

export default async function ProjectPage({ params }: Props) {
	const { key } = await params;
	const project = getProjectByKey(key);

	if (!project) notFound();

	return (
		<section className={style.container}>
			<div className={style.inner}>
				<ProjectDetail project={project} />
			</div>
		</section>
	);
}
