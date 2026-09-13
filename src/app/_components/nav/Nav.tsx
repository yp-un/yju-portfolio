"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import style from "./Nav.module.scss";

const items = [
  { id: "Projects", label: "Projects" },
  { id: "AboutMe", label: "About" },
  { id: "Skills", label: "Skills" },
  { id: "Archiving", label: "Archive" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const progress = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${height > 0 ? window.scrollY / height : 0})`;
      setScrolled(window.scrollY > 400);
      const sections = [...items.map((item) => item.id), "Contact"];
      let current = "";
      for (const id of sections) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= window.innerHeight * .4) current = id;
      }
      setActive(current);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const background = Array.from(document.querySelectorAll<HTMLElement>("body > main, body > footer"));
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => { element.inert = true; });
    navigation.current?.querySelector<HTMLAnchorElement>("ul a")?.focus();
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
      if (event.key !== "Tab") return;
      const controls = Array.from(navigation.current?.querySelectorAll<HTMLElement>("a, button") ?? [])
        .filter((element) => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 768px)");
    const resize = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", resize);
    document.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = previous;
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      document.removeEventListener("keydown", close);
      desktop.removeEventListener("change", resize);
    };
  }, [open]);

  return (
    <>
      <div ref={navigation} className={style.container}>
        <div className={style.inner}>
          <Link href="/" className={style.logo} aria-label="양정운 포트폴리오 홈" onClick={() => setOpen(false)}>yju<span>✳</span></Link>
          <ul id="site-navigation" className={`${style.links} ${open ? style.open : ""}`}>
            {items.map((item) => <li key={item.id}><Link href={`/#${item.id}`} aria-current={active === item.id ? "location" : undefined} onClick={() => setOpen(false)}>{item.label}<span aria-hidden="true">↗</span></Link></li>)}
            <li className={style.mobileContact}><Link href="/#Contact" onClick={() => setOpen(false)}>Let’s talk <span aria-hidden="true">↗</span></Link></li>
          </ul>
          <Link href="/#Contact" className={style.contact} onClick={() => setOpen(false)}>Let’s talk <span aria-hidden="true">↗</span></Link>
          <button ref={toggle} type="button" className={`${style.toggle} ${open ? style.open : ""}`} aria-label={open ? "메뉴 닫기" : "메뉴 열기"} aria-expanded={open} aria-controls="site-navigation" onClick={() => setOpen(!open)}><span /><span /></button>
        </div>
        <div ref={progress} className={style.progress} aria-hidden="true" />
      </div>
      {open && <button type="button" className={style.backdrop} aria-label="메뉴 닫기" tabIndex={-1} onClick={() => setOpen(false)} />}
      {scrolled && <button type="button" className={style.backToTop} aria-label="맨 위로 이동" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>↑</button>}
    </>
  );
}
