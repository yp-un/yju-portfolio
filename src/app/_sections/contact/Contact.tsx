"use client";

import { useEffect, useRef, useState } from "react";
import style from "./Contact.module.scss";

export default function Contact() {
  const email = process.env.NEXT_PUBLIC_EMAIL;
  const phone = process.env.NEXT_PUBLIC_PHONE;
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  async function copyEmail() {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setMessage("이메일 주소를 복사했어요.");
    } catch {
      setMessage("복사하지 못했어요. 이메일 주소를 직접 선택해 복사해 주세요.");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 4000);
  }

  return (
    <section id="Contact" className={style.container} aria-labelledby="contact-heading">
      <div className={style.inner} data-reveal>
        <div className={style.top}><span className={style.eyebrow}>05 — WHAT’S NEXT?</span><span className={style.note}><span /> 좋은 대화는 언제나 환영합니다</span></div>
        <div className={style.titleRow}>
          <h2 id="contact-heading">Let’s build<br />something <span>good.</span></h2>
          <a className={style.bigArrow} href={email ? `mailto:${email}` : "https://github.com/yp-un"} aria-label={email ? "양정운에게 이메일 보내기" : "양정운 GitHub 방문"}>↗</a>
        </div>
        <div className={style.bottom}>
          <p>함께 만들고 싶은 서비스가 있으신가요?<br />새로운 기회와 흥미로운 이야기를 기다립니다.</p>
          <div className={style.contactInfo}>
            {email && <div className={style.emailRow}><a href={`mailto:${email}`}>{email}</a><button type="button" onClick={copyEmail} aria-label="이메일 주소 복사"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="12" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3" stroke="currentColor" strokeWidth="1.5" /></svg></button></div>}
            {phone && <a className={style.phone} href={`tel:${phone.replace(/[^+\d]/g, "")}`}>{phone}</a>}
            <span role="status" className={style.status}>{message}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
