import type { AreaPage } from "../types";
import page0 from "./auroville.json";
import page1 from "./french-quarter.json";
import page2 from "./goubert-avenue.json";
import page3 from "./kottakuppam.json";
import page4 from "./lawspet.json";
import page5 from "./mission-street.json";
import page6 from "./muthialpet.json";
import page7 from "./promenade-beach.json";
import page8 from "./reddiarpalayam.json";
import page9 from "./serenity-beach.json";
import page10 from "./white-town.json";

export const areasFr: Record<string, AreaPage> = Object.fromEntries(
  [page0, page1, page2, page3, page4, page5, page6, page7, page8, page9, page10].map((page) => [page.slug, page]),
);
