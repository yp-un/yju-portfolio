"use client";

import style from "./Card.module.scss";
import { useEffect, useRef, useState } from "react";

interface Card {
  title: string;
  svg: React.ReactElement;
  href: string;
  content: string;
}

interface Props {
  data: Card;
}

export default function Card({ data }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!window) return;
      if (window.innerWidth > 767) return;
      const turningPoint = (window.innerHeight / 3) * 2; // 뷰포트의 2/3 지점
      if (!ref.current) return;
      const y = ref.current.getBoundingClientRect().y;
      setActive(y < turningPoint);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      href={`https://${data.href}`}
      className={`${style.card} ${active ? style.active : ""}`}
    >
      <div ref={ref} className={style.bg}>
        <span className={style.link}>{data.href}</span>
        <p>{data.content}</p>
      </div>
      <div className={style.fg}>
        <div className={data.title === "GitHub" ? style.github : ""}>{data.svg}</div>
        <h3>{data.title}</h3>
      </div>
    </a>
  );
}
