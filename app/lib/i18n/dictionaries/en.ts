// English copy for the shared UI: navigation, landing page, contact, studio and the
// services hub / article chrome. `fr.ts` must mirror this shape exactly (the type below
// enforces it). Inline markup follows the small markdown dialect of the service articles:
// **bold**, *italic* and [label](/internal-link).
//
// Long-form service articles live next to their routes, not here.

const en = {
  meta: {
    title:
      "BEST Tattoo and piercing shop Pondicherry - if you're looking for Tattoo Shop near me or Piercing Shop near me - Spiritual Tattoo Art Studio is the place to be",
    description:
      "Original blackwork, fine-line, large-scale, and cover-up tattoos created at our studio in Pondicherry.",
    ogDescription: "One-of-one tattoos designed around anatomy, movement, and longevity.",
    keywords: [
      "custom tattoo studio",
      "blackwork tattoo",
      "fine line tattoo",
      "tattoo consultation",
      "Spiritual Tattoo Studio",
    ],
  },

  hours: [
    { label: "Monday – Thursday", time: "10 am – 8 pm" },
    { label: "Friday – Sunday", time: "10 am – 9 pm" },
  ],

  whatsapp: {
    message: "Hi Spiritual Tattoo Art! I'd like a free consultation.",
    messageWithTopic: "Hi Spiritual Tattoo Art! I'd like a free consultation. I'm interested in: {topic}.",
  },

  nav: {
    homeLabel: "Spiritual Tattoo Art home",
    brandSub: "Tattoo Art / Pondicherry",
    edition: ["White Town", "Est. 2018"],
    primaryLabel: "Primary navigation",
    mobileLabel: "Mobile navigation",
    services: "Services",
    toggleServices: "Toggle services menu",
    toggleCategories: "Toggle service categories",
    tattoos: "Tattoos",
    piercings: "Piercings",
    tattooCount: "{n} styles & services",
    piercingCount: "{n} placements",
    asideTitle: "Not sure what you want yet?",
    asideText: "Consultations are free. Walk in or message us first.",
    allServices: "All services",
    viewAllServices: "View all services",
    freeConsultation: "Free consultation",
    philosophy: "Philosophy",
    stories: "Stories",
    visit: "Visit",
    contact: "Contact",
    contactUs: "Contact us",
    enterStudio: "Enter studio",
    menu: "Menu",
    close: "Close",
    mobileFoot: "Walk-ins welcome / Free consultation",
    language: "Language",
  },

  hero: {
    filmIndex: "STS / VISUAL ARCHIVE / 001",
    filmState: "LOOPING",
    streamLeft: "STS / 01 / PONDICHERRY / ART / INK / FORM",
    streamRight: "MEMORY / RITUAL / BODY / PERMANENCE / 2026",
    tagline: "Changing the way you feel art",
    welcome: ["Bienvenue", "À votre service"],
    titleSeo: "Tattoo & Piercing Studio in Pondicherry: ",
    descriptorKicker: ["Tattoo & Piercing Shop", "in", "Pondicherry"],
    descriptorNote: "The best & most trusted studio in town.",
    enterLabel: "Enter Spiritual Tattoo Studio",
    ring: ["Step inside the archive", "Enter studio"],
  },

  about: {
    chapter: "ABOUT / 02",
    portraitAlt: "Mukhilan, founder of Spiritual Tattoo Art Studio",
    portraitCaption: "Founder / Artist",
    kicker: "The hands behind the mark",
    lines: ["Made by hand.", "Shaped around you.", "Carried for life."],
    paragraphs: [
      "Mukhilan, founder of Spiritual Tattoo Art Studio, has been shaping his craft since 2018. For him, tattooing is not about chasing money, but about respecting the art and the person receiving it. He takes the time to understand each individual and create work that feels personal and meaningful.",
      "Every design is carefully considered so it naturally belongs on the skin, rather than simply sitting on it. His approach goes beyond creating tattoos; it is about creating art that carries meaning, character, and permanence.",
    ],
    quote: "“The best mark feels discovered, not added.”",
    link: "Enter the studio",
  },

  testimonials: {
    heading: "Google reviews from our clients",
    chapter: "CLIENT STORIES / {total}",
    googleLabel: "Read our reviews on Google",
    reviews: "Reviews ↗",
    googleReview: "Google review ↗",
    stars: "5 out of 5 stars",
    progress: "What they carry",
    scrollHint: "Scroll to read",
    swipeHint: "Swipe to read →",
    quotes: [
      "Excellent tattoo artist, and someone I trust completely.",
      "Beautiful, delicate, and exactly what I had imagined.",
      "Very clean and professional.",
      "Mukhilan is a true artist and a deeply spiritual person.",
      "The artist was professional, talented, and made me feel comfortable throughout the whole process.",
      "His work is really detailed and beautifully done, and he always gives helpful advice on the placement and size.",
      "The piercer was super friendly, very welcoming, and flexible.",
      "Mister Mukhilan is an absolut great Artist. So friendly and patient.",
    ],
  },

  location: {
    label: "{FIND THE STUDIO}",
    address: ["34 Law De Lauriston Street", "Near Central Bank of India, 605001"],
    callAria: "Call {name} at {phone}",
    call: "Call ↗",
    maps: "Open in Google Maps",
    mapTitle: "Spiritual Tattoo Studio location in White Town, Puducherry",
  },

  footer: {
    startConversation: "Start a conversation",
    contactUs: "Contact us ↗",
    allServices: "All services ↗",
    locationLabel: "White Town studio",
    locationPlace: "Pondicherry / India",
    locationNote: "Walk-ins & appointments",
    detailsLabel: "Studio details",
    studio: "Studio",
    address: "Address",
    phone: "Phone",
    cta: ["Your story.", "Marked for life."],
    index: ["STS / 2026", "ORIGINAL WORK / PERMANENT FORM"],
  },

  contact: {
    meta: {
      title: "Contact us | Spiritual Tattoo Studio",
      description:
        "Start a conversation, plan your tattoo or piercing, or find our studio in White Town, Puducherry. Walk-ins welcome.",
    },
    index: "{CONTACT / 03}",
    place: "Pondicherry, India",
    script: "Every mark starts with a conversation.",
    title: ["Let’s", "connect."],
    intro: ["An idea, a question, a story you want to carry.", "We’d love to hear it."],
    heroLink: "Find your way to us",
    footLeft: "Custom work / Personal stories",
    footRight: "Walk-ins & appointments",
    connectTitle: "Start somewhere.",
    connectLabel: "{THE FIRST STEP}",
    whatsapp: { title: "Let’s connect", text: "Send us your idea on WhatsApp." },
    instagram: {
      title: "Follow us",
      text: "Fresh ink. Studio moments. Work in progress.",
      detail: "Instagram",
    },
    calendly: {
      title: "Book an appointment",
      text: "Make time for your next tattoo.",
      detail: "Choose a time on Calendly",
    },
    emailLabel: "Prefer a letter?",
    visitLabel: "{COME FIND US}",
    visitTitle: ["Visit", "the studio."],
    landmark: "Near Central Bank of India",
    directions: "Get directions",
    hoursTitle: "Operating hours",
    walkIns: "Walk-ins are welcome. For larger pieces, message us first so we can set aside enough time.",
    timezone: "All appointment times are in IST.",
    mapCaption: ["White Town / Puducherry", "Find us here ↓"],
    mapTitle: "Spiritual Tattoo Studio location in White Town, Puducherry",
    mapTagline: "A quiet space for something permanent.",
    footerLine: ["Your story.", "Marked for life."],
    footerLink: "Step inside the studio",
    footerIndex: ["STS / 2026", "Art / Ink / Pondicherry"],
  },

  studio: {
    meta: {
      title: "Inside the Studio — Spiritual Tattoo Studio",
      description: "Step inside Spiritual Tattoo Studio in Pondicherry.",
    },
    backLink: "← Back to studio home",
    archiveMeta: "Private archive / Pondicherry",
    statement: "EVERYTHING IS ART",
    notesLabel: "Artwork notes",
    artworkLabel: "Tattoo artwork",
    prevPageLabel: "Flip to previous page",
    nextPageLabel: "Flip to next page",
    signature: "SPIRITUAL TATTOO STUDIO / ORIGINAL WORK",
    booking: { label: "YOUR STORY / YOUR SKIN", cta: "START A CONVERSATION ↗" },
    coverLabel: "Open the Spiritual Tattoo Art archive book",
    coverKicker: "THE BOOK OF LIVING MARKS / 01",
    coverPrompt: "OPEN THE ARCHIVE",
    bookTitle: "THE BOOK OF LIVING MARKS",
    bookIntro: "Three chapters in art, intention and personal stories.",
    controlsLabel: "Archive pages",
    previous: "← Previous",
    next: "Next →",
    footerInstruction: "OPEN THE COVER TO EXPLORE",
    filmsLink: "THE STUDIO IN MOTION",
    loaderTop: ["SPIRITUAL TATTOO STUDIO / PRIVATE ARCHIVE", "EST. PONDICHERRY / INDIA"],
    loaderYears: "Studio archive from 2018 to 2026",
    loaderCaption: ["EIGHT YEARS OF INK", "MARKS, MEMORY AND PERMANENCE"],
    pages: [
      {
        title: "Mukhilan’s Creative Den",
        note: "Born in 2018 from a young artist’s vision, this studio has evolved into a sacred space for intentional tattooing. Today, he honors that dream by cultivating an environment where art is deeply respected, transforming personal stories into enduring, spiritual milestones on the skin.",
      },
      {
        title: "Beyond the Canvas",
        note: "For Mukhilan, each design is a sacred collaboration rather than a mere service. He carefully crafts every piece to mirror your personal journey, transforming ancient ink traditions into an unforgettable, intentional experience that deeply resonates with your spirit.",
      },
      {
        title: "The Hall of Art",
        note: "Anything and Everything is Art. This gallery showcases a few of Mukhilan’s custom works, each carefully designed to honour our client’s unique visions. Let us transform your story into a living masterpiece!\n\nVisit the studio or call us today to secure your custom ink session.",
      },
    ],
    galleryAlts: [
      "A warm red tattoo studio filled with art, sculptures and shelves",
      "A tattoo session taking place inside the red Spiritual Art studio",
      "Collectible figures and objects arranged on a studio shelf",
      "A small dog wearing a colorful outfit inside the studio",
    ],
    objectAlt: "A sculptural black ink form",
    flashAlt:
      "A hand-drawn flash sheet of four original tattoo designs: a fierce goddess with a trident, a sun face, an eye-winged moth and Kali with a cobra",
    films: {
      eyebrow: "Inside Spiritual",
      journal: "Film journal / 01—03",
      heading: ["BEHIND", "THE ", "INK."],
      intro: ["The hands. The space.", "The moments in between.", "A little of our world, in motion."],
      made: "Made with intent. In Pondicherry.",
      pause: "Pause motion",
      resume: "Resume motion",
      next: "Your story could be next",
      watch: "Watch {title}",
      watchFilm: "Watch film",
      filmNumber: "Film / {number}",
      closeFilm: "Close film",
      close: "Close",
      failed: "This film couldn’t load.",
      openDirectly: "Open the video directly ↗",
      items: [
        { title: "The ritual", note: "A moment before the mark." },
        { title: "In the making", note: "Steady hands. Singular intent." },
        { title: "Living marks", note: "Art, carried beyond these walls." },
      ],
    },
  },

  services: {
    meta: {
      title: "Tattoo & Piercing Services in Pondicherry | Spiritual Tattoo Art Studio, White Town",
      description:
        "Custom tattoos in every style and professional piercings in White Town, Pondicherry. Free consultations, walk-ins welcome, autoclave-sterilised tools.",
      keywords: [
        "best tattoo shop in Pondicherry",
        "best piercing shop in Pondicherry",
        "best tattoo studio in Puducherry",
        "tattoo and piercing White Town",
      ],
      ogAlt: "Inside Spiritual Tattoo Art Studio, White Town, Puducherry",
    },
    home: "Home",
    breadcrumbLabel: "Breadcrumb",
    place: "White Town / Puducherry",
    tattooCategory: "Tattoos",
    piercingCategory: "Piercings",
    cardTattoo: "Tattoo",
    cardPiercing: "Piercing",
    schemaOffer: "Free consultation. Walk-ins and appointments available.",
    schemaService: "{name} in Pondicherry",

    hub: {
      script: "Twenty-four ways to leave Pondicherry a little changed.",
      h1: ["Tattoos & piercings ", "in Pondicherry"],
      lede: "Custom tattoos in every style and careful, professional piercings, all under one roof on Law De Lauriston Street. Pick a service below, or walk in and let’s figure it out together.",
      consultation: "Free consultation",
      browse: "Browse services",
      facts: [
        { label: "Tattoo services", value: "{n} styles & specialities" },
        { label: "Piercings", value: "{n} placements" },
        { label: "Visits", value: "Walk-ins & appointments" },
        { label: "Consultation", value: "Always free" },
      ],
      introLabel: "About our services",
      intro: [
        [
          "People search for the best tattoo shop in Pondicherry for all sorts of reasons. A first tattoo after years of “someday”. A keepsake from a trip to the French Quarter. A portrait of someone they miss. A cover-up that’s overdue.",
          "Whatever brings you in, the process is the same. Mukhilan, our founder and artist, has tattooed since 2018. He listens first, draws for your body, and works with autoclave-sterilised tools and single-use needles. Read more [about Mukhilan](/services/tattoo-artist) or [step inside the studio](/studio).",
        ],
        [
          "Looking for the best piercing shop in Pondicherry instead? The same care applies. Mukhilan checks your anatomy and talks you through jewellery and healing before anything happens. Then you get written aftercare for a climate that’s humid, salty and very fond of the beach.",
          "We’re in White Town near Central Bank of India, a short walk from the Promenade, and an easy ride from Auroville, Lawspet or the ECR. Walk in any day, or [get in touch](/contact) first for larger work.",
        ],
      ],
      tattooHeading: ["Tattoo ", "services"],
      tattooLabel: "{{n} STYLES & SPECIALITIES}",
      piercingHeading: ["Piercing ", "services"],
      piercingLabel: "{{n} PLACEMENTS}",
      stepsHeading: ["How it ", "works."],
      stepsLabel: "{FOUR STEPS / NO PRESSURE}",
      steps: [
        { title: "Talk", text: "Walk in or message us. The consultation is free, unhurried and honest." },
        { title: "Design", text: "Your idea becomes a sketch drawn for your body, not pulled from a folder." },
        { title: "Create", text: "Autoclave-sterilised tools, single-use needles, and breaks whenever you need them." },
        { title: "Heal", text: "Written aftercare for Pondicherry’s humid, salty, sunny climate, plus WhatsApp support." },
      ],
    },

    article: {
      consultation: "Free consultation",
      walkIn: "Walk in / Get directions",
      onThisPage: "On this page",
      tocLabel: "Table of contents",
      tocTitle: "{ON THIS PAGE}",
      askMukhilan: "Ask Mukhilan",
      faqToc: "Questions, answered",
      visitToc: "Visit the studio",
      faqHeading: ["Questions,", "answered."],
      faqLabel: "{{name} / FAQ}",
      exploreHeading: "Keep exploring",
      allServices: "All services ↗",
      tableFallback: "Comparison table",
      untranslated:
        "This article hasn’t been translated yet, so it is shown in its original language.",
    },

    visit: {
      label: "{COME FIND US}",
      title: ["Visit", "the studio."],
      directions: "Get directions",
      hoursTitle: "Opening hours",
      walkIns:
        "Walk-ins are welcome. For bigger pieces, message us first so we can keep a chair and enough time free for you.",
      script: "Every mark starts with a conversation.",
      book: "Book a free consultation",
      call: "Call {phone}",
    },
  },
};

export type Dictionary = typeof en;

export default en;
