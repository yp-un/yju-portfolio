import style from "./Accordion.module.scss";

export interface AccordionItem {
  title: string;
  descriptions: string[];
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className={style.container}>
      {items.map((item) => (
        <details key={item.title} className={style.item}>
          <summary className={style.trigger}>
            <h4>{item.title}</h4>
            <span className={style.icon} aria-hidden="true" />
          </summary>
          <ul className={style.list}>
            {item.descriptions.map((description) => (
              <li key={description}>{description}</li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}
