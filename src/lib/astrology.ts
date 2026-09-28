// Pure client-side Vedic numerology + astrology calculations.

export interface BirthDetails {
  name: string;
  dob: string; // YYYY-MM-DD
  time: string; // HH:MM
  place: string;
}

export interface NumberMeaning {
  number: number;
  title: string;
  planet: string;
  keywords: string[];
  description: string;
}

export interface ZodiacInfo {
  name: string;
  sanskrit: string;
  symbol: string;
  element: string;
  ruler: string;
  dates: string;
  traits: string[];
  luckyColor: string;
  luckyNumber: number;
  description: string;
}

export interface PlanetPlacement {
  planet: string;
  abbr: string;
  signIndex: number; // 0 = Aries
}

export interface AstrologyReport {
  details: BirthDetails;
  mulank: number;
  bhagyank: number;
  lifePath: number;
  destiny: number;
  soulUrge: number;
  zodiac: ZodiacInfo;
  ascendant: ZodiacInfo;
  ascendantIndex: number;
  placements: PlanetPlacement[];
}

const mod = (n: number, m: number) => ((n % m) + m) % m;

/** Reduce a number to a single digit 1-9 (or master numbers 11/22 when keepMaster). */
export function reduceNumber(n: number, keepMaster = false): number {
  let v = Math.abs(Math.round(n));
  while (v > 9) {
    if (keepMaster && (v === 11 || v === 22)) return v;
    v = String(v)
      .split("")
      .reduce((s, d) => s + Number(d), 0);
  }
  return v === 0 ? 9 : v;
}

const LETTER_VALUES: Record<string, number> = {};
"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").forEach((ch, i) => {
  LETTER_VALUES[ch] = (i % 9) + 1;
});

function nameSum(name: string, filter: (ch: string) => boolean): number {
  return name
    .toUpperCase()
    .split("")
    .filter((ch) => /[A-Z]/.test(ch) && filter(ch))
    .reduce((s, ch) => s + LETTER_VALUES[ch], 0);
}

const isVowel = (ch: string) => "AEIOU".includes(ch);

export const NUMBER_MEANINGS: Record<number, NumberMeaning> = {
  1: {
    number: 1,
    title: "The Leader",
    planet: "Sun",
    keywords: ["Independent", "Ambitious", "Pioneering"],
    description:
      "Ruled by the Sun, number 1 signifies leadership, originality, and a strong will. You are a born pioneer who forges your own path and inspires others to follow.",
  },
  2: {
    number: 2,
    title: "The Peacemaker",
    planet: "Moon",
    keywords: ["Gentle", "Diplomatic", "Intuitive"],
    description:
      "Ruled by the Moon, number 2 brings sensitivity, cooperation, and emotional depth. You thrive in partnership and bring harmony wherever you go.",
  },
  3: {
    number: 3,
    title: "The Creator",
    planet: "Jupiter",
    keywords: ["Expressive", "Joyful", "Optimistic"],
    description:
      "Ruled by Jupiter, number 3 is the number of creativity, communication, and expansion. You carry a natural gift for expression and uplift others with your optimism.",
  },
  4: {
    number: 4,
    title: "The Builder",
    planet: "Rahu",
    keywords: ["Disciplined", "Practical", "Loyal"],
    description:
      "Number 4 stands for stability, hard work, and order. You build lasting foundations through patience and determination, and others rely on your steadfast nature.",
  },
  5: {
    number: 5,
    title: "The Free Spirit",
    planet: "Mercury",
    keywords: ["Adventurous", "Versatile", "Quick-witted"],
    description:
      "Ruled by Mercury, number 5 loves freedom, change, and new experiences. Your sharp mind and adaptability let you succeed in many fields at once.",
  },
  6: {
    number: 6,
    title: "The Nurturer",
    planet: "Venus",
    keywords: ["Caring", "Responsible", "Artistic"],
    description:
      "Ruled by Venus, number 6 is the number of love, beauty, and duty to family. You create warmth around you and feel fulfilled when caring for others.",
  },
  7: {
    number: 7,
    title: "The Seeker",
    planet: "Ketu",
    keywords: ["Spiritual", "Analytical", "Mysterious"],
    description:
      "Number 7 is the seeker of truth — introspective, wise, and drawn to the spiritual and the unknown. You find answers where others never think to look.",
  },
  8: {
    number: 8,
    title: "The Achiever",
    planet: "Saturn",
    keywords: ["Powerful", "Determined", "Just"],
    description:
      "Ruled by Saturn, number 8 carries the lessons of karma, discipline, and material mastery. Through effort and endurance you rise to positions of real authority.",
  },
  9: {
    number: 9,
    title: "The Humanitarian",
    planet: "Mars",
    keywords: ["Compassionate", "Courageous", "Generous"],
    description:
      "Ruled by Mars, number 9 blends courage with compassion. You are driven to serve a cause larger than yourself and complete what others only begin.",
  },
  11: {
    number: 11,
    title: "The Illuminator (Master Number)",
    planet: "Moon",
    keywords: ["Visionary", "Inspired", "Heightened intuition"],
    description:
      "Master number 11 carries heightened intuition and spiritual insight. You are a channel for inspiration, called to guide and awaken others.",
  },
  22: {
    number: 22,
    title: "The Master Builder (Master Number)",
    planet: "Rahu",
    keywords: ["Visionary", "Practical", "Large-scale impact"],
    description:
      "Master number 22 turns grand vision into reality. You have the rare ability to manifest ideas that benefit many people for generations.",
  },
};

export const ZODIAC_SIGNS: ZodiacInfo[] = [
  {
    name: "Aries",
    sanskrit: "Mesha",
    symbol: "♈",
    element: "Fire",
    ruler: "Mars",
    dates: "Mar 21 – Apr 19",
    traits: ["Courageous", "Energetic", "Confident"],
    luckyColor: "Red",
    luckyNumber: 9,
    description:
      "The first sign of the zodiac, Aries is a born initiator — bold, direct, and full of fiery drive to begin new ventures.",
  },
  {
    name: "Taurus",
    sanskrit: "Vrishabha",
    symbol: "♉",
    element: "Earth",
    ruler: "Venus",
    dates: "Apr 20 – May 20",
    traits: ["Patient", "Reliable", "Devoted"],
    luckyColor: "Green",
    luckyNumber: 6,
    description:
      "Taurus values stability, beauty, and the good things of life. Steady and loyal, you build comfort that endures.",
  },
  {
    name: "Gemini",
    sanskrit: "Mithuna",
    symbol: "♊",
    element: "Air",
    ruler: "Mercury",
    dates: "May 21 – Jun 20",
    traits: ["Curious", "Adaptable", "Witty"],
    luckyColor: "Yellow",
    luckyNumber: 5,
    description:
      "Gemini is the sign of the mind — quick, curious, and endlessly communicative, always juggling ideas and connections.",
  },
  {
    name: "Cancer",
    sanskrit: "Karka",
    symbol: "♋",
    element: "Water",
    ruler: "Moon",
    dates: "Jun 21 – Jul 22",
    traits: ["Nurturing", "Protective", "Intuitive"],
    luckyColor: "White",
    luckyNumber: 2,
    description:
      "Ruled by the Moon, Cancer feels deeply and protects fiercely. Home, family, and emotional truth guide your life.",
  },
  {
    name: "Leo",
    sanskrit: "Simha",
    symbol: "♌",
    element: "Fire",
    ruler: "Sun",
    dates: "Jul 23 – Aug 22",
    traits: ["Generous", "Proud", "Charismatic"],
    luckyColor: "Gold",
    luckyNumber: 1,
    description:
      "Leo shines like its ruler the Sun — warm, dramatic, and generous, with a natural gift for leading and inspiring.",
  },
  {
    name: "Virgo",
    sanskrit: "Kanya",
    symbol: "♍",
    element: "Earth",
    ruler: "Mercury",
    dates: "Aug 23 – Sep 22",
    traits: ["Precise", "Helpful", "Thoughtful"],
    luckyColor: "Green",
    luckyNumber: 5,
    description:
      "Virgo perfects through service and attention to detail. Your discerning mind sees what needs improving — and improves it.",
  },
  {
    name: "Libra",
    sanskrit: "Tula",
    symbol: "♎",
    element: "Air",
    ruler: "Venus",
    dates: "Sep 23 – Oct 22",
    traits: ["Charming", "Fair", "Harmonious"],
    luckyColor: "Pink",
    luckyNumber: 6,
    description:
      "Libra seeks balance and beauty in all things. A natural diplomat, you bring people together and smooth every conflict.",
  },
  {
    name: "Scorpio",
    sanskrit: "Vrishchika",
    symbol: "♏",
    element: "Water",
    ruler: "Mars",
    dates: "Oct 23 – Nov 21",
    traits: ["Intense", "Loyal", "Transformative"],
    luckyColor: "Maroon",
    luckyNumber: 9,
    description:
      "Scorpio dives beneath the surface. Passionate and perceptive, you are unafraid of transformation and hidden truths.",
  },
  {
    name: "Sagittarius",
    sanskrit: "Dhanu",
    symbol: "♐",
    element: "Fire",
    ruler: "Jupiter",
    dates: "Nov 22 – Dec 21",
    traits: ["Optimistic", "Adventurous", "Philosophical"],
    luckyColor: "Purple",
    luckyNumber: 3,
    description:
      "Sagittarius is the eternal traveller and philosopher, always aiming higher and searching for meaning beyond the horizon.",
  },
  {
    name: "Capricorn",
    sanskrit: "Makara",
    symbol: "♑",
    element: "Earth",
    ruler: "Saturn",
    dates: "Dec 22 – Jan 19",
    traits: ["Disciplined", "Ambitious", "Wise"],
    luckyColor: "Brown",
    luckyNumber: 8,
    description:
      "Capricorn climbs steadily toward its goals. Patient and pragmatic, you achieve through persistence what others only dream of.",
  },
  {
    name: "Aquarius",
    sanskrit: "Kumbha",
    symbol: "♒",
    element: "Air",
    ruler: "Saturn",
    dates: "Jan 20 – Feb 18",
    traits: ["Original", "Humanitarian", "Independent"],
    luckyColor: "Turquoise",
    luckyNumber: 4,
    description:
      "Aquarius thinks ahead of its time. Idealistic and inventive, you work for the future and for the good of all.",
  },
  {
    name: "Pisces",
    sanskrit: "Meena",
    symbol: "♓",
    element: "Water",
    ruler: "Jupiter",
    dates: "Feb 19 – Mar 20",
    traits: ["Compassionate", "Dreamy", "Artistic"],
    luckyColor: "Sea Green",
    luckyNumber: 7,
    description:
      "Pisces swims in the ocean of imagination and empathy. Gentle and intuitive, you dissolve boundaries between hearts.",
  },
];

function zodiacFromDate(month: number, day: number): number {
  const cutoffs = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22]; // day each sign begins, per month
  const idx = day >= cutoffs[month - 1] ? month : month - 1;
  return mod(idx, 12);
}

function dayOfYear(y: number, m: number, d: number): number {
  return Math.floor((Date.UTC(y, m - 1, d) - Date.UTC(y, 0, 1)) / 86400000) + 1;
}

export function computeReport(details: BirthDetails): AstrologyReport {
  const [y, m, d] = details.dob.split("-").map(Number);
  const [hh] = details.time.split(":").map(Number);
  const doy = dayOfYear(y, m, d);

  const mulank = reduceNumber(d);
  const bhagyank = reduceNumber(
    String(details.dob).split("").reduce((s, c) => s + (/\d/.test(c) ? Number(c) : 0), 0),
  );
  const lifePath = reduceNumber(reduceNumber(d) + reduceNumber(m) + reduceNumber(y), true);
  const destiny = reduceNumber(nameSum(details.name, () => true), true);
  const soulUrge = reduceNumber(nameSum(details.name, isVowel), true);

  const sunIdx = zodiacFromDate(m, d);

  // Approximate ascendant: rises with the sun at ~6 AM, advancing one sign every ~2 hours.
  const hoursSinceSunrise = mod(hh - 6, 24);
  const ascIdx = mod(sunIdx + Math.floor(hoursSinceSunrise / 2), 12);

  // Simplified planetary sign positions (deterministic approximations).
  const moonIdx = mod(sunIdx + Math.floor((doy % 27.32) / 2.277), 12);
  const mercuryIdx = mod(sunIdx + (doy % 2 === 0 ? 0 : 1) - (doy % 5 === 0 ? 1 : 0), 12);
  const venusIdx = mod(sunIdx + ((doy % 3) - 1), 12);
  const marsIdx = mod(Math.floor(((y - 2000) * 12 + m) / 22.6), 12);
  const jupiterIdx = mod(y - 2000 + Math.floor(m / 12), 12);
  const saturnIdx = mod(Math.floor(((y - 2000) * 12 + m) / 29.5), 12);
  const rahuIdx = mod(18 - Math.floor(((y - 2000) * 12 + m) / 223), 12);

  const placements: PlanetPlacement[] = [
    { planet: "Sun", abbr: "Su", signIndex: sunIdx },
    { planet: "Moon", abbr: "Mo", signIndex: moonIdx },
    { planet: "Mars", abbr: "Ma", signIndex: marsIdx },
    { planet: "Mercury", abbr: "Me", signIndex: mercuryIdx },
    { planet: "Jupiter", abbr: "Ju", signIndex: jupiterIdx },
    { planet: "Venus", abbr: "Ve", signIndex: venusIdx },
    { planet: "Saturn", abbr: "Sa", signIndex: saturnIdx },
    { planet: "Rahu", abbr: "Ra", signIndex: rahuIdx },
    { planet: "Ketu", abbr: "Ke", signIndex: mod(rahuIdx + 6, 12) },
  ];

  return {
    details,
    mulank,
    bhagyank,
    lifePath,
    destiny,
    soulUrge,
    zodiac: ZODIAC_SIGNS[sunIdx],
    ascendant: ZODIAC_SIGNS[ascIdx],
    ascendantIndex: ascIdx,
    placements,
  };
}

/** North Indian chart: fixed house anchor points on a 300x300 grid. */
export const CHART_HOUSES: { x: number; y: number }[] = [
  { x: 150, y: 75 }, // 1
  { x: 75, y: 40 }, // 2
  { x: 40, y: 75 }, // 3
  { x: 75, y: 150 }, // 4
  { x: 40, y: 225 }, // 5
  { x: 75, y: 260 }, // 6
  { x: 150, y: 225 }, // 7
  { x: 225, y: 260 }, // 8
  { x: 260, y: 225 }, // 9
  { x: 225, y: 150 }, // 10
  { x: 260, y: 75 }, // 11
  { x: 225, y: 40 }, // 12
];

/** Sign number (1-12) sitting in house i, given the ascendant sign index. */
export function signInHouse(house: number, ascIdx: number): number {
  return mod(ascIdx + house, 12) + 1;
}

/** House (0-11) a planet falls in, given its sign index and the ascendant. */
export function houseOfPlanet(planetSignIdx: number, ascIdx: number): number {
  return mod(planetSignIdx - ascIdx, 12);
}
