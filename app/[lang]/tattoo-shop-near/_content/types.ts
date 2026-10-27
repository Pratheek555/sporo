import type { ServiceFact, ServiceFaq } from "../../services/_content/types";

// Hyperlocal landing pages for the neighbourhoods around the studio. They exist
// for search engines: listed in the sitemap, never linked from the site's nav,
// footer or hub pages. The studio has ONE location (White Town); every page
// must say so rather than imply a branch in the area it targets.

export type AreaPage = {
  slug: string;
  /** Neighbourhood name as locals write it, e.g. "Muthialpet". */
  area: string;
  /**
   * Quick strategy summary — search intent, audience and the local angle that
   * keeps this page distinct from its siblings. Never rendered.
   */
  strategy: string;
  /** H2/H3 outline of the body, kept for editors. Never rendered. */
  outline: string[];
  seo: {
    /** Descriptive search title for this area and the White Town studio. */
    title: string;
    /** A concise, unique summary for search results. */
    description: string;
    keywords: string[];
    /** Alt-text ideas for area-specific photos still to be shot. */
    imageAltIdeas: string[];
  };
  /** Rendered as `<h1>{lead} <span>{accent}</span></h1>`. */
  h1: { lead: string; accent: string };
  kicker: string;
  lede: string;
  facts: ServiceFact[];
  /** Same markdown dialect as the service articles (see ServiceArticle.body). */
  body: string;
  /** Heading above the FAQ list, unique per page. Line break goes before `accent`. */
  faqTitle: { lead: string; accent: string };
  faqs: ServiceFaq[];
  /** Service slugs for the "Keep exploring" block. */
  related: string[];
};
