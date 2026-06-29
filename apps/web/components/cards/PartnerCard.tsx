import styles from "./PartnerCard.module.css";

export function PartnerCard() {
  return (
    <aside className={styles.card} aria-label="Partner placement">
      <span>Partner</span>
      <h2>Built for even-handed brand stories</h2>
      <p>
        Sponsored units are clearly labeled, visually calm, and written to help readers decide without turning the page
        into a pitch.
      </p>
    </aside>
  );
}
