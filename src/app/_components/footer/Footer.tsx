import Link from "next/link";
import style from "./Footer.module.scss";

export default function Footer() {
  return (
    <div className={style.container}>
      <div className={style.inner}><span>© {new Date().getFullYear()} 양정운</span><Link href="/#Home">맨 위로</Link></div>
    </div>
  );
}
