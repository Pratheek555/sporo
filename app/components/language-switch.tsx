"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeMeta, locales, splitLocale, switchLocalePath } from "../lib/i18n/config";
import { useLang } from "../lib/i18n/locale-context";

// EN / FR toggle for the navigation rail. The current language is plain text; every
// other language is a real link to the same page in that language, so it works
// without JavaScript and is crawlable.
export default function LanguageSwitch({ label }: { label: string }) {
  const lang = useLang();
  const { path } = splitLocale(usePathname());

  return (
    <div className="landing-nav-lang" role="group" aria-label={label}>
      {locales.map((locale) =>
        locale === lang ? (
          <span key={locale} lang={locale} aria-current="true">
            {localeMeta[locale].short}
          </span>
        ) : (
          <Link
            key={locale}
            href={switchLocalePath(locale, path)}
            hrefLang={locale}
            lang={locale}
            aria-label={localeMeta[locale].switchLabel}
            title={localeMeta[locale].switchLabel}
            prefetch={false}
          >
            {localeMeta[locale].short}
          </Link>
        ),
      )}
    </div>
  );
}
