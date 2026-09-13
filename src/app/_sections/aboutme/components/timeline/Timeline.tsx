import style from "./Timeline.module.scss";
import type { Data } from "../../AboutMe";

interface Props {
  data: Data;
  isEnd: boolean;
}

export default function Timeline({ data, isEnd }: Props) {
  return (
    <article className={`${style.container} ${isEnd ? style.last : ""}`} data-reveal>
      <span className={style.dot} aria-hidden="true" />
      <div className={style.header}>
        <h3>{data.title}</h3>
        <span className={style.date}>{data.date}</span>
      </div>
      {data.content && <div className={style.content}>{data.content}</div>}
    </article>
  );
}
