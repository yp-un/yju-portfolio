import Title from "@/app/_components/title/Title";
import { projects } from "@/app/_constants/projects";
import style from "./Projects.module.scss";
import Card from "./components/card/Card";

export default function Projects() {
  return (
    <section id="Projects" className={style.container}>
      <Title title="Projects" />
      <div className={style.wrapper}>
        <div className={style.inner}>
          {projects.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
