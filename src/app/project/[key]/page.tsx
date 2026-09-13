import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectByKey, projects } from "@/app/_constants/projects";
import ProjectDetail from "@/app/_sections/projects/components/project-detail/ProjectDetail";
import style from "./page.module.scss";

interface Props {
	params: Promise<{ key: string }>;
}

export function generateStaticParams() {
	return projects.map((project) => ({ key: project.key }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { key } = await params;
	const project = getProjectByKey(key);
	if (!project) return { title: "프로젝트" };

	const title = `${project.title} 프로젝트`;
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yju-portfolio.com";

	return {
		title,
		description: project.introduce,
		openGraph: {
			title,
			url: `${baseUrl}/project/${key}`,
			images: {
				url: `${baseUrl}/${key}/images/light/1.webp`,
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
			<Link href="/#Projects" className={style.back}><span aria-hidden="true">←</span> 프로젝트 목록으로</Link>
			<div className={style.inner}>
				<ProjectDetail project={project} />
			</div>
		</section>
	);
}
