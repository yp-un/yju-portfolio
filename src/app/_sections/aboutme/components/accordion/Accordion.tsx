import style from "./Accordion.module.scss";

export interface AccordionItem {
  title: string;
  descriptions: string[];
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className={style.container}>
      {items.map((item, index) => (
        <details key={item.title} className={style.item}>
          <summary className={style.trigger}>
            <span className={style.number}>{String(index + 1).padStart(2, "0")}</span>
            <span>{item.title}</span>
            <span className={style.icon} aria-hidden="true" />
          </summary>
          <ul className={style.list}>
            {item.descriptions.map((description) => <li key={description}>{description}</li>)}
          </ul>
        </details>
      ))}
    </div>
  );
}
