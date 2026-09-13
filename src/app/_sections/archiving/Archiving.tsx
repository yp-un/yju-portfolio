import style from "./Archiving.module.scss";

export default function Archiving() {
  return (
    <section id="Archiving" className={style.container} aria-labelledby="archive-heading">
      <div className={style.heading} data-reveal>
        <div><span className={style.eyebrow}>04 — ARCHIVE</span><h2 id="archive-heading">배우고, 만들고, 기록합니다.</h2></div>
        <p>코드와 글에 담아둔<br />꾸준한 성장의 흔적들.</p>
      </div>
      <div className={style.links} data-reveal>
        <a href="https://github.com/yp-un" target="_blank" rel="noopener noreferrer" className={style.link}>
          <span className={style.icon}><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 .297C5.37.297 0 5.67 0 12.297c0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.04c-3.338.724-4.043-1.61-4.043-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.305-5.467-1.333-5.467-5.93 0-1.31.469-2.381 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.301 1.23A11.5 11.5 0 0 1 12 6.1c1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.652.242 2.873.119 3.176.77.839 1.235 1.91 1.235 3.22 0 4.609-2.807 5.624-5.479 5.921.43.373.823 1.102.823 2.222v3.293c0 .322.217.694.825.576C20.565 22.093 24 17.596 24 12.297 24 5.67 18.627.297 12 .297Z" /></svg></span>
          <span className={style.linkBody}><strong>GitHub</strong><span>아이디어가 코드가 되는 곳</span><small>github.com/yp-un</small></span><span className={style.arrow} aria-hidden="true">↗</span>
        </a>
        <a href="https://velog.io/@yp071704" target="_blank" rel="noopener noreferrer" className={style.link}>
          <span className={`${style.icon} ${style.velog}`}>v.</span><span className={style.linkBody}><strong>Velog</strong><span>경험을 기록하고 지식을 나누는 곳</span><small>velog.io/@yp071704</small></span><span className={style.arrow} aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
