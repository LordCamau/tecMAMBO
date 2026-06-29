import type { ReactNode } from "react";
import { GlossaryPeek } from "@/components/glossary/GlossaryPeek";
import type { GlossaryTerm } from "@/lib/types";

export type GlossaryLinkState = {
  seen: Set<string>;
  count: number;
  max: number;
};

type Match = {
  start: number;
  end: number;
  text: string;
  term: GlossaryTerm;
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function candidates(terms: GlossaryTerm[]) {
  return terms
    .flatMap((term) => [term.term, ...term.aliases].map((phrase) => ({ phrase, term })))
    .filter((candidate) => candidate.phrase.length > 2)
    .sort((a, b) => b.phrase.length - a.phrase.length);
}

export function renderGlossaryText(text: string, terms: GlossaryTerm[], state: GlossaryLinkState): ReactNode[] {
  if (state.count >= state.max) return [text];
  const matches: Match[] = [];
  const occupied: Array<[number, number]> = [];

  for (const candidate of candidates(terms)) {
    if (state.count + matches.length >= state.max) break;
    if (state.seen.has(candidate.term.slug)) continue;
    const pattern = new RegExp(`(^|[^A-Za-z0-9])(${escapeRegExp(candidate.phrase)})(?=$|[^A-Za-z0-9])`, "i");
    const match = pattern.exec(text);
    if (!match || match.index === undefined) continue;
    const prefixLength = match[1]?.length ?? 0;
    const start = match.index + prefixLength;
    const end = start + (match[2]?.length ?? 0);
    if (occupied.some(([a, b]) => start < b && end > a)) continue;
    matches.push({ start, end, text: text.slice(start, end), term: candidate.term });
    occupied.push([start, end]);
    state.seen.add(candidate.term.slug);
  }

  if (!matches.length) return [text];
  const nodes: ReactNode[] = [];
  let cursor = 0;
  for (const match of matches.sort((a, b) => a.start - b.start)) {
    if (match.start > cursor) nodes.push(text.slice(cursor, match.start));
    state.count += 1;
    nodes.push(
      <GlossaryPeek
        key={`${match.term.slug}-${match.start}`}
        term={match.term.term}
        oneLiner={match.term.oneLiner}
        analogy={match.term.analogy}
        slug={match.term.slug}
      >
        {match.text}
      </GlossaryPeek>
    );
    cursor = match.end;
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}
