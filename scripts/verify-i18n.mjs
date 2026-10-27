import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import ts from "typescript";

const load = createRequire(import.meta.url);
load.extensions[".ts"] = (module, filename) => module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText, filename);
const root = process.cwd();
const read = (file) => load(path.join(root, file));
const { articles } = read("app/[lang]/services/_content/articles/index.ts");
const { articlesFr } = read("app/[lang]/services/_content/articles-fr/index.ts");
const { areas } = read("app/[lang]/tattoo-shop-near/_content/areas/index.ts");
const { areasFr } = read("app/[lang]/tattoo-shop-near/_content/areas-fr/index.ts");
const { services, getServices } = read("app/[lang]/services/_content/registry.ts");
const { localePath, splitLocale, switchLocalePath } = read("app/lib/i18n/config.ts");
const { frenchTypography } = read("app/lib/i18n/text.ts");
const english = read("app/lib/i18n/dictionaries/en.ts").default;
const french = read("app/lib/i18n/dictionaries/fr.ts").default;
function checkShape(en, fr, key) {
  assert.equal(typeof fr, typeof en, `${key}: matching value type`);
  if (Array.isArray(en)) {
    assert.equal(fr.length, en.length, `${key}: matching item count`);
    en.forEach((value, i) => checkShape(value, fr[i], `${key}.${i}`));
  } else if (en && typeof en === "object") {
    assert.deepEqual(Object.keys(fr).sort(), Object.keys(en).sort(), `${key}: matching keys`);
    for (const name of Object.keys(en)) checkShape(en[name], fr[name], `${key}.${name}`);
  } else if (typeof en === "string") {
    assert(fr.trim(), `${key}: nonempty French text`);
    assert.deepEqual(fr.match(/\{\w+\}/g)?.sort(), en.match(/\{\w+\}/g)?.sort(), `${key}: format placeholders`);
  }
}
checkShape(english, french, "dictionary");
const destinations = (body) => [...body.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)].map((match) => match[1]).sort();
for (const [originals, translations, prefix] of [[articles, articlesFr, "/services"], [areas, areasFr, "/tattoo-shop-near"]]) {
  assert.deepEqual(Object.keys(translations).sort(), Object.keys(originals).sort(), `${prefix}: complete translations`);
  for (const [slug, original] of Object.entries(originals)) {
    const translated = translations[slug];
    checkShape(original, translated, slug);
    assert.equal(translated.slug, slug);
    assert.deepEqual(translated.related, original.related, `${slug}: related service IDs preserved`);
    assert.deepEqual(destinations(translated.body), destinations(original.body), `${slug}: link and image destinations preserved`);
    assert.equal((translated.body.match(/^#{2,3} /gm) ?? []).length, (original.body.match(/^#{2,3} /gm) ?? []).length, `${slug}: headings preserved`);
    const tableRows = (body) => body.split("\n").filter((line) => line.startsWith("|")).map((line) => line.split("|").length);
    assert.deepEqual(tableRows(translated.body), tableRows(original.body), `${slug}: table rows and columns preserved`);
    assert(!/ZXQ|\u200b/.test(JSON.stringify(translated)), `${slug}: no translation artifacts`);
    assert.notEqual(translated.body, original.body, `${slug}: translated article`);
    const route = `${prefix}/${slug}`;
    assert.equal(switchLocalePath("fr", route), `/fr${route}`);
    assert.equal(switchLocalePath("en", splitLocale(`/fr${route}`).path), route);
  }
}
assert.equal(getServices("fr").length, services.length);
assert.equal(localePath("fr", "/services#faq"), "/fr/services#faq");
assert.equal(localePath("fr", "https://example.com"), "https://example.com");
assert.equal(frenchTypography("Une question ?"), "Une question\u00a0?");
console.log("French dictionary, 24 services, 11 areas, links, headings and locale switching verified.");

const base = process.argv[2];
if (base) {
  const routes = ["/", "/contact", "/studio", "/services", ...Object.keys(articles).map((slug) => `/services/${slug}`), ...Object.keys(areas).map((slug) => `/tattoo-shop-near/${slug}`)];
  for (const lang of ["en", "fr"]) {
    for (const route of routes) {
      const localized = localePath(lang, route);
      const response = await fetch(new URL(localized, base));
      assert.equal(response.status, 200, `${localized}: HTTP 200`);
      const html = await response.text();
      assert(html.includes(`<html lang="${lang}"`), `${localized}: document language`);
      const canonical = html.match(/<link rel="canonical" href="([^"]+)"/);
      assert(canonical, `${localized}: canonical metadata`);
      assert.equal(new URL(canonical[1]).pathname, localized, `${localized}: localized canonical`);
      assert(html.includes('hrefLang="fr"') || html.includes('hreflang="fr"'), `${localized}: French alternate`);
      assert(!html.includes('This article hasn’t been translated yet') && !html.includes('Cet article n’a pas encore été traduit'), `${localized}: no English article fallback`);
    }
  }
  const redirect = await fetch(new URL("/en/contact?from=test", base), { redirect: "manual" });
  assert.equal(redirect.status, 308);
  assert.equal(new URL(redirect.headers.get("location"), base).pathname, "/contact");
  assert.equal(new URL(redirect.headers.get("location"), base).search, "?from=test");
  for (const route of ["/fr/services/unknown-service", "/fr/tattoo-shop-near/unknown-area", "/unknown-page"]) {
    assert.equal((await fetch(new URL(route, base))).status, 404, `${route}: genuine 404`);
  }
  console.log("All 78 public pages, localized metadata, English redirects and unknown-route 404s verified over HTTP.");
}
