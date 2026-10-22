"use client";

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  piercingServices,
  serviceHref,
  tattooServices,
  type ServiceSummary,
} from "../services/_content/registry";

const HOVER_OPEN_DELAY = 90;
const HOVER_CLOSE_DELAY = 220;

function ServiceLinks({
  items,
  pathname,
  onNavigate,
  offset = 0,
}: {
  items: readonly ServiceSummary[];
  pathname: string;
  onNavigate: () => void;
  offset?: number;
}) {
  return (
    <ul>
      {items.map((service, index) => {
        const href = serviceHref(service.slug);
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

export default function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const anchor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const [navOpen, setNavOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(
    () => pathname.startsWith("/services"),
  );

  const servicesRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const mobileServicesId = useId();
  const onServicesPage = pathname.startsWith("/services");

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

  return (
    <header className={`landing-nav${navOpen ? " is-open" : ""}`}>
      <Link className="landing-nav-brand" href={isHome ? "#top" : "/"} aria-label="Spiritual Tattoo Art home">
        <span className="landing-nav-logo" aria-hidden="true">
          <Image src="/cover-kali.png" alt="" width={66} height={66} />
        </span>
        <span className="landing-nav-wordmark">
          <strong>Spiritual</strong>
          <small>Tattoo Art / Pondicherry</small>
        </span>
      </Link>

      <span className="landing-nav-edition" aria-hidden="true">
        White Town<br />Est. 2018
      </span>

      <nav className="landing-nav-links" aria-label="Primary navigation">
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
            <Link className="site-nav-services-link" href="/services" onClick={closeAll}>
              <small>01</small>
              <span>Services</span>
            </Link>
            <button
              ref={triggerRef}
              type="button"
              className="site-nav-services-trigger"
              aria-label="Toggle services menu"
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
                <span>Tattoos</span>
                <small>{String(tattooServices.length).padStart(2, "0")} styles &amp; services</small>
              </p>
              <ServiceLinks items={tattooServices} pathname={pathname} onNavigate={closeAll} />
            </div>

            <div className="site-nav-panel-group site-nav-panel-group--piercing">
              <p className="site-nav-panel-heading">
                <span>Piercings</span>
                <small>{String(piercingServices.length).padStart(2, "0")} placements</small>
              </p>
              <ServiceLinks items={piercingServices} pathname={pathname} onNavigate={closeAll} />
            </div>

            <aside className="site-nav-panel-aside">
              <p>Not sure what you want yet?</p>
              <span>Consultations are free. Walk in or message us first.</span>
              <Link href="/services" onClick={closeAll}>
                All services <i aria-hidden="true">↗</i>
              </Link>
              <Link href="/contact" onClick={closeAll}>
                Free consultation <i aria-hidden="true">↗</i>
              </Link>
            </aside>
          </div>
        </div>

        <Link href={anchor("philosophy")} onClick={closeAll}>
          <small>02</small><span>Philosophy</span>
        </Link>
        <Link href={anchor("stories")} onClick={closeAll}>
          <small>03</small><span>Stories</span>
        </Link>
        <Link href={anchor("visit")} onClick={closeAll}>
          <small>04</small><span>Visit</span>
        </Link>
        <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined} onClick={closeAll}>
          <small>05</small><span>Contact</span>
        </Link>
      </nav>

      <Link className="landing-nav-cta" href="/studio" prefetch={false}>
        <span>Enter studio</span><i aria-hidden="true">↗</i>
      </Link>

      <button
        className="landing-nav-toggle"
        type="button"
        aria-expanded={navOpen}
        aria-controls="landing-mobile-nav"
        onClick={() => setNavOpen((open) => !open)}
      >
        <span>{navOpen ? "Close" : "Menu"}</span>
        <i aria-hidden="true"><b /><b /></i>
      </button>

      <div
        id="landing-mobile-nav"
        className="landing-mobile-nav"
        aria-hidden={!navOpen}
        inert={!navOpen}
      >
        <nav aria-label="Mobile navigation">
          <div className={`site-mobile-services-control${mobileServicesOpen ? " is-open" : ""}`}>
            <Link className="site-mobile-services-link" href="/services" onClick={closeAll}>
              <small>01 /</small><span>Services</span>
            </Link>
            <button
              type="button"
              className="site-mobile-services-toggle"
              aria-label="Toggle service categories"
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
              <p>Tattoos</p>
              <ServiceLinks items={tattooServices} pathname={pathname} onNavigate={closeAll} />
              <p>Piercings</p>
              <ServiceLinks items={piercingServices} pathname={pathname} onNavigate={closeAll} />
              <Link className="site-mobile-services-all" href="/services" onClick={closeAll}>
                View all services <i aria-hidden="true">↗</i>
              </Link>
            </div>
          </div>
          <Link href={anchor("philosophy")} onClick={closeAll}>
            <small>02 /</small><span>Philosophy</span><i aria-hidden="true">↘</i>
          </Link>
          <Link href={anchor("stories")} onClick={closeAll}>
            <small>03 /</small><span>Stories</span><i aria-hidden="true">↘</i>
          </Link>
          <Link href={anchor("visit")} onClick={closeAll}>
            <small>04 /</small><span>Visit</span><i aria-hidden="true">↘</i>
          </Link>
          <Link href="/studio" prefetch={false} onClick={closeAll}>
            <small>05 /</small><span>Enter studio</span><i aria-hidden="true">↗</i>
          </Link>
          <Link href="/contact" onClick={closeAll}>
            <small>06 /</small><span>Contact us</span><i aria-hidden="true">↗</i>
          </Link>
        </nav>
        <p>Walk-ins welcome / Free consultation</p>
      </div>
    </header>
  );
}
