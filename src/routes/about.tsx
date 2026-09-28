import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About the Numbers — Jyotish" },
      {
        name: "description",
        content:
          "Learn what Mulank, Bhagyank, life path, destiny and soul urge numbers mean, and how to read your Jyotish report.",
      },
      { property: "og:title", content: "About the Numbers — Jyotish" },
      {
        property: "og:description",
        content: "A guide to Vedic numerology and the readings on Jyotish.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const SECTIONS = [
  {
    title: "Mulank — Root Number",
    body: "Your Mulank comes from the day of the month you were born, reduced to a single digit. It describes your core nature: how you think, act, and present yourself to the world. For example, being born on the 14th gives 1 + 4 = 5, the free spirit ruled by Mercury.",
  },
  {
    title: "Bhagyank — Destiny Number",
    body: "Your Bhagyank is the sum of your entire date of birth reduced to one digit. Where Mulank is your nature, Bhagyank is your fortune — the direction life pulls you and the opportunities that find you.",
  },
  {
    title: "Life Path Number",
    body: "Calculated by reducing your birth day, month, and year separately and then together, the life path number describes the road your life travels and its central lessons. Master numbers 11 and 22 are kept whole, as they carry a heightened calling.",
  },
  {
    title: "Destiny & Soul Urge Numbers",
    body: "These come from your name. The destiny (expression) number uses every letter to reveal your talents and purpose, while the soul urge number uses only the vowels to show what your heart truly desires.",
  },
  {
    title: "Zodiac Sign & Birth Chart",
    body: "Your sun sign is determined by your date of birth, and your ascendant (Lagna) by the time and place. Together they frame your kundli — the map of the heavens at the moment you arrived. Our chart is a simplified approximation for reflection and fun.",
  },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="text-center">
        <div className="ornament-divider mx-auto mb-4 max-w-xs text-sm">✦</div>
        <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
          Understanding your numbers
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
          Vedic numerology and astrology have guided seekers for thousands of years. Here is what
          each part of your reading means.
        </p>
      </div>

      <div className="mt-10 space-y-4">
        {SECTIONS.map((s) => (
          <section key={s.title} className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-xl font-semibold text-foreground">{s.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Get your reading ✦
        </Link>
      </div>
    </div>
  );
}
