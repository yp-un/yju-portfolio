"use client";

import { useState } from "react";
import style from "./Contact.module.scss";

export default function Contact() {
  const email = process.env.NEXT_PUBLIC_EMAIL;
  const phone = process.env.NEXT_PUBLIC_PHONE;
  const [copyMessage, setCopyMessage] = useState("");

  async function copyEmail() {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopyMessage("이메일 주소를 복사했습니다.");
    } catch {
      setCopyMessage("주소를 선택해 복사하거나 이메일 보내기를 이용해 주세요.");
    }
  }

  return (
    <section id="Contact" className={style.container} aria-labelledby="contact-heading">
      <div className={style.inner}>
        <div className={style.intro}>
          <h2 id="contact-heading">좋은 제품을 만드는 팀을<br />만나고 싶습니다.</h2>
          <p>프로젝트와 일에 관한 이야기, 편하게 연락해 주세요.</p>
        </div>
        <div className={style.contacts}>
          {email && (
            <div className={style.emailBlock}>
              <a className={style.email} href={`mailto:${email}`}>{email}</a>
              <div className={style.actions}>
                <a className={style.send} href={`mailto:${email}`}>이메일 보내기</a>
                <button type="button" className={style.copy} onClick={copyEmail}>주소 복사</button>
              </div>
              <p className={style.status} role="status">{copyMessage}</p>
            </div>
          )}
          {/* {phone && <a className={style.phone} href={`tel:${phone.replace(/[^+\d]/g, "")}`}><span>전화</span>{phone}</a>} */}
          {!email && !phone && <a className={style.send} href="https://github.com/yp-un" target="_blank" rel="noopener noreferrer">GitHub 프로필 보기</a>}
        </div>
      </div>
    </section>
  );
}
