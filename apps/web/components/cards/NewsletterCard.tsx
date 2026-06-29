import { Mail } from "lucide-react";
import styles from "./NewsletterCard.module.css";

export function NewsletterCard() {
  return (
    <section className={styles.card} aria-labelledby="newsletter-title">
      <Mail size={22} aria-hidden="true" />
      <div>
        <p className={styles.kicker}>Newsletter</p>
        <h2 id="newsletter-title">Tech that lands gently</h2>
        <p>One clear email a week: the useful launches, the jargon decoded, and what is worth your money.</p>
      </div>
      <form className={styles.form}>
        <label className="visually-hidden" htmlFor="newsletter-email">
          Email address
        </label>
        <input id="newsletter-email" type="email" placeholder="you@example.com" required />
        <button type="submit">Sign up</button>
      </form>
    </section>
  );
}
