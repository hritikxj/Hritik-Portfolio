/**
 * Five-second summaries at the top of each case study, for reviewers who skim.
 * Every line comes from the project files or the case study itself. When there is
 * no measured result, the last row is "Context" rather than an invented outcome.
 */
export type ProjectSummary = {
  brief: string;
  role: string;
  made: string;
  last: { label: 'Outcome' | 'Context'; text: string };
};

const builtRole = 'Solo designer. I decided the flows, screens and copy, then checked every build.';

export const summaries: Record<string, ProjectSummary> = {
  '/work/clarity-labs': {
    brief: 'Give Clarity Labs one visual system, from the brand guidelines to the SWITCH supplement pack.',
    role: 'Freelance brand and packaging designer.',
    made: 'Brand guidelines (wordmark, type, palette, icons, pattern), the SWITCH bottle label and its carton.',
    last: { label: 'Context', text: 'Client project for Clarity Labs, May to Aug 2026.' },
  },
  '/work/fino': {
    brief: 'Visual people remember an image before its filename, so finding a reference in folders is slow.',
    role: builtRole,
    made: 'A native macOS gallery for local folders and drives, with a colour filter, favourites and large previews.',
    last: { label: 'Outcome', text: 'A working macOS app, now on version 1.7.1.' },
  },
  '/social-media-creatives': {
    brief: 'Launch, retail and event creatives for six brands, each in its own visual voice.',
    role: 'Designer, including my time as Brand Assistant at BlumeLife.',
    made: 'Carousels, static posts, Meta ads and event posters.',
    last: { label: 'Context', text: 'Apple, Dot News, Thru, Malabar, BlumeLife and Vivora.' },
  },
  '/work/og-kombucha': {
    brief: 'Design one label system that holds together across three kombucha flavours.',
    role: 'Packaging designer.',
    made: 'The Peach label and its variations, Cranberry and Lemon & Ginger labels, and product mockups.',
    last: { label: 'Context', text: 'Packaging study; Peach led the exploration.' },
  },
  '/work/farebird': {
    brief: 'Checking a cheaper intercity bus meant re-entering the same trip on a booking site again and again.',
    role: builtRole,
    made: 'Route setup, fare history and alerts that open the exact departure that matched.',
    last: { label: 'Outcome', text: 'A working private Android build, made in one week. One Delhi to Jaipur route logged 67 fare checks.' },
  },
  '/dash': {
    brief: 'Build an identity for 10-minute electronics delivery around speed and reliability.',
    role: 'Brand designer and strategist.',
    made: 'Logo system, the Chigma Boy mascot, type, colour and packaging.',
    last: { label: 'Context', text: 'A 28-page guideline deck, plus an A0 poster, a calendar and a comic strip.' },
  },
  '/nothing': {
    brief: 'A minimal to-do widget that feels native to Nothing OS.',
    role: 'UI designer, Community Edition contributor.',
    made: 'Widget layout on the dot grid, its states and the system tokens behind them.',
    last: { label: 'Outcome', text: 'Selected as a featured submission in the Community Edition Software showcase, 2025.' },
  },
  '/work/typehaus': {
    brief: 'Compare typefaces with your own words, then look closely at the one that fits.',
    role: builtRole,
    made: 'Styles grouped by family, one shared preview bar, and a specimen panel with variable controls.',
    last: { label: 'Outcome', text: 'A working macOS app, released as version 2.0.' },
  },
  '/purr-pantry': {
    brief: 'A premium cat-food brand that feels both vet-credible and home-cooked.',
    role: 'Brand identity designer.',
    made: 'Logo and its variations, colour palette, type system and social carousels.',
    last: { label: 'Context', text: 'Identity built from a written design brief.' },
  },
  '/dove': {
    brief: 'Move the conversation about body hair in India from hygiene to choice.',
    role: 'Brand strategist.',
    made: 'Insight deck, an Instagram activation, the Mirror Gift D2C idea, posters and illustrations.',
    last: { label: 'Context', text: 'Academic campaign concept.' },
  },
  '/work/seekh-saathi': {
    brief: 'A Class 5 teacher in a rural government school needs to see where pupils get stuck, on one shared device.',
    role: 'Product designer. I shaped the flows from ASER 2024 research.',
    made: 'Class queue, pupil reading task, teacher rating and practice plan. Works offline in four languages.',
    last: { label: 'Context', text: 'Education prototype with a fictional class roster.' },
  },
  '/work/ajji-kairuchi': {
    brief: 'Draw a grandmother a snack brand can be known by.',
    role: 'Illustrator.',
    made: 'Ajji and her granddaughter in two poses, used on the front of every pack.',
    last: { label: 'Context', text: 'Illustration for Ajji KaiRuchi, a South Indian snack brand.' },
  },
  '/work/byraam-realty': {
    brief: 'Capture everyday Bengaluru in one illustration for Byraam Realty.',
    role: 'Freelance illustrator.',
    made: 'A line drawing and the full-colour panorama of landmarks, stalls and street life.',
    last: { label: 'Context', text: 'Client project for Byraam Realty, Jul 2026.' },
  },
  '/work/fileshuttle': {
    brief: 'Copy or move files directly between two phones over USB, without a computer.',
    role: builtRole,
    made: 'A single screen that follows the job: connect, choose files, then copy or move.',
    last: { label: 'Outcome', text: 'A working Android app, version 1.7.' },
  },
  '/work/digital-buddy': {
    brief: 'An AI companion that runs on the phone and lets you control what it remembers.',
    role: builtRole,
    made: 'Onboarding for identity, memory and model setup, and an on-device chat.',
    last: { label: 'Outcome', text: 'A working Android app, version 0.5.' },
  },
};
