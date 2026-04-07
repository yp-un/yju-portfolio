import Card from "./components/card/Card";
import Title from "../title/Title";
import style from "./Main.module.scss";

const data = [
  {
    title: "Email",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path d="M64 112c-8.8 0-16 7.2-16 16l0 22.1L220.5 291.7c20.7 17 50.4 17 71.1 0L464 150.1l0-22.1c0-8.8-7.2-16-16-16L64 112zM48 212.2L48 384c0 8.8 7.2 16 16 16l384 0c8.8 0 16-7.2 16-16l0-171.8L322 328.8c-38.4 31.5-93.7 31.5-132 0L48 212.2zM0 128C0 92.7 28.7 64 64 64l384 0c35.3 0 64 28.7 64 64l0 256c0 35.3-28.7 64-64 64L64 448c-35.3 0-64-28.7-64-64L0 128z" />
      </svg>
    ),
    content: process.env.NEXT_PUBLIC_EMAIL as string,
  },
  {
    title: "Phone",
    svg: (
      <svg width={15} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
        <path d="M16 64C16 28.7 44.7 0 80 0L304 0c35.3 0 64 28.7 64 64l0 384c0 35.3-28.7 64-64 64L80 512c-35.3 0-64-28.7-64-64L16 64zM224 448a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM304 64L80 64l0 320 224 0 0-320z" />
      </svg>
    ),
    content: process.env.NEXT_PUBLIC_PHONE as string,
  },
];

export default function Main() {
  return (
    <section className={style.container}>
      <div className={style.mainWrapper}>
        <div className={style.mainH1s}>
          <h2 className={style.mainName}>- 양정운 -</h2>
          <h1 className={style.mainTitle}>프론트엔드 개발자 포트폴리오</h1>
        </div>
        <hr className={style.mainHr} />
        <div className={style.mainIntroduce}>
          <p>
            <span>반응형 UI</span>를 즐기고,
            <br /> UX를 중시하는 프론트엔드 개발자
            <br /> 양정운 입니다.
          </p>
        </div>
      </div>
      <div id="Contact" className={style.contactWrapper}>
        <Title title="Contact" />
        <div className={style.contactContent}>
          {data.map((v) => (
            <Card key={v.title} title={v.title} svg={v.svg} content={v.content} />
          ))}
        </div>
      </div>
    </section>
  );
}
