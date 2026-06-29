import styles from "./AdSlot.module.css";

export function AdSlot({ label = "Advertisement" }: { label?: string }) {
  return (
    <aside className={styles.slot} aria-label={label}>
      <span>{label}</span>
    </aside>
  );
}
