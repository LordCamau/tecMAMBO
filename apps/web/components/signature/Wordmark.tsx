import Image from "next/image";
import Link from "next/link";
import styles from "./Wordmark.module.css";

export function Wordmark({ inverted = false }: { inverted?: boolean }) {
  if (inverted) {
    return (
      <Link className={styles.wordmark} href="/" aria-label="tecMAMBO home">
        <Image
          className={styles.logo}
          src="/brand/tecMAMBO-white.svg"
          alt=""
          width={1146}
          height={293}
          priority
        />
      </Link>
    );
  }

  return (
    <Link className={styles.wordmark} href="/" aria-label="tecMAMBO home">
      <Image
        className={`${styles.logo} ${styles.logoLight}`}
        src="/brand/tecMAMBO-bp.svg"
        alt=""
        width={1146}
        height={293}
        priority
      />
      <Image
        className={`${styles.logo} ${styles.logoDark}`}
        src="/brand/tecMAMBO-wp.svg"
        alt=""
        width={1146}
        height={293}
        priority
      />
    </Link>
  );
}
