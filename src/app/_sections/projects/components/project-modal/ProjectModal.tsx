"use client";

import type { Project } from "@/app/_types/Project";
import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import ProjectDetail from "../project-detail/ProjectDetail";
import style from "./ProjectModal.module.scss";

export default function ProjectModal({ project }: { project: Project }) {
	const router = useRouter();
	const dialogRef = useRef<HTMLDialogElement>(null);
	const closeModal = useCallback(() => {
		if (window.history.length > 1) router.back();
		else router.push("/#Projects");
	}, [router]);

	useEffect(() => {
		const dialog = dialogRef.current;
		const previousOverflow = document.body.style.overflow;
		const previousFocus = document.activeElement;
		document.body.style.overflow = "hidden";
		if (dialog && !dialog.open) dialog.showModal();

		return () => {
			dialog?.close();
			document.body.style.overflow = previousOverflow;
			if (previousFocus instanceof HTMLElement) previousFocus.focus({ preventScroll: true });
		};
	}, []);

	return (
		<dialog
			ref={dialogRef}
			className={style.container}
			aria-labelledby={`project-title-${project.key}`}
			onCancel={(event) => { event.preventDefault(); closeModal(); }}
			onClick={(event) => { if (event.target === event.currentTarget) closeModal(); }}
		>
			<div className={style.inner}>
				<div className={style.topBar}>
					<span>PROJECT DETAILS</span>
					<button type="button" className={style.close} onClick={closeModal} aria-label="프로젝트 상세 닫기" autoFocus>
						<span aria-hidden="true">✕</span>
					</button>
				</div>
				<ProjectDetail project={project} inModal />
			</div>
		</dialog>
	);
}
