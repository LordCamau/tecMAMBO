import { Lightbulb } from "lucide-react";
import styles from "./WhyItMatters.module.css";

export function WhyItMatters({ children }: { children: React.ReactNode }) {
  return (
    <aside className={styles.callout} aria-labelledby="why-it-matters-title">
      <div className={styles.icon} aria-hidden="true">
        <Lightbulb size={18} strokeWidth={2.2} />
      </div>
      <div>
        <p className={styles.label} id="why-it-matters-title">
          Why it matters
        </p>
        <p className={styles.copy}>{children}</p>
      </div>
    </aside>
  );
}
