import type { AreaPage } from "../types";
import { whiteTown } from "./white-town";
import { frenchQuarter } from "./french-quarter";
import { promenadeBeach } from "./promenade-beach";
import { missionStreet } from "./mission-street";
import { goubertAvenue } from "./goubert-avenue";
import { lawspet } from "./lawspet";
import { muthialpet } from "./muthialpet";
import { serenityBeach } from "./serenity-beach";
import { kottakuppam } from "./kottakuppam";
import { reddiarpalayam } from "./reddiarpalayam";
import { auroville } from "./auroville";

export const areas: Record<string, AreaPage> = Object.fromEntries(
  [
    whiteTown,
    frenchQuarter,
    promenadeBeach,
    missionStreet,
    goubertAvenue,
    lawspet,
    muthialpet,
    serenityBeach,
    kottakuppam,
    reddiarpalayam,
    auroville,
  ].map((page) => [page.slug, page]),
);

export const areaHref = (slug: string) => `/tattoo-shop-near/${slug}`;
