import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

function readModule(file) {
  const source = fs.readFileSync(file, "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, { exports }, { filename: file });
  return exports;
}

const directory = path.resolve("app/tattoo-shop-near/_content/areas");
const { site, businessId, localBusinessJsonLd } = readModule(path.resolve("app/lib/site.ts"));
const pages = fs.readdirSync(directory).filter((name) => name.endsWith(".ts") && name !== "index.ts")
  .flatMap((name) => Object.values(readModule(path.join(directory, name))));
pages.sort((a, b) => a.slug === "white-town" ? -1 : b.slug === "white-town" ? 1 : a.area.localeCompare(b.area));
const plain = (text) => text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1");
const code = (data) => `\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``;
const sections = ["# Nearby area landing pages", "This editorial export contains all 11 pages, their strategy, outline, metadata, image alt suggestions and structured data. The website keeps strategy and outline in its content files. Image alt suggestions are for future photographs and must match the actual image before use. The pages share one White Town business identity and are discoverable through the sitemap. No search ranking or rich result is guaranteed."];

for (const page of pages) {
  const url = `${site.url}/tattoo-shop-near/${page.slug}`;
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage", "@id": `${url}#faq`,
    mainEntity: page.faqs.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: plain(faq.a) } })),
  };
  const businessSchema = { ...localBusinessJsonLd(), "@id": businessId, areaServed: { "@type": "Place", name: page.area } };
  const breadcrumbSchema = {
    "@context": "https://schema.org", "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: `Tattoo shop near ${page.area}`, item: url },
    ],
  };
  sections.push(
    `# ${page.area}`,
    "## Quick Strategy Summary", page.strategy,
    "## Outline", page.outline.map((line) => `- ${line}`).join("\n"),
    "## Full Landing Page", `# ${page.h1.lead} ${page.h1.accent}`, page.lede, page.body.trim(),
    `## ${page.faqTitle.lead} ${page.faqTitle.accent}`,
    ...page.faqs.flatMap((faq) => [`### ${faq.q}`, faq.a]),
    "## SEO Elements",
    `- SEO Title: ${page.seo.title}\n- Meta Description: ${page.seo.description}\n- Suggested URL Slug: /tattoo-shop-near/${page.slug}\n- H1: ${page.h1.lead} ${page.h1.accent}`,
    "### Image alt text suggestions", page.seo.imageAltIdeas.map((alt) => `- ${alt}`).join("\n"),
    "### Suggested internal links", [...new Set(["/contact", "/studio", ...page.related.map((slug) => `/services/${slug}`), ...[...page.body.matchAll(/\]\((\/services\/[^)]+)\)/g)].map((match) => match[1])])].map((href) => `- ${href}`).join("\n"),
    "### FAQ Schema (JSON-LD)", code(faqSchema),
    "### LocalBusiness Schema (JSON-LD)", code(businessSchema),
    "### Breadcrumb Schema (JSON-LD)", code(breadcrumbSchema),
  );
}

fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/nearby-area-pages.md", `${sections.join("\n\n")}\n`);
console.log(`Exported ${pages.length} area pages to docs/nearby-area-pages.md`);
