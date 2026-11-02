import Link from "next/link";
import { areas, areaHref } from "../[lang]/tattoo-shop-near/_content/areas";
import { getArea } from "../[lang]/tattoo-shop-near/_content/get-area";
import { localePath, type Locale } from "../lib/i18n/config";
import styles from "./area-directory.module.css";

export const areasLabel = (lang: Locale) => lang === "fr" ? "Les quartiers desservis" : "Areas we serve";

export default function AreaDirectory({ lang, exclude, directory = false }: { lang: Locale; exclude?: string; directory?: boolean }) {
  const fr = lang === "fr";
  return (
    <section className={styles.section} aria-label={areasLabel(lang)}>
      <div className={styles.heading}>
        <div><p className={styles.eyebrow}>PUDUCHERRY / {fr ? "LES QUARTIERS" : "THE NEIGHBOURHOODS"}</p>
          <h2>{directory ? (fr ? "Préparez votre visite." : "Find your way to us.") : areasLabel(lang)}</h2>
        </div>
        {!directory && <Link className={styles.action} href={localePath(lang, "/tattoo-shop-near")}>{fr ? "Tous les quartiers" : "Explore all areas"} <span aria-hidden="true">&#8599;</span></Link>}
      </div>
      <p className={styles.intro}>{fr ? "Un seul studio, à White Town. Retrouvez les informations locales pour préparer votre visite depuis les quartiers de Puducherry et des environs." : "One studio, in White Town. Explore local guides to plan your visit from across Puducherry and nearby neighbourhoods."}</p>
      <ul className={styles.grid}>
        {Object.keys(areas).filter(slug => slug !== exclude).map((slug, index) => {
          const area = getArea(lang, slug)!;
          return <li key={slug}><Link href={localePath(lang, areaHref(slug))}><small>{String(index + 1).padStart(2, "0")} /</small><strong>{area.area}</strong><span>{fr ? "Préparer la visite" : "Plan your visit"} <i aria-hidden="true">&#8599;</i></span></Link></li>;
        })}
      </ul>
      <Link className={styles.action} href={localePath(lang, "/services")}>{fr ? "Découvrir les tatouages et piercings" : "Explore tattoos & piercings"} <span aria-hidden="true">&#8599;</span></Link>
    </section>
  );
}
