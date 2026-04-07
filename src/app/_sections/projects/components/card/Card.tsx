"use client";

import type { Project } from "@/app/_types/Project";
import style from "./Card.module.scss";
import Image from "next/image";
import { useModalStore } from "@/store/modal";
import { useScrollTrigger } from "@/app/_hooks/useScrollTrigger";
import { useRouter } from "next/navigation";

interface Props {
  project: Project;
}

export default function Card({ project }: Props) {
  const { active, ref } = useScrollTrigger({ onece: true });
  const modalStore = useModalStore();
  const router = useRouter();
  const openModal = (data: Project) => {
    modalStore.setData(data);
    modalStore.setOpen(true);
    router.push("?modal=open", { scroll: false });
  };

  return (
    <div ref={ref} className={`${style.card} ${active ? style.active : ""}`} onClick={() => openModal(project)}>
      <div className={style.viewBox}>
        <Image className={style.img} fill src={project.thumbnail} alt={project.title + "이미지"} />
      </div>
      <div className={style.text}>
        <h3 className={style.title}>{project.title}</h3>
        <p className={style.introduce}>{project.introduce}</p>
        <div className={style.skills}>
          {project.skills.map((skill, idx) => (
            <span key={idx} className={style.skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
