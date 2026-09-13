import style from "./Footer.module.scss";

export default function Footer() {
  return <div className={style.container}><div className={style.inner}><span>© {new Date().getFullYear()} Yang Jeong Un</span><span>Thoughtfully designed. Carefully built.</span><a href="https://github.com/yp-un/yju-portfolio" target="_blank" rel="noopener noreferrer">View source <span aria-hidden="true">↗</span></a></div></div>;
}
