import type { Skill } from "../../Skills";
import style from "./Skill.module.scss";

interface Props {
  skill: Skill;
  selected: boolean;
  panelId: string;
  onSelect: () => void;
}

export default function SkillButton({ skill, selected, panelId, onSelect }: Props) {
  return (
    <button
      type="button"
      className={`${style.skill} ${selected ? style.active : ""}`}
      onClick={onSelect}
      aria-expanded={selected}
      aria-controls={panelId}
      aria-label={`${skill.name} 숙련도 ${selected ? "닫기" : "보기"}`}
    >
      <span className={style.mark} aria-hidden="true">
        <span className={style.dot} style={{ backgroundColor: skill.color.bg }} />
        {skill.short}
      </span>
      <span>{skill.name}</span>
      <span className={style.chevron} aria-hidden="true">{selected ? "−" : "+"}</span>
    </button>
  );
}
