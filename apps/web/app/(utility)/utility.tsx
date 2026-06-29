import styles from "./utility.module.css";

export function UtilityPage({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className={`readable ${styles.page}`}>
      <p>{eyebrow}</p>
      <h1>{title}</h1>
      <span>{body}</span>
    </section>
  );
}
