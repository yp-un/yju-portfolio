"use client";

import { useEffect, useState, type CSSProperties, type PointerEvent } from "react";
import Link from "next/link";
import style from "./Main.module.scss";

const modes = ["Bloom", "Orbit", "Grid"] as const;
type Mode = (typeof modes)[number];

export default function Main() {
  const [mode, setMode] = useState<Mode>("Bloom");
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  const rotationDisabled = mode === "Grid" || reducedMotion;
  const rotationLabel = reducedMotion ? "모션 감소 설정으로 그래픽 회전이 꺼져 있습니다" : mode === "Grid" ? "Grid 모양은 회전하지 않습니다" : playing ? "그래픽 회전 일시정지" : "그래픽 회전 재생";

  function moveArtwork(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width - .5) * 22}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height - .5) * 22}px`);
  }

  return (
    <section id="Home" className={style.container} aria-labelledby="hero-heading">
      <div className={style.topline}>
        <span><span className={style.dot} /> FRONTEND DEVELOPER</span>
        <span className={style.edition}>A PORTFOLIO BY YANG JEONG UN</span>
      </div>
      <div className={style.hero}>
        <div className={style.copy}>
          <h1 id="hero-heading">Good code.<br />Better<br /><span>experiences.</span></h1>
          <p className={style.introduction}>사용자에게 닿는 모든 순간을 고민하는<br />프론트엔드 개발자 <strong>양정운</strong>입니다.</p>
          <div className={style.actions}>
            <Link className={style.primary} href="#Projects">프로젝트 살펴보기 <span aria-hidden="true">↗</span></Link>
            <Link className={style.secondary} href="#AboutMe">조금 더 알아보기 <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className={style.playground}>
          <div className={style.playgroundHeader}>
            <span><span className={style.liveDot} /> INTERACTION LAB</span>
            <span>EXPERIMENT 001</span>
          </div>
          <div className={style.canvas} onPointerMove={moveArtwork} onPointerLeave={(event) => {
            event.currentTarget.style.setProperty("--pointer-x", "0px");
            event.currentTarget.style.setProperty("--pointer-y", "0px");
          }}>
            <div className={style.crosshair} aria-hidden="true" />
            <div className={style.ring} aria-hidden="true" />
            <div className={style.artwork} aria-hidden="true">
              <div className={`${style.flower} ${mode === "Bloom" ? "" : style[mode.toLowerCase()]} ${!playing ? style.paused : ""}`}>
                {Array.from({ length: 8 }, (_, index) => {
                  const gridIndex = index >= 4 ? index + 1 : index;
                  return <span key={index} className={style.petal} style={{ "--i": index, "--grid-x": (gridIndex % 3 - 1) * 84, "--grid-y": (Math.floor(gridIndex / 3) - 1) * 84 } as CSSProperties} />;
                })}
              </div>
              <div className={style.core}><svg viewBox="0 0 48 48" fill="none"><path d="m15 15-9 9 9 9m18-18 9 9-9 9M28 10l-8 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
            </div>
            <span className={`${style.floatingTag} ${style.reactTag}`} aria-hidden="true"><span>✳</span> React</span>
            <span className={`${style.floatingTag} ${style.typeTag}`} aria-hidden="true"><span className={style.tsIcon}>TS</span> TypeScript</span>
            <span className={style.cursorTag} aria-hidden="true"><svg width="21" height="24" viewBox="0 0 21 24" fill="none"><path d="M2 2v18l5-5 4 7 4-2-4-7h8L2 2Z" fill="#20211f" stroke="#f7f8f4" strokeWidth="1.5" /></svg><span>user first</span></span>
            <span className={style.coordinate} aria-hidden="true">CREATIVITY × CODE</span>
          </div>
          <div className={style.playgroundFooter}>
            <div className={style.modes} role="group" aria-label="그래픽 모양 선택">
              {modes.map((item) => <button key={item} type="button" aria-pressed={mode === item} className={mode === item ? style.selected : ""} onClick={() => setMode(item)}>{item}</button>)}
            </div>
            <button type="button" className={style.playButton} disabled={rotationDisabled} aria-label={rotationLabel} title={rotationLabel} aria-pressed={rotationDisabled || !playing} onClick={() => setPlaying(!playing)}>{playing && !rotationDisabled ? <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3v10M11 3v10" stroke="currentColor" strokeWidth="2" /></svg> : <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m5 3 8 5-8 5Z" fill="currentColor" /></svg>}</button>
          </div>
          <p className={style.hint}>작은 움직임이 만드는 차이. 직접 바꿔보세요.</p>
        </div>
      </div>
      <div className={style.bottomline}>
        <div><span className={style.plus} aria-hidden="true">+</span> 깔끔한 코드, 자연스러운 인터랙션, 더 나은 경험.</div>
        <Link href="#Projects">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></Link>
      </div>
    </section>
  );
}
