import { notFound } from "next/navigation";
import { getProjectByKey } from "@/app/_constants/projects";
import ProjectModal from "@/app/_sections/projects/components/project-modal/ProjectModal";

interface Props {
	params: Promise<{ key: string }>;
}

export default async function ProjectModalPage({ params }: Props) {
	const { key } = await params;
	const project = getProjectByKey(key);

	if (!project) notFound();

	return <ProjectModal project={project} />;
}
