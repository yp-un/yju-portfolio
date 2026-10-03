import type { Project } from "@/app/_types/Project";
import style from "./Picture.module.scss";

export default function Picture({
	project,
	idx,
}: {
	project: Project;
	idx: number;
}) {
	return (
		<picture className={style.picture}>
			<source
				srcSet={`/${project.key}/images/dark/${idx}.webp`}
				media="(prefers-color-scheme: dark)"
			/>
			<img
				className={style.img}
				src={`/${project.key}/images/light/${idx}.webp`}
				alt={`${project.title} 이미지 ${idx}`}
			/>
		</picture>
	);
}
