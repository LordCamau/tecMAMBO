"use client";

import Link from "next/link";
import styles from "./state.module.css";

export default function ErrorPage() {
  return (
    <section className={styles.state}>
      <p>Something slipped</p>
      <h1>The page could not load cleanly</h1>
      <span>Head back home while we make the system behave.</span>
      <div>
        <Link href="/">Home</Link>
      </div>
    </section>
  );
}
