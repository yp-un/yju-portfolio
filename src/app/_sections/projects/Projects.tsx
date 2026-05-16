import Title from "@/app/_components/title/Title";
import { projects } from "@/app/_constants/projects";
import Card from "./components/card/Card";
import style from "./Projects.module.scss";

export default function Projects() {
	return (
		<section id="Projects" className={style.container}>
			<Title title="Projects" />
			<div className={style.wrapper}>
				<div className={style.inner}>
					{projects.map((project) => (
						<Card key={project.key} project={project} />
					))}
				</div>
			</div>
		</section>
	);
}
