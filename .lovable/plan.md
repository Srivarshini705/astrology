# Astrology Website — Plan

A warm "Sacred Light" astrology site (cream, temple-gold, deep brown) where a visitor enters their name, date of birth, birth time, and birth place, then instantly receives a full report. No login, no database — everything is calculated in the browser and nothing is stored.

## Pages

- **Home (`/`)** — hero with celestial mandala artwork, short intro to numerology, and the birth-details form (name, DOB, time, place) with validation.
- **Report (`/report`)** — the generated reading, reached after submitting the form:
  - **Mulank (Root Number)** — from day of birth, with meaning and traits
  - **Bhagyank (Destiny Number)** — from full date of birth
  - **Full numerology** — Life Path, Destiny/Expression, and Soul Urge numbers (from name + DOB) with interpretations
  - **Zodiac sign** — sun sign from birth date, with element, ruling planet, traits, lucky color/number
  - **Birth chart** — a kundli-style North Indian chart drawn from date, time, and place (approximate ascendant and planetary positions), rendered as a visual diagram
- **About (`/about`)** — brief explanation of the numbers and how to read the report.

## Design

- Sacred Light palette: warm cream background, sand tones, temple-gold and deep brown accents (from your selection)
- Serif display headings with a clean readable body font, subtle mandala/celestial motifs
- Report presented as elegant cards with gold dividers; birth chart as a diamond-grid SVG diagram

## Technical notes

- Rewrite `src/routes/index.tsx` (currently the blank placeholder) as the home page; add `src/routes/report.tsx` and `src/routes/about.tsx`
- Pure client-side calculation library in `src/lib/` (digit reduction for Mulank/Bhagyank/Life Path, letter mapping for name numbers, zodiac lookup, simplified ascendant/planet positions for the chart) — no backend or API keys needed
- Form state passed to `/report` via router search params so a report link is shareable
- Theme tokens updated in `src/styles.css` (oklch values for the Sacred Light palette); fonts loaded via `<link>` in `src/routes/__root.tsx`
- Each route gets its own `head()` with unique title/description/og metadata
