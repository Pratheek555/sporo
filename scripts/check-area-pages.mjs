import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import ts from "typescript";

const root = process.cwd();
const directory = path.join(root, "app/tattoo-shop-near/_content/areas");
const expected = ["white-town", "french-quarter", "promenade-beach", "mission-street", "goubert-avenue", "lawspet", "muthialpet", "reddiarpalayam", "auroville", "serenity-beach", "kottakuppam"];
const base = process.argv[2];
const siteUrl = "https://spiritualart3.com";
const serviceIndex = fs.readFileSync(path.join(root, "app/services/_content/registry.ts"), "utf8");
const services = new Set([...serviceIndex.matchAll(/slug: "([^"]+)"/g)].map((match) => match[1]));
const index = fs.readFileSync(path.join(directory, "index.ts"), "utf8");
const titles = new Set();
const descriptions = new Set();
const questions = new Set();
const headings = new Map();
const results = [];

function loadPage(slug) {
  const source = fs.readFileSync(path.join(directory, `${slug}.ts`), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
  const exports = {};
  vm.runInNewContext(compiled, { exports }, { filename: `${slug}.ts` });
  return Object.values(exports).find((value) => value?.slug === slug);
}

function plain(text) {
  return text.replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_#>|]/g, " ");
}

for (const slug of expected) {
  const page = loadPage(slug);
  assert(page, `${slug} exports its area article`);
  assert(index.includes(`from "./${slug}"`), `${slug} is registered`);
  const text = [page.lede, page.body, ...page.faqs.flatMap((faq) => [faq.q, faq.a])].join(" ");
  const words = plain(text).match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
  assert(words >= 1800 && words <= 2800, `${slug} has ${words} words, expected 1800 to 2800`);
  assert(page.strategy && page.outline.length, `${slug} includes an editorial strategy and outline`);
  assert(page.seo.imageAltIdeas.length >= 5 && page.seo.imageAltIdeas.length <= 6, `${slug} has five or six image alt ideas`);
  assert(page.seo.title.trim() && page.seo.description.trim(), `${slug} supplies search metadata`);
  assert(!titles.has(page.seo.title), `${slug} has a unique SEO title`);
  assert(!descriptions.has(page.seo.description), `${slug} has a unique description`);
  titles.add(page.seo.title);
  descriptions.add(page.seo.description);
  assert(text.includes("White Town") && text.includes("Law De Lauriston Street"), `${slug} identifies the White Town address`);
  assert(!text.includes("[PLACEHOLDER"), `${slug} has no unresolved public placeholders`);
  assert(page.body.includes("### ") && page.body.includes("|---"), `${slug} has subheadings and a table`);
  for (const faq of page.faqs) {
    assert(!questions.has(faq.q), `${slug} repeats FAQ ${faq.q}`);
    questions.add(faq.q);
  }
  for (const match of page.body.matchAll(/^#{2,3} (.+)$/gm)) {
    const heading = match[1].toLowerCase();
    assert(!headings.has(heading), `${slug} repeats heading from ${headings.get(heading)}: ${heading}`);
    headings.set(heading, slug);
  }
  for (const related of page.related) assert(services.has(related), `${slug} links to known service ${related}`);
  for (const match of page.body.matchAll(/\]\((\/[^)\s]+)\)/g)) {
    const href = match[1];
    if (href.startsWith("/services/")) assert(services.has(href.slice(10)), `${slug} has valid link ${href}`);
  }
  for (const match of page.body.matchAll(/!\[[^\]]*\]\((\/[^)\s]+)/g)) {
    assert(fs.existsSync(path.join(root, "public", match[1])), `${slug} image exists ${match[1]}`);
  }
  if (base) {
    const response = await fetch(`${base}/tattoo-shop-near/${slug}`);
    assert.equal(response.status, 200, `${slug} returns HTTP 200`);
    const html = await response.text();
    assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${slug} renders one H1`);
    const canonical = html.match(/<link[^>]*rel="canonical"[^>]*href="([^"]+)"/);
    assert.equal(canonical?.[1], `${siteUrl}/tattoo-shop-near/${slug}`, `${slug} has a self canonical`);
    assert(!/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(html), `${slug} permits indexing`);
    const nodes = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
      .flatMap((match) => { const data = JSON.parse(match[1]); return data["@graph"] ?? [data]; });
    const faq = nodes.find((node) => node["@type"] === "FAQPage");
    assert.equal(faq?.mainEntity.length, page.faqs.length, `${slug} FAQ schema matches visible questions`);
    for (const item of faq.mainEntity) assert(html.includes(item.name.replaceAll("&", "&amp;").replaceAll("'", "&#x27;").replaceAll('"', "&quot;")) || html.includes(item.name), `${slug} renders schema question ${item.name}`);
    assert(nodes.some((node) => node["@type"] === "BreadcrumbList"), `${slug} has breadcrumb schema`);
    const studio = nodes.find((node) => node.address?.streetAddress);
    assert(studio?.address.streetAddress.includes("No. 34, Law De Lauriston Street"), `${slug} shares the studio address`);
    assert.equal(studio.openingHoursSpecification.length, 2, `${slug} has studio opening hours`);
    assert.equal(new Set(nodes.filter((node) => String(node["@type"]).includes("TattooParlor")).map((node) => node["@id"])).size, 1, `${slug} references one business identity`);
    const menus = [...html.matchAll(/<(nav|footer)\b[^>]*>([\s\S]*?)<\/\1>/g)];
    for (const [, , menu] of menus) {
      for (const link of menu.matchAll(/href="([^"]+)"/g)) {
        assert(!new URL(link[1], siteUrl).pathname.startsWith("/tattoo-shop-near/"), `${slug} is absent from navigation and footer links`);
      }
    }
  }
  results.push({ slug, words, titleCharacters: page.seo.title.length, descriptionCharacters: page.seo.description.length, faqs: page.faqs.length, httpChecked: Boolean(base) });
  console.log(`PASS ${slug}: ${words} words, ${page.faqs.length} FAQs${base ? ", HTTP and schema verified" : ""}`);
}

if (base) {
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  for (const slug of expected) assert(sitemap.includes(`${siteUrl}/tattoo-shop-near/${slug}</loc>`), `${slug} appears in sitemap`);
  assert.equal((sitemap.match(/<loc>[^<]*\/tattoo-shop-near\//g) ?? []).length, 11, "sitemap lists exactly 11 area pages");
  const missing = await fetch(`${base}/tattoo-shop-near/not-a-real-area`);
  assert.equal(missing.status, 404, "unknown area returns 404");
  console.log("PASS sitemap discovery and unknown-area 404");
}

fs.mkdirSync(path.join(root, ".audit"), { recursive: true });
fs.writeFileSync(path.join(root, ".audit/area-pages-verification.json"), `${JSON.stringify(results, null, 2)}\n`);
