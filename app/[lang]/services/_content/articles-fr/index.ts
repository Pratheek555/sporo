import type { ServiceArticle } from "../types";
import page0 from "./black-and-grey-tattoo.json";
import page1 from "./conch-piercing.json";
import page2 from "./cover-up-tattoo.json";
import page3 from "./custom-tattoo-design.json";
import page4 from "./daith-piercing.json";
import page5 from "./ear-piercing.json";
import page6 from "./eyebrow-piercing.json";
import page7 from "./fine-line-tattoo.json";
import page8 from "./forearm-tattoo.json";
import page9 from "./helix-piercing.json";
import page10 from "./lettering-tattoo.json";
import page11 from "./lip-piercing.json";
import page12 from "./lobe-piercing.json";
import page13 from "./minimalist-tattoo.json";
import page14 from "./navel-piercing.json";
import page15 from "./nose-piercing.json";
import page16 from "./portrait-tattoo.json";
import page17 from "./realistic-tattoo.json";
import page18 from "./septum-piercing.json";
import page19 from "./sleeve-tattoo.json";
import page20 from "./small-tattoo.json";
import page21 from "./tattoo-artist.json";
import page22 from "./tattoo-studio.json";
import page23 from "./traditional-tattoo.json";

export const articlesFr: Record<string, ServiceArticle> = Object.fromEntries(
  [page0, page1, page2, page3, page4, page5, page6, page7, page8, page9, page10, page11, page12, page13, page14, page15, page16, page17, page18, page19, page20, page21, page22, page23].map((page) => [page.slug, page]),
);
