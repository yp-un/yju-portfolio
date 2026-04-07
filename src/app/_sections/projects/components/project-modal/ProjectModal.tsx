"use client";

import type { Project } from "@/app/_types/Project";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ProjectDetail from "../project-detail/ProjectDetail";
import style from "./ProjectModal.module.scss";

interface Props {
  project: Project;
}

export default function ProjectModal({ project }: Props) {
  const router = useRouter();

  const closeModal = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className={style.container} onClick={closeModal}>
      <div className={style.inner} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={style.close} onClick={closeModal} aria-label="프로젝트 상세 닫기">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
          </svg>
        </button>
        <ProjectDetail project={project} />
      </div>
    </div>
  );
}
