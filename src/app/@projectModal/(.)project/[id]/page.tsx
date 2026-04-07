import { getProjectById } from "@/app/_constants/projects";
import ProjectModal from "@/app/_sections/projects/components/project-modal/ProjectModal";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectModalPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) notFound();

  return <ProjectModal project={project} />;
}
