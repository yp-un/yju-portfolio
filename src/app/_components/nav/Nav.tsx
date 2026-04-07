"use client";

import { useEffect, useRef, useState } from "react";
import style from "./Nav.module.scss";
import { useScrollPosition } from "@/app/_hooks/useScrollPosition";
import useIsMobile from "@/app/_hooks/useIsMobile";
import Link from "next/link";
import { menu } from "@/app/_types/Menu";

export default function Nav() {
  const { currentY, previousY } = useScrollPosition();
  const isMobile = useIsMobile();
  const [showMenu, setShowMenu] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [showUp, setShowUp] = useState(false);
  const [showUpHover, setShowUpHover] = useState(false);

  const onClickMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (currentY < 100) {
      if (showUp) setShowUp(false);
      if (timer.current) clearTimeout(timer.current);
      return;
    }
    if (showUpHover) {
      if (timer.current) clearTimeout(timer.current);
      return;
    }
    if (timer.current) clearTimeout(timer.current);
    setShowUp(true);
    timer.current = setTimeout(() => {
      setShowUp(false);
      timer.current = null;
    }, 2000);
  }, [currentY, showUpHover]);

  return (
    <>
      <div
        className={`${style.container}
       ${currentY < previousY || currentY < 72 ? style.show : style.hide} ${
          currentY > 172 ? style.navBG : null
        }`}
      >
        <div className={style.navWraper}>
          <a
            href={process.env.NEXT_PUBLIC_BASE_URL as string}
            className={style.logo}
          >{`YJU's Portfolio`}</a>
          <>
            <ul className={`${style.ul} ${showMenu ? style.show : style.hide}`}>
              {menu.map((v, i) => (
                <li key={i} className={style.li}>
                  <Link href={`#${v}`}>{v}</Link>
                </li>
              ))}
            </ul>
            {isMobile ? (
              <div className={style.menuBtn} onClick={onClickMenu}>
                <div className={style.lineBox}>
                  {["top", "mid", "bot"].map((v, i) => (
                    <div
                      key={i}
                      className={`${style[v]} ${showMenu ? style.open : ""}`}
                    ></div>
                  ))}
                </div>
              </div>
            ) : null}
          </>
        </div>
      </div>
      <button
        style={showUp ? { display: "block" } : { display: "none" }}
        className={style.up}
        onClick={() => window.scrollTo(0, 0)}
        onMouseEnter={() => setShowUpHover(true)}
        onMouseLeave={() => setShowUpHover(false)}
      >
        <svg
          height={30}
          width={30}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M201.4 137.4c12.5-12.5 32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L224 205.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160z" />
        </svg>
      </button>
    </>
  );
}
