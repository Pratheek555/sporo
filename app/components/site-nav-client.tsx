"use client";

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, splitLocale } from "../lib/i18n/config";
import type { Dictionary } from "../lib/i18n/dictionaries/en";
import { useLang } from "../lib/i18n/locale-context";
import { format } from "../lib/i18n/text";
import LanguageSwitch from "./language-switch";

const HOVER_OPEN_DELAY = 90;
const HOVER_CLOSE_DELAY = 220;

export type NavService = { slug: string; name: string };

const serviceHref = (slug: string) => `/services/${slug}`;

function ServiceLinks({
  items,
  pathname,
  onNavigate,
  offset = 0,
}: {
  items: readonly NavService[];
  pathname: string;
  onNavigate: () => void;
  offset?: number;
}) {
  const lang = useLang();

  return (
    <ul>
      {items.map((service, index) => {
        const href = localePath(lang, serviceHref(service.slug));
        return (
          <li key={service.slug}>
            <Link
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              onClick={onNavigate}
            >
              <small>{String(index + 1 + offset).padStart(2, "0")}</small>
              <span>{service.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default function SiteNavClient({
  t,
  tattooServices,
  piercingServices,
}: {
  t: Dictionary["nav"];
  tattooServices: readonly NavService[];
  piercingServices: readonly NavService[];
}) {
  const lang = useLang();
  const pathname = usePathname();
  const { path } = splitLocale(pathname);
  const isHome = path === "/";
  const href = (target: string) => localePath(lang, target);
  const anchor = (id: string) => (isHome ? `#${id}` : href(`/#${id}`));

  const [navOpen, setNavOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(
    () => path.startsWith("/services"),
  );

  const servicesRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const mobileServicesId = useId();
  const onServicesPage = path.startsWith("/services");

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setNavOpen(false);
      setServicesOpen((open) => {
        if (open) triggerRef.current?.focus();
        return false;
      });
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    if (!servicesOpen) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePress);
  }, [servicesOpen]);

  useEffect(() => () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

  const scheduleHover = (open: boolean, event: ReactPointerEvent) => {
    if (event.pointerType !== "mouse") return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => {
      setServicesOpen(open);
    }, open ? HOVER_OPEN_DELAY : HOVER_CLOSE_DELAY);
  };

  const closeAll = () => {
    setServicesOpen(false);
    setNavOpen(false);
  };

  const count = (items: readonly NavService[]) => String(items.length).padStart(2, "0");

  return (
    <header className={`landing-nav${navOpen ? " is-open" : ""}`}>
      <Link className="landing-nav-brand" href={isHome ? "#top" : href("/")} aria-label={t.homeLabel}>
        <span className="landing-nav-logo" aria-hidden="true">
          <Image src="/cover-kali.png" alt="" width={66} height={66} />
        </span>
        <span className="landing-nav-wordmark">
          <strong>Spiritual</strong>
          <small>{t.brandSub}</small>
        </span>
      </Link>

      <span className="landing-nav-edition" aria-hidden="true">
        {t.edition[0]}<br />{t.edition[1]}
      </span>

      <nav className="landing-nav-links" aria-label={t.primaryLabel}>
        <div
          ref={servicesRef}
          className={`site-nav-services${servicesOpen ? " is-open" : ""}`}
          onPointerEnter={(event) => scheduleHover(true, event)}
          onPointerLeave={(event) => scheduleHover(false, event)}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setServicesOpen(false);
            }
          }}
        >
          <div className="site-nav-services-control" data-current={onServicesPage || undefined}>
            <Link className="site-nav-services-link" href={href("/services")} onClick={closeAll}>
              <small>01</small>
              <span>{t.services}</span>
            </Link>
            <button
              ref={triggerRef}
              type="button"
              className="site-nav-services-trigger"
              aria-label={t.toggleServices}
              aria-expanded={servicesOpen}
              aria-controls={panelId}
              onClick={() => setServicesOpen((open) => !open)}
            >
              <i aria-hidden="true" />
            </button>
          </div>

          <div id={panelId} className="site-nav-panel" inert={!servicesOpen}>
            <div className="site-nav-panel-group site-nav-panel-group--tattoo">
              <p className="site-nav-panel-heading">
                <span>{t.tattoos}</span>
                <small>{format(t.tattooCount, { n: count(tattooServices) })}</small>
              </p>
              <ServiceLinks items={tattooServices} pathname={pathname} onNavigate={closeAll} />
            </div>

            <div className="site-nav-panel-group site-nav-panel-group--piercing">
              <p className="site-nav-panel-heading">
                <span>{t.piercings}</span>
                <small>{format(t.piercingCount, { n: count(piercingServices) })}</small>
              </p>
              <ServiceLinks items={piercingServices} pathname={pathname} onNavigate={closeAll} />
            </div>

            <aside className="site-nav-panel-aside">
              <p>{t.asideTitle}</p>
              <span>{t.asideText}</span>
              <Link href={href("/services")} onClick={closeAll}>
                {t.allServices} <i aria-hidden="true">↗</i>
              </Link>
              <Link href={href("/contact")} onClick={closeAll}>
                {t.freeConsultation} <i aria-hidden="true">↗</i>
              </Link>
            </aside>
          </div>
        </div>

        <Link href={anchor("philosophy")} onClick={closeAll}>
          <small>02</small><span>{t.philosophy}</span>
        </Link>
        <Link href={anchor("stories")} onClick={closeAll}>
          <small>03</small><span>{t.stories}</span>
        </Link>
        <Link href={anchor("visit")} onClick={closeAll}>
          <small>04</small><span>{t.visit}</span>
        </Link>
        <Link href={href("/contact")} aria-current={path === "/contact" ? "page" : undefined} onClick={closeAll}>
          <small>05</small><span>{t.contact}</span>
        </Link>
      </nav>

      <LanguageSwitch label={t.language} />

      <Link className="landing-nav-cta" href={href("/studio")} prefetch={false}>
        <span>{t.enterStudio}</span><i aria-hidden="true">↗</i>
      </Link>

      <button
        className="landing-nav-toggle"
        type="button"
        aria-expanded={navOpen}
        aria-controls="landing-mobile-nav"
        onClick={() => setNavOpen((open) => !open)}
      >
        <span>{navOpen ? t.close : t.menu}</span>
        <i aria-hidden="true"><b /><b /></i>
      </button>

      <div
        id="landing-mobile-nav"
        className="landing-mobile-nav"
        aria-hidden={!navOpen}
        inert={!navOpen}
      >
        <nav aria-label={t.mobileLabel}>
          <div className={`site-mobile-services-control${mobileServicesOpen ? " is-open" : ""}`}>
            <Link className="site-mobile-services-link" href={href("/services")} onClick={closeAll}>
              <small>01 /</small><span>{t.services}</span>
            </Link>
            <button
              type="button"
              className="site-mobile-services-toggle"
              aria-label={t.toggleCategories}
              aria-expanded={mobileServicesOpen}
              aria-controls={mobileServicesId}
              onClick={() => setMobileServicesOpen((open) => !open)}
            >
              <i aria-hidden="true">+</i>
            </button>
          </div>
          <div
            id={mobileServicesId}
            className={`site-mobile-services${mobileServicesOpen ? " is-open" : ""}`}
            inert={!mobileServicesOpen}
          >
            <div>
              <p>{t.tattoos}</p>
              <ServiceLinks items={tattooServices} pathname={pathname} onNavigate={closeAll} />
              <p>{t.piercings}</p>
              <ServiceLinks items={piercingServices} pathname={pathname} onNavigate={closeAll} />
              <Link className="site-mobile-services-all" href={href("/services")} onClick={closeAll}>
                {t.viewAllServices} <i aria-hidden="true">↗</i>
              </Link>
            </div>
          </div>
          <Link href={anchor("philosophy")} onClick={closeAll}>
            <small>02 /</small><span>{t.philosophy}</span><i aria-hidden="true">↘</i>
          </Link>
          <Link href={anchor("stories")} onClick={closeAll}>
            <small>03 /</small><span>{t.stories}</span><i aria-hidden="true">↘</i>
          </Link>
          <Link href={anchor("visit")} onClick={closeAll}>
            <small>04 /</small><span>{t.visit}</span><i aria-hidden="true">↘</i>
          </Link>
          <Link href={href("/studio")} prefetch={false} onClick={closeAll}>
            <small>05 /</small><span>{t.enterStudio}</span><i aria-hidden="true">↗</i>
          </Link>
          <Link href={href("/contact")} onClick={closeAll}>
            <small>06 /</small><span>{t.contactUs}</span><i aria-hidden="true">↗</i>
          </Link>
        </nav>
        <p>{t.mobileFoot}</p>
      </div>
    </header>
  );
}
