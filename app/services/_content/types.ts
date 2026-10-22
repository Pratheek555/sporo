export type ServiceFact = { label: string; value: string };

export type ServiceFaq = { q: string; a: string };

export type ServiceArticle = {
  slug: string;
  /**
   * Quick strategy summary — internal notes on search intent and why the page
   * should outperform competitors. Never rendered.
   */
  strategy: string;
  seo: {
    /** 60–120 characters. */
    title: string;
    /** 150–160 characters. */
    description: string;
    keywords: string[];
    /** Alt-text ideas for the portfolio photos still to be shot for this page. */
    imageAltIdeas: string[];
  };
  /** Rendered as `<h1>{lead} <span>{accent}</span></h1>`. */
  h1: { lead: string; accent: string };
  kicker: string;
  lede: string;
  facts: ServiceFact[];
  /**
   * Article body in a small markdown dialect: `##`/`###` headings, paragraphs,
   * `-` and `1.` lists, `- [ ]` checklists, `|` tables (optional `Table:` caption
   * line above), `>` callouts, `![alt](src "caption")` figures, and inline
   * `**bold**`, `*italic*` and `[label](/href)` links.
   */
  body: string;
  faqs: ServiceFaq[];
  related: string[];
};
