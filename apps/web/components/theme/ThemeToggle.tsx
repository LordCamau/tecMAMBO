"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

const cycle = ["system", "light", "dark"] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const current = mounted && cycle.includes(theme as (typeof cycle)[number]) ? (theme as (typeof cycle)[number]) : "system";
  const next = cycle[(cycle.indexOf(current) + 1) % cycle.length];
  const Icon = current === "system" ? Laptop : current === "light" ? Sun : Moon;

  return (
    <button className={styles.button} type="button" onClick={() => setTheme(next)} aria-label={`Theme: ${current}. Switch to ${next}.`}>
      <Icon size={18} aria-hidden="true" />
    </button>
  );
}
