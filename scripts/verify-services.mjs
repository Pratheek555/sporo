import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const loadContent = createRequire(import.meta.url);

// Load the actual content objects, including their template strings.
loadContent.extensions['.ts'] = (module, filename) => {
  const source = fs.readFileSync(filename, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  });
  module._compile(outputText, filename);
};

const root = fileURLToPath(new URL('..', import.meta.url));
const { articles } = loadContent(path.join(root, 'app/services/_content/articles/index.ts'));
const { services } = loadContent(path.join(root, 'app/services/_content/registry.ts'));
const issues = [];
const check = (condition, message) => { if (!condition) issues.push(message); };
assert.equal(Object.keys(articles).length, 24);
for (const service of services) {
  const article = articles[service.slug];
  check(Boolean(article), `${service.slug}: missing article`);
  if (!article) continue;
  const copy = [article.lede, article.body, ...article.faqs.flatMap(faq => [faq.q, faq.a])].join(' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[#*|>]/g, '');
  const words = copy.trim().split(/\s+/).length;
  check(words >= 1800 && words <= 2500, `${service.slug}: ${words} words`);
  check(article.seo.title.length >= 60 && article.seo.title.length <= 120, `${service.slug}: title length ${article.seo.title.length}`);
  check(article.seo.description.length >= 150 && article.seo.description.length <= 160, `${service.slug}: description length ${article.seo.description.length}`);
  check(article.faqs.length >= 6 && article.faqs.length <= 10, `${service.slug}: FAQ count ${article.faqs.length}`);
  check(article.seo.imageAltIdeas.length >= 3 && article.seo.imageAltIdeas.length <= 4, `${service.slug}: image alt count`);
  for (const slug of article.related) check(Boolean(articles[slug]), `${service.slug}: broken related link ${slug}`);
  for (const [, href] of article.body.matchAll(/\]\((\/[^)\s]+)\)/g)) {
    if (href.startsWith('/services/')) check(Boolean(articles[href.slice(10)]), `${service.slug}: broken link ${href}`);
  }
  check(!/\[PLACEHOLDER|primary keyword|search intent|Quick Strategy Summary/i.test(copy), `${service.slug}: editorial notes visible`);
  console.log(`${service.slug}: ${words} words, ${article.faqs.length} FAQs`);
}
if (issues.length) {
  console.error(issues.join('\n'));
  process.exitCode = 1;
} else {
  console.log('All 24 service articles meet the content and metadata checks.');
}
