"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ExternalLink, Mail, Menu, Search, X } from "lucide-react";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { megaNavItems, moreLinks, socialLinks, wearableTabLinks, type MegaSectionKey, type TopNavItem } from "@/lib/nav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Wordmark } from "@/components/signature/Wordmark";
import styles from "./SiteHeader.module.css";

export type MegaFeature = {
  title: string;
  path: string;
  image: {
    src: string;
    alt: string;
  };
  badge: string;
};

function isActive(pathname: string, path: string) {
  return pathname === path || (path !== "/" && pathname.startsWith(`${path}/`));
}

function childPath(item: Extract<TopNavItem, { kind: "mega" }>, slug: string) {
  return `${item.path}/${slug}`;
}

function SocialIcon({ icon }: { icon: string }) {
  if (icon === "mail") return <Mail size={18} aria-hidden="true" />;
  return <span className={styles.socialGlyph} aria-hidden="true">{icon}</span>;
}

function focusPanelLink(panel: HTMLElement | null, direction: 1 | -1) {
  const links = Array.from(panel?.querySelectorAll<HTMLAnchorElement>("a") ?? []).filter((link) => link.tabIndex !== -1);
  if (!links.length) return;
  const index = links.indexOf(document.activeElement as HTMLAnchorElement);
  const next = index === -1 ? 0 : (index + direction + links.length) % links.length;
  links[next]?.focus();
}

function MegaPanel({
  item,
  open,
  feature,
  onClose,
  onKeyMove
}: {
  item: Extract<TopNavItem, { kind: "mega" }>;
  open: boolean;
  feature: MegaFeature | null;
  onClose: () => void;
  onKeyMove: (direction: 1 | -1) => void;
}) {
  return (
    <div
      id={`mega-${item.key}`}
      className={styles.megaPanel}
      data-open={open}
      aria-hidden={!open}
      aria-label={`${item.label} menu`}
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
        if (event.key === "ArrowDown") {
          event.preventDefault();
          onKeyMove(1);
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          onKeyMove(-1);
        }
      }}
    >
      <div className={styles.megaColumns}>
        <div className={styles.megaLinks}>
          <p>{item.label}</p>
          <div>
            {item.children.map((child) => (
              <div className={styles.megaLinkGroup} key={child.slug}>
                <Link href={childPath(item, child.slug)} tabIndex={open ? 0 : -1} onClick={onClose}>
                  <span>{child.label}</span>
                  <small>{child.description}</small>
                </Link>
                {item.key === "reviews" && child.slug === "wearables" ? (
                  <div className={styles.subLinks}>
                    {wearableTabLinks.map((tab) => (
                      <Link href={tab.path} key={tab.path} tabIndex={open ? 0 : -1} onClick={onClose}>
                        {tab.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
          <Link className={styles.seeAll} href={item.path} tabIndex={open ? 0 : -1} onClick={onClose}>
            See all {item.label} →
          </Link>
        </div>
        {feature ? (
          <Link className={styles.featureCard} href={feature.path} tabIndex={open ? 0 : -1} onClick={onClose}>
            <span className={styles.featureImage}>
              <Image src={feature.image.src} alt={feature.image.alt} fill sizes="280px" />
            </span>
            <small>{feature.badge}</small>
            <strong>{feature.title}</strong>
          </Link>
        ) : null}
      </div>
    </div>
  );
}

function MorePanel({ open, onClose, onKeyMove }: { open: boolean; onClose: () => void; onKeyMove: (direction: 1 | -1) => void }) {
  return (
    <div
      id="mega-more"
      className={`${styles.megaPanel} ${styles.morePanel}`}
      data-open={open}
      aria-hidden={!open}
      aria-label="More menu"
      onKeyDown={(event) => {
        if (event.key === "Escape") onClose();
        if (event.key === "ArrowDown") {
          event.preventDefault();
          onKeyMove(1);
        }
        if (event.key === "ArrowUp") {
          event.preventDefault();
          onKeyMove(-1);
        }
      }}
    >
      <div className={styles.moreGrid}>
        <div className={styles.moreLinks}>
          <p>Site & legal</p>
          {moreLinks.map((link) => (
            <Link href={link.path} key={link.path} tabIndex={open ? 0 : -1} onClick={onClose}>
              {link.label}
            </Link>
          ))}
          <Link className={styles.advertiseCta} href="/advertise" tabIndex={open ? 0 : -1} onClick={onClose}>
            Advertise with us
          </Link>
        </div>
        <div className={styles.socialLinks}>
          <p>SOCIAL</p>
          {socialLinks.map((link) =>
            link.external ? (
              <a
                href={link.href}
                key={link.label}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`tecMAMBO on ${link.label} (opens in a new tab)`}
                tabIndex={open ? 0 : -1}
              >
                <SocialIcon icon={link.icon} />
                <span>{link.label}</span>
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            ) : (
              <Link href={link.href} key={link.label} tabIndex={open ? 0 : -1} onClick={onClose}>
                <SocialIcon icon={link.icon} />
                <span>{link.label}</span>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

function NavMenu({ pathname, features }: { pathname: string; features: Record<MegaSectionKey, MegaFeature | null> }) {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const openTimer = useRef<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navRef = useRef<HTMLElement>(null);

  function clearTimers() {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
  }

  function scheduleOpen(key: string) {
    clearTimers();
    openTimer.current = window.setTimeout(() => setOpenKey(key), 120);
  }

  function scheduleClose() {
    if (openTimer.current) window.clearTimeout(openTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenKey(null), 230);
  }

  function closeAndFocus(key?: string) {
    setOpenKey(null);
    if (key) triggerRefs.current[key]?.focus();
  }

  useEffect(() => {
    setOpenKey(null);
  }, [pathname]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) setOpenKey(null);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && openKey) closeAndFocus(openKey);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      clearTimers();
    };
  }, [openKey]);

  return (
    <nav
      className={styles.nav}
      aria-label="Primary navigation"
      ref={navRef}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setOpenKey(null);
      }}
    >
      {megaNavItems.map((item) => {
        if (item.kind === "link") {
          return (
            <Link className={styles.navLink} href={item.path} key={item.path} aria-current={isActive(pathname, item.path) ? "page" : undefined}>
              {item.label}
            </Link>
          );
        }
        const key = item.kind === "more" ? "more" : item.key;
        const open = openKey === key;
        return (
          <div
            className={styles.menuGroup}
            data-open={open}
            key={key}
            onMouseEnter={() => scheduleOpen(key)}
            onMouseLeave={scheduleClose}
            onFocus={() => setOpenKey(key)}
          >
            <button
              ref={(node) => {
                triggerRefs.current[key] = node;
              }}
              type="button"
              aria-haspopup="true"
              aria-expanded={open}
              aria-controls={`mega-${key}`}
              aria-current={item.kind === "mega" && isActive(pathname, item.path) ? "page" : undefined}
              onClick={() => setOpenKey(open ? null : key)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " " || event.key === "ArrowDown") {
                  event.preventDefault();
                  setOpenKey(key);
                  window.setTimeout(() => focusPanelLink(panelRefs.current[key], 1), 0);
                }
              }}
            >
              {item.label}
              <ChevronDown className={styles.caret} size={15} aria-hidden="true" />
            </button>
            <span className={styles.hoverBridge} aria-hidden="true" />
            <div
              ref={(node) => {
                panelRefs.current[key] = node;
              }}
              onMouseEnter={clearTimers}
              onMouseLeave={scheduleClose}
            >
              {item.kind === "mega" ? (
                <MegaPanel
                  item={item}
                  open={open}
                  feature={features[item.key]}
                  onClose={() => closeAndFocus(key)}
                  onKeyMove={(direction) => focusPanelLink(panelRefs.current[key], direction)}
                />
              ) : (
                <MorePanel open={open} onClose={() => closeAndFocus(key)} onKeyMove={(direction) => focusPanelLink(panelRefs.current[key], direction)} />
              )}
            </div>
          </div>
        );
      })}
    </nav>
  );
}

function MobileDrawer({ pathname, features }: { pathname: string; features: Record<MegaSectionKey, MegaFeature | null> }) {
  const [open, setOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>("news");
  const drawerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = drawerRef.current?.querySelector<HTMLElement>("a, button");
    focusable?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
      if (event.key !== "Tab") return;
      const nodes = Array.from(drawerRef.current?.querySelectorAll<HTMLElement>("a, button") ?? []);
      if (!nodes.length) return;
      const first = nodes[0]!;
      const last = nodes[nodes.length - 1]!;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const drawer =
    open && typeof document !== "undefined"
      ? createPortal(
          <div className={styles.drawerLayer}>
            <button className={styles.overlay} type="button" aria-label="Close navigation" onClick={() => setOpen(false)} />
            <aside className={styles.drawer} ref={drawerRef} role="dialog" aria-modal="true" aria-label="Site navigation">
              <div className={styles.drawerTop}>
                <Wordmark />
                <button type="button" aria-label="Close navigation" onClick={() => setOpen(false)}>
                  <X size={20} aria-hidden="true" />
                </button>
              </div>
              <nav className={styles.drawerNav}>
                {megaNavItems.map((item) => {
                  if (item.kind === "link") {
                    return (
                      <Link key={item.path} href={item.path} aria-current={isActive(pathname, item.path) ? "page" : undefined} onClick={() => setOpen(false)}>
                        {item.label}
                      </Link>
                    );
                  }
                  const key = item.kind === "more" ? "more" : item.key;
                  const sectionOpen = openSection === key;
                  return (
                    <div className={styles.drawerSection} key={key}>
                      <button type="button" aria-expanded={sectionOpen} onClick={() => setOpenSection(sectionOpen ? null : key)}>
                        {item.label}
                        <ChevronDown size={16} aria-hidden="true" />
                      </button>
                      {sectionOpen ? (
                        <div className={styles.drawerPanel}>
                          {item.kind === "mega" ? (
                            <>
                              <Link href={item.path} onClick={() => setOpen(false)}>
                                All {item.label}
                              </Link>
                              {item.children.map((child) => (
                                <Link key={child.slug} href={childPath(item, child.slug)} onClick={() => setOpen(false)}>
                                  {child.label}
                                </Link>
                              ))}
                              {item.key === "reviews" ? wearableTabLinks.map((tab) => (
                                <Link key={tab.path} href={tab.path} onClick={() => setOpen(false)}>
                                  {tab.label}
                                </Link>
                              )) : null}
                              {features[item.key] ? (
                                <Link href={features[item.key]!.path} onClick={() => setOpen(false)}>
                                  Featured: {features[item.key]!.title}
                                </Link>
                              ) : null}
                            </>
                          ) : (
                            <>
                              {moreLinks.map((link) => (
                                <Link href={link.path} key={link.path} onClick={() => setOpen(false)}>
                                  {link.label}
                                </Link>
                              ))}
                              <Link className={styles.drawerCta} href="/advertise" onClick={() => setOpen(false)}>
                                Advertise with us
                              </Link>
                              <p>SOCIAL</p>
                              {socialLinks.map((link) =>
                                link.external ? (
                                  <a
                                    href={link.href}
                                    key={link.label}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`tecMAMBO on ${link.label} (opens in a new tab)`}
                                  >
                                    <SocialIcon icon={link.icon} />
                                    {link.label}
                                  </a>
                                ) : (
                                  <Link href={link.href} key={link.label} onClick={() => setOpen(false)}>
                                    <SocialIcon icon={link.icon} />
                                    {link.label}
                                  </Link>
                                )
                              )}
                            </>
                          )}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </nav>
            </aside>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button ref={buttonRef} className={styles.menuButton} type="button" aria-label="Open navigation" onClick={() => setOpen(true)}>
        <Menu size={20} aria-hidden="true" />
      </button>
      {drawer}
    </>
  );
}

export function SiteHeaderClient({ features }: { features: Record<MegaSectionKey, MegaFeature | null> }) {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Wordmark />
        <NavMenu pathname={pathname} features={features} />
        <div className={styles.actions}>
          <Link className={styles.search} href="/search" aria-label="Search">
            <Search size={18} aria-hidden="true" />
          </Link>
          <ThemeToggle />
          <MobileDrawer pathname={pathname} features={features} />
        </div>
      </div>
    </header>
  );
}
