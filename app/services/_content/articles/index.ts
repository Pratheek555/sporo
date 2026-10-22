import type { ServiceArticle } from "../types";
import { tattooStudio } from "./tattoo-studio";
import { tattooArtist } from "./tattoo-artist";
import { customTattooDesign } from "./custom-tattoo-design";
import { realisticTattoo } from "./realistic-tattoo";
import { blackAndGreyTattoo } from "./black-and-grey-tattoo";
import { fineLineTattoo } from "./fine-line-tattoo";
import { minimalistTattoo } from "./minimalist-tattoo";
import { coverUpTattoo } from "./cover-up-tattoo";
import { letteringTattoo } from "./lettering-tattoo";
import { sleeveTattoo } from "./sleeve-tattoo";
import { portraitTattoo } from "./portrait-tattoo";
import { forearmTattoo } from "./forearm-tattoo";
import { traditionalTattoo } from "./traditional-tattoo";
import { smallTattoo } from "./small-tattoo";
import { earPiercing } from "./ear-piercing";
import { nosePiercing } from "./nose-piercing";
import { eyebrowPiercing } from "./eyebrow-piercing";
import { lipPiercing } from "./lip-piercing";
import { helixPiercing } from "./helix-piercing";
import { navelPiercing } from "./navel-piercing";
import { lobePiercing } from "./lobe-piercing";
import { septumPiercing } from "./septum-piercing";
import { conchPiercing } from "./conch-piercing";
import { daithPiercing } from "./daith-piercing";

export const articles: Record<string, ServiceArticle> = Object.fromEntries(
  [
    tattooStudio,
    tattooArtist,
    customTattooDesign,
    realisticTattoo,
    blackAndGreyTattoo,
    fineLineTattoo,
    minimalistTattoo,
    coverUpTattoo,
    letteringTattoo,
    sleeveTattoo,
    portraitTattoo,
    forearmTattoo,
    traditionalTattoo,
    smallTattoo,
    earPiercing,
    nosePiercing,
    eyebrowPiercing,
    lipPiercing,
    helixPiercing,
    navelPiercing,
    lobePiercing,
    septumPiercing,
    conchPiercing,
    daithPiercing,
  ].map((article) => [article.slug, article]),
);
