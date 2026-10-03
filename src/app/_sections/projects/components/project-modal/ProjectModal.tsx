"use client";

import type { Project } from "@/app/_types/Project";
import { useCallback, useEffect, useId, useRef } from "react";
import { useRouter } from "next/navigation";
import ProjectDetail from "../project-detail/ProjectDetail";
import style from "./ProjectModal.module.scss";

interface Props {
  project: Project;
}

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "iframe",
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable="true"]',
].join(", ");

export default function ProjectModal({ project }: Props) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const closeModal = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
      return;
    }

    router.push("/");
  }, [router]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const dialog = dialogRef.current;
    if (!overlay || !dialog) return;

    const activeElement = document.activeElement;
    const openingLink = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[href]")).find(
      (link) => link.getAttribute("href") === `/project/${project.key}`,
    );
    const previousFocus =
      activeElement instanceof HTMLElement &&
      activeElement !== document.body &&
      !overlay.contains(activeElement)
        ? activeElement
        : openingLink;
    const previousOverflow = document.body.style.overflow;
    const backgroundElements = new Map<HTMLElement, boolean>();

    let currentElement: HTMLElement | null = overlay;
    while (currentElement && currentElement !== document.body) {
      const parentElement: HTMLElement | null = currentElement.parentElement;
      if (!parentElement) break;

      Array.from(parentElement.children).forEach((element) => {
        if (element instanceof HTMLElement && element !== currentElement) {
          backgroundElements.set(element, element.inert);
          element.inert = true;
        }
      });
      currentElement = parentElement;
    }

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });

    const getFocusableElements = () =>
      Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) =>
          element.tabIndex >= 0 &&
          !element.closest("[inert]") &&
          element.getClientRects().length > 0 &&
          window.getComputedStyle(element).visibility !== "hidden",
      );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }
      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      if (!firstElement || !lastElement) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const focusedElement = document.activeElement;
      if (event.shiftKey && (focusedElement === firstElement || !dialog.contains(focusedElement))) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && (focusedElement === lastElement || !dialog.contains(focusedElement))) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    const keepFocusInDialog = (event: FocusEvent) => {
      if (event.target instanceof Node && !dialog.contains(event.target)) {
        closeButtonRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", keepFocusInDialog);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", keepFocusInDialog);
      backgroundElements.forEach((wasInert, element) => {
        element.inert = wasInert;
      });
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [closeModal, project.key]);

  return (
    <div ref={overlayRef} className={style.container} onClick={closeModal}>
      <div
        ref={dialogRef}
        className={style.inner}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={style.header}>
          <h2 id={titleId} className={style.title}>{project.title}</h2>
          <button
            ref={closeButtonRef}
            type="button"
            className={style.close}
            onClick={closeModal}
            aria-label={`${project.title} 상세 닫기`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className={style.document} role="document" aria-label={`${project.title} 상세 내용`}>
          <ProjectDetail project={project} />
        </div>
      </div>
    </div>
  );
}
