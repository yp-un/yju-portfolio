"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import style from "./Nav.module.scss";

const navigationLinks = [
  { label: "프로젝트", href: "/#Projects" },
  { label: "소개", href: "/#AboutMe" },
  { label: "기술", href: "/#Skills" },
  { label: "기록", href: "/#Archiving" },
  { label: "연락하기", href: "/#Contact" },
] as const;

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsMenuOpen(false);
      menuButtonRef.current?.focus();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 761px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };

    desktopMedia.addEventListener("change", closeOnDesktop);
    return () => desktopMedia.removeEventListener("change", closeOnDesktop);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <div className={style.container}>
      <div className={style.inner}>
        <Link className={style.brand} href="/" onClick={closeMenu} aria-label="양정운 포트폴리오 홈">
          <span className={style.name}>양정운</span>
          <span className={style.role}>Frontend developer</span>
        </Link>

        <button
          ref={menuButtonRef}
          className={style.menuButton}
          type="button"
          aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={isMenuOpen}
          aria-controls={menuId}
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span className={`${style.menuIcon} ${isMenuOpen ? style.menuIconOpen : ""}`} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>

        <ul id={menuId} className={`${style.links} ${isMenuOpen ? style.linksOpen : ""}`}>
          {navigationLinks.map(({ label, href }) => (
            <li key={href}>
              <Link className={href === "/#Contact" ? style.contactLink : style.sectionLink} href={href} onClick={closeMenu}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
