import Link from "next/link";
import type { Tag } from "@/lib/types";
import styles from "./TagChip.module.css";

export function TagChip({ tag }: { tag: Tag }) {
  const href = tag.kind === "topic" ? `/topics/${tag.slug}` : `/brands/${tag.slug}`;
  return (
    <Link className={styles.chip} href={href}>
      {tag.name}
    </Link>
  );
}

export function TagList({ tags }: { tags: Tag[] }) {
  return (
    <div className={styles.list}>
      {tags.map((tag) => (
        <TagChip tag={tag} key={`${tag.kind}-${tag.slug}`} />
      ))}
    </div>
  );
}
