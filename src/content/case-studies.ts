type Artwork = {
  file: string;
  alt: string;
  width: number;
  height: number;
};

type Feature = {
  title: string;
  copy: string;
  artwork: Artwork;
};

type CaseStudy = {
  slug: string;
  title: string;
  category: 'Branding' | 'UI/UX' | 'Illustrations';
  discipline: string;
  format: string;
  summary: string;
  contribution: string;
  stack?: readonly string[];
  theme: 'pine' | 'gold' | 'indigo' | 'print' | 'lab' | 'peach' | 'desktop' | 'mobile';
  cover?: string;
  hero: Artwork;
  companion?: Artwork;
  features: readonly Feature[];
  note?: string;
};

const artwork = (file: string, alt: string, width: number, height: number): Artwork => ({ file, alt, width, height });

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: 'farebird',
    title: 'Farebird',
    category: 'UI/UX',
    discipline: 'Product design · Android',
    format: 'Personal project · Private Android build',
    stack: ['Java', 'Android SDK', 'JobScheduler'],
    summary: 'I designed Farebird to watch a saved intercity bus trip and alert me when the fare fits my budget.',
    contribution: 'I designed the route setup, fare history, and alerts, then reviewed the builds on an Android device.',
    theme: 'pine',
    hero: artwork('fare-details.webp', 'Farebird route details showing a Delhi–Jaipur fare and a compact price history chart', 520, 1127),
    companion: artwork('add-route.webp', 'Farebird form for saving a route, date and price alert', 520, 1127),
    features: [
      {
        title: 'Set the trip once',
        copy: 'The route form keeps quick date choices and the full calendar in one place. Set a spending limit and leave the app to check for changes.',
        artwork: artwork('calendar.webp', 'An expanded calendar inside the Farebird route form', 520, 1098),
      },
      {
        title: 'See the fare in context',
        copy: 'A compact trend sits below the current fare, so a traveller can see what changed without opening a separate screen.',
        artwork: artwork('fare-details.webp', 'Current fare with its recent history on the same card', 520, 1127),
      },
      {
        title: 'Open the matching departure',
        copy: 'The alert leads to the departure that triggered it, saving the traveller from searching for the bus again.',
        artwork: artwork('matching-departure.webp', 'Matching departure in the controlled Farebird demonstration', 520, 1127),
      },
    ],
    note: 'I tested the flow on Android. The matching-departure capture uses a controlled fare feed.',
  },
  {
    slug: 'seekh-saathi',
    title: 'Seekh Saathi',
    category: 'UI/UX',
    discipline: 'Web prototype · Product UI',
    format: 'Education prototype · Fictional class roster',
    summary: 'A web prototype that helps teachers run short reading and maths checks on a shared device and decide what pupils should practise next.',
    contribution: 'The prototype separates the pupil’s task from the teacher’s recording and planning screens. It works offline after the first load and supports English, Hindi, Bengali, and Tamil.',
    theme: 'gold',
    hero: artwork('class-list.webp', 'Seekh Saathi web app showing the class roster, subject switch and next reading check', 1360, 900),
    features: [
      {
        title: 'Give the pupil one task',
        copy: 'The reading screen shows a short passage and keeps teacher tools out of the way. A line guide is available when useful.',
        artwork: artwork('reading.webp', 'Pupil view with a reading prompt and a line-guide control', 1360, 900),
      },
      {
        title: 'Record the result',
        copy: 'The teacher records how much help the pupil needed and saves the result from a separate screen.',
        artwork: artwork('record.webp', 'Teacher view for recording the result of a reading check', 1360, 900),
      },
      {
        title: 'Plan the next session',
        copy: 'Saved checks suggest practice groups. The teacher can review and adjust the plan before using it.',
        artwork: artwork('practice-plan.webp', 'Practice plan populated with suggested groups using the fictional sample roster', 1360, 900),
      },
    ],
  },
  {
    slug: 'ajji-kairuchi',
    title: 'Ajji KaiRuchi',
    category: 'Branding',
    discipline: 'Packaging · Brand illustration',
    format: 'Chakli packaging study',
    summary: 'A grandmother and child become the recurring illustration across a series of chakli packaging studies.',
    contribution: 'The studies keep the character illustration and front-label hierarchy consistent while exploring different colours and backgrounds on the pouch.',
    theme: 'indigo',
    hero: artwork('blue-pouch.webp', 'Blue Ajji KaiRuchi chakli pouch mockup with the grandmother-and-child illustration', 1080, 1350),
    companion: artwork('palm-pouch.webp', 'Ajji KaiRuchi chakli pouch mockup with a bright palm-tree background', 1080, 1350),
    features: [
      {
        title: 'The character illustration',
        copy: 'The grandmother and child share one composition, with the green leaf and their clothing carrying the main colour accents.',
        artwork: artwork('illustration.webp', 'Original character illustration of a grandmother and child holding a green leaf', 1360, 1360),
      },
      {
        title: 'A warmer palette',
        copy: 'A gold backdrop changes the mood while retaining the same product name, character artwork and label layout.',
        artwork: artwork('gold-pouch.webp', 'Packaging mockup with a gold background behind the central illustration', 1080, 1350),
      },
      {
        title: 'A brighter shelf presence',
        copy: 'A brighter blue and illustrated palms bring more colour to the pack while keeping the central artwork recognisable.',
        artwork: artwork('palm-pouch.webp', 'Chakli pouch mockup with a cyan and palm-tree background', 1080, 1350),
      },
    ],
  },
  {
    slug: 'byraam-realty',
    title: 'Byraam Realty',
    category: 'Illustrations',
    discipline: 'Illustration · Bengaluru',
    format: 'City panorama',
    summary: 'An illustrated panorama of Bengaluru for Byraam Realty, bringing landmarks, street stalls, and everyday encounters into one scene.',
    contribution: 'The illustration moves from the park and glasshouse to the temple, café, and flower market, with the modern skyline behind them.',
    theme: 'print',
    hero: artwork('panorama.webp', 'Bengaluru panorama with a glasshouse, temple, roadside café, and flower stall', 1600, 800),
    features: [
      {
        title: 'From linework to colour',
        copy: 'The line drawing establishes the skyline and street scenes before the final palette brings the foreground forward.',
        artwork: artwork('sketch.webp', 'Black-and-white line drawing of the Bengaluru panorama', 1600, 800),
      },
      {
        title: 'The street-level details',
        copy: 'A café table, a flower vendor, and a father lifting his daughter give the scene a sense of daily life.',
        artwork: artwork('detail.webp', 'Close-up of the café, father and child, and flower vendor', 900, 580),
      },
    ],
  },
  {
    slug: 'clarity-labs',
    title: 'Clarity Labs',
    category: 'Branding',
    discipline: 'Brand guidelines · Packaging',
    format: 'Visual identity and SWITCH packaging',
    summary: 'I designed the Clarity Labs brand guidelines and the bottle label and carton for SWITCH.',
    contribution: 'The guidelines bring the wordmark, typography, palette, icons, and repeating pattern together. The packaging carries the same cyan, black, and white system onto the bottle and outer carton.',
    theme: 'lab',
    hero: artwork('bottle.webp', 'SWITCH bottle mockup with a cyan label detail in a dark laboratory setting', 1600, 900),
    features: [],
  },
  {
    slug: 'og-kombucha',
    title: 'OG Kombucha',
    category: 'Branding',
    discipline: 'Packaging · Beverage',
    format: 'Beverage label system and mockups',
    summary: 'I designed a label system for three OG Kombucha flavours. Peach led the exploration, from the bottle silhouette to the butterfly and coral palette.',
    contribution: 'The front panel uses the butterfly and flavour name to draw the eye toward the OG Kombucha mark. I explored two treatments of the cream panel and a more saturated red direction.',
    theme: 'peach',
    cover: 'peach-cover.webp',
    hero: artwork('still-life.webp', 'Packaging mockup of two Peach OG Kombucha bottles with peaches and stone blocks', 1536, 1024),
    features: [
      {
        title: 'The Peach label',
        copy: 'The butterfly sits on the bottle’s shoulder, with a cream field giving the wordmark room on the front.',
        artwork: artwork('front-label.webp', 'Front-panel Peach Kombucha label from the Illustrator working file', 977, 1500),
      },
      {
        title: 'The sunburst variation',
        copy: 'A radial pattern behind the wordmark adds movement to the cream panel.',
        artwork: artwork('sunburst-label.webp', 'Peach label variation with fine red rays around the central wordmark', 750, 1153),
      },
      {
        title: 'A red studio concept',
        copy: 'The studio mockup shows how a solid red label changes the bottle’s presence.',
        artwork: artwork('studio-variation.webp', 'Studio mockup of the red Peach Kombucha bottle label variation', 900, 1600),
      },
    ],
  },
  {
    slug: 'fino',
    title: 'Fino',
    category: 'UI/UX',
    discipline: 'Product UI · macOS',
    format: 'Native macOS app',
    stack: ['Swift', 'SwiftUI', 'AppKit', 'WebKit'],
    summary: 'A visual reference browser for artists, designers, and photographers who remember an image before they remember its filename.',
    contribution: 'Fino brings artwork, photos, videos, PDFs, and design files from local folders and external drives into one gallery. Browse what you already have and keep the originals where they are.',
    theme: 'desktop',
    hero: artwork('gallery.webp', 'Fino’s gallery open to a folder of Vincent van Gogh paintings and drawings', 1600, 1025),
    features: [
      {
        title: 'Find a reference by what you remember',
        copy: 'Scan the adjustable grid for a shape or composition. When a colour is what you remember, use a colour filter to narrow down the gallery alongside search and file type.',
        artwork: artwork('artwork-detail.webp', 'Detail of the Van Gogh gallery showing paintings and sketches in the same grid', 1246, 616),
      },
      {
        title: 'Keep useful references close',
        copy: 'Favourite a reference as you browse, preview it at a larger size, or drag the original into another design app. A photographer can compare images in the grid, then check the size and colour profile of a promising file.',
        artwork: artwork('reference-grid.webp', 'Detail of the Van Gogh reference folder with figure studies, flowers, and landscapes', 1250, 597),
      },
    ],
    note: 'The gallery shows a Vincent van Gogh reference collection.',
  },
  {
    slug: 'fileshuttle',
    title: 'File Shuttle',
    category: 'UI/UX',
    discipline: 'Product UI · Android',
    format: 'Native Android app · v1.7',
    stack: ['Java', 'Android SDK', 'USB Host API', 'ADB', 'Gradle'],
    summary: 'An Android utility for copying or moving files directly between two phones over USB.',
    contribution: 'The screen follows the order of the job: connect the receiving phone, choose the files, then decide whether to copy or move them.',
    theme: 'mobile',
    hero: artwork('setup.webp', 'File Shuttle screen with connection, file selection and copy or move controls', 520, 1127),
    features: [
      {
        title: 'Make the connection visible',
        copy: 'The status indicator distinguishes a disconnected phone from a connected receiver. Connection help is available beside the main action.',
        artwork: artwork('help.webp', 'File Shuttle connection help displayed over the transfer screen', 520, 1127),
      },
      {
        title: 'Separate copy from move',
        copy: 'Copy keeps the originals. Move removes a source file only after verifying the received copy.',
        artwork: artwork('setup.webp', 'Copy and Move options with an explanation of what happens to the original files', 520, 1127),
      },
    ],
  },
  {
    slug: 'typehaus',
    title: 'Typehaus',
    category: 'UI/UX',
    discipline: 'Product UI · macOS',
    format: 'Native macOS app · v2.0',
    stack: ['Swift', 'SwiftUI', 'AppKit', 'Core Text'],
    summary: 'A font browser for comparing typefaces with your own words, then looking closely at the one that fits.',
    contribution: 'Typehaus 2.0 groups styles by family and brings the sample text, presets, size, and colour into one preview bar.',
    theme: 'desktop',
    hero: artwork('library.webp', 'Typehaus 2.0 showing a sample font library alongside its details panel', 1600, 910),
    features: [
      {
        title: 'Compare in context',
        copy: 'A shared sample makes typefaces easier to compare. Search and format filters help narrow larger libraries.',
        artwork: artwork('library.webp', 'Typehaus specimen list displaying the same sample text in different typefaces', 1600, 910),
      },
      {
        title: 'Inspect a specimen',
        copy: 'The details panel keeps the glyphs and font actions close to the specimen, with variable controls when the font supports them.',
        artwork: artwork('specimen.webp', 'Close-up of the Typehaus specimen and glyph controls', 748, 1370),
      },
    ],
  },
  {
    slug: 'digital-buddy',
    title: 'Digital Buddy',
    category: 'UI/UX',
    discipline: 'Product UI · Android',
    format: 'Native Android app · v0.5.0',
    stack: ['Kotlin', 'Jetpack Compose', 'Android NDK', 'llama.cpp'],
    summary: 'An Android AI companion with on-device chat and controls for what it remembers and when it checks in.',
    contribution: 'Onboarding separates companion identity, memory preferences, and model setup. Users can explore the interface and choose a model later.',
    theme: 'mobile',
    hero: artwork('welcome.webp', 'Digital Buddy welcome screen introducing the local-first experience', 520, 1127),
    companion: artwork('preferences.webp', 'Digital Buddy onboarding with memory and follow-up controls', 520, 1127),
    features: [
      {
        title: 'Set the companion’s identity',
        copy: 'Name, pronouns, and personality can be set independently when creating the companion.',
        artwork: artwork('companion.webp', 'Companion setup with name, gender, pronouns and personality fields', 520, 1127),
      },
      {
        title: 'Choose how it runs',
        copy: 'The offline option uses a model imported onto the phone. Online mode can be configured separately in Settings.',
        artwork: artwork('local.webp', 'Model setup screen with an option to import a local model', 520, 1127),
      },
      {
        title: 'Start with an empty space',
        copy: 'The chat opens with access to memories, activity, and settings. The welcome state explains how to enable a model before the first conversation.',
        artwork: artwork('chat.webp', 'Fresh Digital Buddy chat screen with navigation for memories, activity and settings', 520, 1127),
      },
    ],
  },
];
