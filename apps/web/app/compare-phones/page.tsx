import type { Metadata } from "next";
import { ComparePhonesClient } from "./ComparePhonesClient";
import styles from "./compare-phones.module.css";

export const metadata: Metadata = {
  title: "Compare phones",
  description: "Compare phone specs in plain English, with tecMAMBO-style trade-offs and priority weighting.",
  alternates: {
    canonical: "/compare-phones"
  }
};

export default function ComparePhonesPage() {
  return (
    <section className={`container ${styles.page}`}>
      <header className={styles.header}>
        <p>Compare Phones</p>
        <h1>Specs are easier when they answer a real question</h1>
        <span>
          Pick up to three phones, adjust what matters to you, and get a plain-English read before the spec table.
        </span>
      </header>
      <ComparePhonesClient />
    </section>
  );
}
