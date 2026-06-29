"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import styles from "./GlossaryPeek.module.css";

export function GlossaryPeek({
  children,
  term,
  oneLiner,
  analogy,
  slug
}: {
  children: string;
  term: string;
  oneLiner: string;
  analogy?: string;
  slug: string;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onPointerDown(event: PointerEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <span className={styles.wrapper} ref={wrapperRef}>
      <button
        className={styles.trigger}
        type="button"
        aria-describedby={open ? id : undefined}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        onFocus={() => setOpen(true)}
        onMouseEnter={() => setOpen(true)}
      >
        {children}
      </button>
      {open ? (
        <span className={styles.popover} id={id} role="status">
          <strong>{term}</strong>
          <span>{oneLiner}</span>
          {analogy ? <em>{analogy}</em> : null}
          <Link href={`/glossary/${slug}`}>Full definition →</Link>
        </span>
      ) : null}
    </span>
  );
}
