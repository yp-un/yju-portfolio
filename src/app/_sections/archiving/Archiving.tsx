import style from "./Archiving.module.scss";

const archives = [
  { name: "GitHub", href: "https://github.com/yp-un", address: "github.com/yp-un", description: "프로젝트의 코드와 구현 과정을 공개합니다.", mark: "{ }" },
  { name: "Velog", href: "https://velog.io/@yp071704", address: "velog.io/@yp071704", description: "개발 중 만난 문제와 배운 내용을 기록합니다.", mark: "v" },
];

export default function Archiving() {
  return (
    <section id="Archiving" className={style.container} aria-labelledby="archive-heading">
      <div className={style.inner}>
        <div className={style.heading}><h2 id="archive-heading">코드와 글로 남기는 기록</h2><p>결과만큼, 만들어가는 과정도 소중하게 생각합니다.</p></div>
        <div className={style.links}>
          {archives.map((archive) => (
            <a key={archive.name} className={style.archive} href={archive.href} target="_blank" rel="noopener noreferrer">
              <span className={style.mark} aria-hidden="true">{archive.mark}</span>
              <div><h3>{archive.name}<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M7 17 17 7M7 7h10v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></h3><p>{archive.description}</p><span className={style.address}>{archive.address}</span></div>
              <span className={style.srOnly}>(새 탭에서 열림)</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
