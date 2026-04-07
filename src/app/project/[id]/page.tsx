import { getProjectById, projects } from "@/app/_constants/projects";
import ProjectDetail from "@/app/_sections/projects/components/project-detail/ProjectDetail";
import { notFound } from "next/navigation";
import style from "./page.module.scss";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) notFound();

  return (
    <section className={style.container}>
      <div className={style.inner}>
        <ProjectDetail project={project} />
      </div>
    </section>
  );
}
