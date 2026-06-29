import clsx from "clsx";
import { formats } from "@/lib/formats";
import type { Format } from "@/lib/types";
import styles from "./FormatBadge.module.css";

export function FormatBadge({ format }: { format: Format }) {
  const entry = formats[format];
  return (
    <span className={clsx(styles.badge, styles[entry.badge])}>
      <span className={styles.mark} aria-hidden="true" />
      {entry.label}
    </span>
  );
}
