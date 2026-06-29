import { ChevronDown } from "lucide-react";
import type { SpecRow } from "@/lib/types";
import styles from "./GoDeeper.module.css";

export function GoDeeper({ intro, specs }: { intro: string; specs: SpecRow[] }) {
  return (
    <details className={styles.details}>
      <summary className={styles.summary}>
        <span>Go deeper</span>
        <ChevronDown className={styles.chevron} size={18} aria-hidden="true" />
      </summary>
      <div className={styles.content}>
        <p>{intro}</p>
        {specs.length > 0 ? (
          <dl className={styles.specs}>
            {specs.map((spec) => (
              <div className={styles.row} key={spec.label}>
                <dt>{spec.label}</dt>
                <dd>{spec.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>
    </details>
  );
}
