import { getProjectById, projects } from "@/app/_constants/projects";
import ProjectDetail from "@/app/_sections/projects/components/project-detail/ProjectDetail";
import { notFound } from "next/navigation";
import style from "./page.module.scss";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "프로젝트" };

  const title = `${project.title} 프로젝트`;

  return {
    title,
    openGraph: {
      title,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/project/${id}`,
      images: {
        url: project.thumbnail,
        alt: title,
      },
    },
  };
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
