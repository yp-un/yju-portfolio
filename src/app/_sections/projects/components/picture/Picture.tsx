import Image from "next/image";
import type { Project } from "@/app/_types/Project";
import style from "./Picture.module.scss";

export default function Picture({ project, idx }: { project: Project; idx: number }) {
	return (
		<Image
			className={style.img}
			src={`/${project.key}/images/light/${idx}.webp`}
			alt={`${project.title} 서비스 화면 ${idx}`}
			fill
			sizes="(max-width: 700px) 90vw, (max-width: 1200px) 45vw, 600px"
		/>
	);
}
