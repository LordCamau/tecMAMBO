"use client";

import { BatteryCharging, Camera, CheckCircle2, Cpu, Search, ShieldCheck, SlidersHorizontal, Sparkles, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { phones, scoreLabels, type PhoneSpec } from "@/lib/phone-compare-data";
import styles from "./compare-phones.module.css";

const specRows: Array<{ label: string; value: (phone: PhoneSpec) => string }> = [
  { label: "Display", value: (phone) => phone.specs.display },
  { label: "Chipset", value: (phone) => phone.specs.chipset },
  { label: "Memory", value: (phone) => phone.specs.memory },
  { label: "Storage", value: (phone) => phone.specs.storage },
  { label: "Rear camera", value: (phone) => phone.specs.rearCamera },
  { label: "Selfie camera", value: (phone) => phone.specs.frontCamera },
  { label: "Battery", value: (phone) => phone.specs.battery },
  { label: "Charging", value: (phone) => phone.specs.charging },
  { label: "Durability", value: (phone) => phone.specs.durability },
  { label: "Software", value: (phone) => phone.specs.software },
  { label: "Weight", value: (phone) => phone.specs.weight },
  { label: "AnTuTu", value: (phone) => phone.benchmarks.antutu },
  { label: "Geekbench", value: (phone) => phone.benchmarks.geekbench },
  { label: "PCMark", value: (phone) => phone.benchmarks.pcmark },
  { label: "3DMark", value: (phone) => phone.benchmarks.threeDMark },
  { label: "Benchmark note", value: (phone) => phone.benchmarks.note },
  { label: "Extras", value: (phone) => phone.specs.extras }
];

const scoreIcons = {
  camera: Camera,
  battery: BatteryCharging,
  performance: Cpu,
  longevity: ShieldCheck,
  value: CheckCircle2
};

type ScoreKey = keyof PhoneSpec["scores"];
type Weights = Record<ScoreKey, number>;

const defaultWeights: Weights = {
  camera: 3,
  battery: 3,
  performance: 3,
  longevity: 3,
  value: 3
};

function weightedScore(phone: PhoneSpec, weights: Weights) {
  const entries = Object.entries(weights) as Array<[ScoreKey, number]>;
  const totalWeight = entries.reduce((sum, [, weight]) => sum + weight, 0);
  const total = entries.reduce((sum, [key, weight]) => sum + phone.scores[key] * weight, 0);
  return total / totalWeight;
}

function strongestScore(phone: PhoneSpec) {
  return (Object.entries(phone.scores) as Array<[ScoreKey, number]>).sort((a, b) => b[1] - a[1])[0];
}

function sortSelected(selected: PhoneSpec[], weights: Weights) {
  return [...selected].sort((a, b) => weightedScore(b, weights) - weightedScore(a, weights));
}

export function ComparePhonesClient() {
  const [query, setQuery] = useState("");
  const [selectedSlugs, setSelectedSlugs] = useState(["samsung-galaxy-s26-ultra", "iphone-17-pro-max"]);
  const [weights, setWeights] = useState<Weights>(defaultWeights);

  const selected = selectedSlugs.map((slug) => phones.find((phone) => phone.slug === slug)).filter((phone): phone is PhoneSpec => Boolean(phone));
  const filtered = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return phones;
    return phones.filter((phone) => [phone.name, phone.brand, phone.short, phone.priceBand, phone.released].join(" ").toLowerCase().includes(value));
  }, [query]);
  const ranked = sortSelected(selected, weights);
  const winner = ranked[0];
  const runnerUp = ranked[1];

  function togglePhone(slug: string) {
    setSelectedSlugs((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      if (current.length >= 3) return [...current.slice(1), slug];
      return [...current, slug];
    });
  }

  function updateWeight(key: ScoreKey, value: number) {
    setWeights((current) => ({ ...current, [key]: value }));
  }

  return (
    <div className={styles.tool}>
      <aside className={styles.picker} aria-label="Choose phones to compare">
        <label className={styles.searchLabel} htmlFor="phone-search">
          <Search size={16} aria-hidden="true" />
          Find a phone
        </label>
        <input
          id="phone-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search brand, model, or price band"
        />
        <div className={styles.phoneList}>
          {filtered.map((phone) => {
            const isSelected = selectedSlugs.includes(phone.slug);
            return (
              <button
                className={styles.phoneButton}
                data-selected={isSelected}
                type="button"
                onClick={() => togglePhone(phone.slug)}
                key={phone.slug}
              >
                <span className={styles.phoneButtonImage}>
                  <Image src={phone.image.src} alt="" width={160} height={212} sizes="52px" />
                </span>
                <span className={styles.phoneButtonText}>
                  <strong>{phone.name}</strong>
                  <small>{phone.short}</small>
                </span>
                {isSelected ? <X size={16} aria-hidden="true" /> : <CheckCircle2 size={16} aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </aside>

      <section className={styles.results} aria-live="polite">
        <div className={styles.controls}>
          <div>
            <p>Compare Phones</p>
            <h2>Pick what matters, then compare what changes</h2>
            <span className={styles.catalogCount}>{phones.length} recent major releases in the catalog</span>
          </div>
          <div className={styles.selectedCount}>{selected.length}/3 selected</div>
        </div>

        <section className={styles.priorityPanel} aria-labelledby="priorities-title">
          <div className={styles.priorityHead}>
            <SlidersHorizontal size={18} aria-hidden="true" />
            <h3 id="priorities-title">Your priorities</h3>
          </div>
          <div className={styles.sliders}>
            {(Object.keys(weights) as ScoreKey[]).map((key) => (
              <label key={key}>
                <span>{scoreLabels[key]}</span>
                <input min="1" max="5" type="range" value={weights[key]} onChange={(event) => updateWeight(key, Number(event.target.value))} />
                <strong>{weights[key]}</strong>
              </label>
            ))}
          </div>
        </section>

        {winner ? (
          <section className={styles.summary} aria-label="Comparison summary">
            <div>
              <p className={styles.eyebrow}>
                <Sparkles size={16} aria-hidden="true" />
                MAMBO read
              </p>
              <h3>{winner.name} is the best match for your priorities</h3>
              <p>
                It scores {weightedScore(winner, weights).toFixed(1)} overall with your current weighting.
                {runnerUp ? ` ${runnerUp.name} is closest behind at ${weightedScore(runnerUp, weights).toFixed(1)}.` : ""}
              </p>
            </div>
            <div className={styles.summaryCards}>
              {ranked.map((phone) => {
                const strongest = strongestScore(phone);
                const label = strongest ? scoreLabels[strongest[0]] : "Balance";
                return (
                  <article key={phone.slug}>
                    <div className={styles.summaryPhoneImage}>
                      <Image src={phone.image.src} alt={phone.image.alt} width={160} height={212} sizes="74px" />
                    </div>
                    <div>
                      <span>{phone.priceBand}</span>
                      <h4>{phone.name}</h4>
                      <p>{phone.plainEnglish.mamboRead}</p>
                      <small>Strongest signal: {label}</small>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ) : (
          <section className={styles.empty}>
            <h3>Choose at least two phones</h3>
            <p>Start with two or three models. The tool will turn the spec sheet into plain-English trade-offs.</p>
          </section>
        )}

        {selected.length > 0 ? (
          <>
            <div className={styles.phoneGrid}>
              {selected.map((phone) => (
                <article className={styles.phoneCard} key={phone.slug}>
                  <div className={styles.phoneCardTop}>
                    <div>
                      <span>{phone.brand}</span>
                      <h3>{phone.name}</h3>
                      <p>{phone.short}</p>
                    </div>
                    <div className={styles.phoneImage}>
                      <Image src={phone.image.src} alt={phone.image.alt} width={160} height={212} sizes="(min-width: 980px) 120px, 96px" />
                    </div>
                  </div>
                  <div className={styles.scoreRing}>{weightedScore(phone, weights).toFixed(1)}</div>
                  <dl>
                    <div>
                      <dt>Best for</dt>
                      <dd>{phone.plainEnglish.bestFor}</dd>
                    </div>
                    <div>
                      <dt>Watch out</dt>
                      <dd>{phone.plainEnglish.watchOut}</dd>
                    </div>
                  </dl>
                  <small>{phone.verifyNote}</small>
                </article>
              ))}
            </div>

            <div className={styles.scoreGrid} aria-label="Score comparison">
              {(Object.keys(scoreLabels) as ScoreKey[]).map((key) => {
                const Icon = scoreIcons[key];
                return (
                  <section key={key}>
                    <h3>
                      <Icon size={16} aria-hidden="true" />
                      {scoreLabels[key]}
                    </h3>
                    {selected.map((phone) => (
                      <div className={styles.scoreBar} key={phone.slug}>
                        <span>{phone.name}</span>
                        <div>
                          <i style={{ width: `${phone.scores[key] * 10}%` }} />
                        </div>
                        <strong>{phone.scores[key].toFixed(1)}</strong>
                      </div>
                    ))}
                  </section>
                );
              })}
            </div>

            <div className={styles.tableWrap}>
              <table className={styles.specTable}>
                <caption>Side-by-side specs</caption>
                <thead>
                  <tr>
                    <th scope="col">Spec</th>
                    {selected.map((phone) => (
                      <th scope="col" key={phone.slug}>
                        {phone.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {specRows.map((row) => (
                    <tr key={row.label}>
                      <th scope="row">{row.label}</th>
                      {selected.map((phone) => (
                        <td key={`${phone.slug}-${row.label}`}>{row.value(phone)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        ) : null}
      </section>
    </div>
  );
}
