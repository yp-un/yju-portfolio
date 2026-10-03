import style from "./Timeline.module.scss";
import type { Data } from "../../AboutMe";

interface Props {
  data: Data;
  isEnd: boolean;
}

export default function Timeline({ data, isEnd }: Props) {
  return (
    <li className={`${style.item} ${isEnd ? style.last : ""}`}>
      <span className={style.date}>{data.date}</span>
      <div className={style.content}>
        <h4>{data.title}</h4>
        {data.content && <div className={style.description}>{data.content}</div>}
      </div>
    </li>
  );
}
