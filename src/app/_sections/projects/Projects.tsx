import { projects } from "@/app/_constants/projects";
import Card from "./components/card/Card";
import style from "./Projects.module.scss";

export default function Projects() {
  return (
    <section id="Projects" className={style.container} aria-labelledby="projects-title">
      <div className={style.wrapper}>
        <div className={style.heading}>
          <h2 id="projects-title">직접 만들고,<br />끝까지 고민한 프로젝트</h2>
          <p>
            화면을 만드는 일에서 서비스가 동작하는 구조까지.
            <br className={style.desktopBreak} /> 각 프로젝트에서 맡은 일과 선택의 이유를 정리했습니다.
          </p>
        </div>
        <div className={style.work}>
          {projects.map((project) => (
            <Card key={project.key} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
