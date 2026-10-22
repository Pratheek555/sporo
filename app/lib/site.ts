// Single source of truth for the studio's name, address, phone, hours and links.
// Keeping these identical everywhere (site, schema, Google Business Profile)
// is one of the strongest local-SEO signals, so edit them here only.

export const site = {
  name: "Spiritual Tattoo Art Studio",
  shortName: "Spiritual Tattoo Art",
  url: "https://spiritualart3.com",
  founded: 2018,
  owner: "Mukhilan",
  phone: "+91 81242 59830",
  phoneHref: "tel:+918124259830",
  email: "studio@spiritualart3.com",
  whatsappUrl: "https://wa.me/918124259830",
  directionsUrl:
    "https://www.google.com/maps?q=34+Law+De+Lauriston+St+Near+Central+Bank+of+India+White+Town+Puducherry+605001",
  address: {
    street: "No. 34, Law De Lauriston Street",
    landmark: "Near Central Bank of India",
    locality: "White Town",
    city: "Puducherry",
    region: "Puducherry",
    postalCode: "605001",
    country: "IN",
  },
  hours: [
    {
      label: "Monday – Thursday",
      time: "10 am – 8 pm",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "10:00",
      closes: "20:00",
    },
    {
      label: "Friday – Sunday",
      time: "10 am – 9 pm",
      days: ["Friday", "Saturday", "Sunday"],
      opens: "10:00",
      closes: "21:00",
    },
  ],
} as const;

export const businessId = `${site.url}/#studio`;

export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["TattooParlor", "HealthAndBeautyBusiness"],
    "@id": businessId,
    name: site.name,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    image: `${site.url}/media/studio-gallery/studio-gallery-2.png`,
    logo: `${site.url}/cover-kali.png`,
    foundingDate: String(site.founded),
    founder: { "@type": "Person", name: site.owner },
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.street}, ${site.address.landmark}`,
      addressLocality: `${site.address.locality}, ${site.address.city}`,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: site.address.country,
    },
    hasMap: site.directionsUrl,
    areaServed: [
      "Puducherry",
      "White Town",
      "Auroville",
      "Lawspet",
      "Muthialpet",
      "Reddiarpalayam",
      "Ariyankuppam",
      "Kottakuppam",
    ],
    openingHoursSpecification: site.hours.map((slot) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: slot.days,
      opens: slot.opens,
      closes: slot.closes,
    })),
  };
}

export function jsonLdScript(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
