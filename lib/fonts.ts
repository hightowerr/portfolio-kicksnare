export type FontSet = { display: string; serif: string };

export const PAIRS: Record<string, { display: string; serif: string; label: string }> = {
  'geist-instrument': { display: "'Geist', system-ui, sans-serif", serif: "'Instrument Serif', serif", label: 'Geist · Instrument' },
  'bricolage-newsreader': { display: "'Bricolage Grotesque', system-ui, sans-serif", serif: "'Newsreader', serif", label: 'Bricolage · Newsreader' },
  'space-crimson': { display: "'Space Grotesk', system-ui, sans-serif", serif: "'Crimson Pro', serif", label: 'Space Grotesk · Crimson' },
};

export const defaultFonts: FontSet = {
  display: PAIRS['geist-instrument'].display,
  serif: PAIRS['geist-instrument'].serif,
};
