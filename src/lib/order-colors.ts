/**
 * Static colour-name → hex map for rendering colour swatches on order items.
 *
 * `OrderItem.color` is a free string set at checkout time (e.g. "Navy", "Olive",
 * "Sky Blue"). The DB does NOT store a hex code per variant, so we resolve the
 * swatch colour client-side via this map. Unrecognised names render as a
 * neutral grey chip so the layout never breaks.
 *
 * Keep names lowercase + trimmed when looking up. Add new entries as the
 * catalogue grows — this list intentionally covers the common menswear
 * colour vocabulary Wardrobecare already uses.
 */
export const COLOR_HEX: Record<string, string> = {
  // Neutrals
  black: '#1B1917',
  white: '#FFFFFF',
  cream: '#F7F3EA',
  ivory: '#F5F0E1',
  offwhite: '#F2F0EA',
  beige: '#E8DDC8',
  stone: '#C7BDA9',
  sand: '#D6C7A8',
  taupe: '#7E7367',
  grey: '#808080',
  gray: '#808080',
  charcoal: '#363332',
  slate: '#5B6770',
  ash: '#9BA0A4',

  // Blues
  navy: '#2B3A55',
  blue: '#3F6FB0',
  'sky blue': '#7FA8C9',
  skyblue: '#7FA8C9',
  'light blue': '#B6D2E8',
  'royal blue': '#324F94',
  indigo: '#3D4B8C',
  cobalt: '#2A5BAE',
  teal: '#2F8F8C',
  'teal blue': '#3A8A98',

  // Greens
  olive: '#5B6240',
  green: '#4F7A4C',
  'forest green': '#3B5A3F',
  emerald: '#3F8A5F',
  sage: '#6B7A6E',
  khaki: '#A39272',
  mint: '#9CCFB3',

  // Earth tones
  brown: '#6E4E33',
  'light brown': '#A37B5A',
  'dark brown': '#4A3727',
  tan: '#B89166',
  camel: '#B8895D',
  cognac: '#9A4F2F',
  rust: '#8C3B2E',
  burgundy: '#6E2733',
  maroon: '#5E2228',
  wine: '#6B2737',

  // Reds / pinks
  red: '#A8302A',
  'wine red': '#6E2733',
  rose: '#B76A78',
  pink: '#D8A6B0',
  coral: '#D97A6B',

  // Yellows / oranges
  yellow: '#E0B83D',
  mustard: '#C99527',
  gold: '#A8823D',
  orange: '#C7663B',
  amber: '#B07427',

  // Purples
  purple: '#5B4E80',
  violet: '#5C4B82',
  plum: '#5B3E58',
  lavender: '#A99BCB',

  // Multi / pattern
  multicolour: 'linear-gradient(45deg,#A8302A 0%,#E0B83D 35%,#3F6FB0 70%,#4F7A4C 100%)',
  multi: 'linear-gradient(45deg,#A8302A 0%,#E0B83D 35%,#3F6FB0 70%,#4F7A4C 100%)',
  pattern: 'repeating-linear-gradient(45deg,#1B1917 0 6px,#F7F3EA 6px 12px)',
  check: 'repeating-linear-gradient(45deg,#8A6A4A 0 6px,#F7F3EA 6px 12px)',
  stripe: 'repeating-linear-gradient(0deg,#1B1917 0 4px,#F7F3EA 4px 8px)',
  floral: 'linear-gradient(135deg,#9CCFB3 0%,#D8A6B0 50%,#E0B83D 100%)',
  paisley: 'linear-gradient(135deg,#2B3A55 0%,#8A6A4A 100%)',

  // Metallic
  silver: '#D5D5D2',
  gold2: '#C9A462',
  metallic: 'linear-gradient(135deg,#C9A462 0%,#E8DDC8 100%)',
}

/**
 * Resolve a colour name to a CSS background value (hex, linear-gradient, etc.).
 * Returns a neutral grey when the name is unknown or empty.
 */
export function colorToCss(color?: string | null): string {
  if (!color) return '#9B9B9B'
  const key = color.trim().toLowerCase()
  if (COLOR_HEX[key]) return COLOR_HEX[key]
  // Try first word — handles "Navy Blue", "Dark Olive", etc.
  const first = key.split(/[\s/-]+/)[0]
  if (COLOR_HEX[first]) return COLOR_HEX[first]
  return '#9B9B9B'
}

/**
 * True if the colour name resolves to a known hex/gradient. Used to decide
 * whether to render a swatch at all (we hide the swatch entirely for unknown
 * colours so we never mislead the user with a fake grey chip).
 */
export function isKnownColor(color?: string | null): boolean {
  if (!color) return false
  const key = color.trim().toLowerCase()
  if (COLOR_HEX[key]) return true
  const first = key.split(/[\s/-]+/)[0]
  return !!COLOR_HEX[first]
}
