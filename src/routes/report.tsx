import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useMemo } from "react";
import { computeReport, NUMBER_MEANINGS, type BirthDetails } from "@/lib/astrology";
import { BirthChart } from "@/components/BirthChart";

const parseSearch = (s: Record<string, unknown>): BirthDetails => {
  const name = typeof s["name"] === "string" ? s["name"].slice(0, 100) : "";
  const dobRaw = s["dob"];
  const dob = typeof dobRaw === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dobRaw) ? dobRaw : "";
  const timeRaw = s["time"];
  const time = typeof timeRaw === "string" && /^\d{2}:\d{2}/.test(timeRaw) ? timeRaw : "";
  const place = typeof s["place"] === "string" ? s["place"].slice(0, 100) : "";
  return { name, dob, time, place };
};

export const Route = createFileRoute("/report")({
  validateSearch: parseSearch,
  beforeLoad: ({ search }) => {
    if (!search.name || !search.dob || !search.time || !search.place) {
      throw redirect({ to: "/" });
    }
  },
  head: () => ({
    meta: [
      { title: "Your Astrology Report — Jyotish" },
      {
        name: "description",
        content:
          "Your personal Vedic numerology and astrology report: Mulank, Bhagyank, life path, zodiac sign and birth chart.",
      },
      { property: "og:title", content: "Your Astrology Report — Jyotish" },
      {
        property: "og:description",
        content: "A personal Vedic numerology and astrology reading.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportPage,
});

function NumberCard({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note: string;
}) {
  const meaning = NUMBER_MEANINGS[value]!;
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </p>
      <div className="mt-3 flex items-baseline gap-3">
        <span className="font-display text-5xl font-bold text-primary">{value}</span>
        <span className="font-display text-xl font-semibold text-foreground">
          {meaning.title}
        </span>
      </div>
      <p className="mt-1 text-xs text-gold">Ruled by {meaning.planet}</p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {meaning.keywords.map((k) => (
          <span
            key={k}
            className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground"
          >
            {k}
          </span>
        ))}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{meaning.description}</p>
      <p className="mt-2 text-xs italic text-muted-foreground">{note}</p>
    </div>
  );
}

function ReportPage() {
  const search = Route.useSearch();
  const report = useMemo(() => computeReport(search), [search]);
  const { zodiac, ascendant, details } = report;

  const formattedDob = new Date(details.dob + "T00:00:00").toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="text-center">
        <div className="ornament-divider mx-auto mb-4 max-w-xs text-sm">✦</div>
        <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
          The reading of {details.name}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Born {formattedDob} at {details.time} · {details.place}
        </p>
      </div>

      {/* Core numbers */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-foreground">Your core numbers</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <NumberCard
            label="Mulank · Root Number"
            value={report.mulank}
            note="From the day of your birth — your core nature and personality."
          />
          <NumberCard
            label="Bhagyank · Destiny Number"
            value={report.bhagyank}
            note="From your full date of birth — your fortune and life direction."
          />
          <NumberCard
            label="Life Path Number"
            value={report.lifePath}
            note="The road your life travels — lessons and opportunities ahead."
          />
          <NumberCard
            label="Destiny (Expression) Number"
            value={report.destiny}
            note="From the letters of your full name — your talents and purpose."
          />
          <NumberCard
            label="Soul Urge Number"
            value={report.soulUrge}
            note="From the vowels of your name — what your heart truly desires."
          />
        </div>
      </section>

      {/* Zodiac */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-foreground">Your zodiac sign</h2>
        <div className="mt-5 rounded-xl border border-border bg-card p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-6xl text-gold">{zodiac.symbol}</span>
            <div>
              <h3 className="font-display text-3xl font-semibold text-foreground">
                {zodiac.name}{" "}
                <span className="text-lg font-normal text-muted-foreground">
                  ({zodiac.sanskrit})
                </span>
              </h3>
              <p className="text-sm text-muted-foreground">{zodiac.dates}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{zodiac.description}</p>
          <div className="mt-5 grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Element", zodiac.element],
              ["Ruling planet", zodiac.ruler],
              ["Lucky color", zodiac.luckyColor],
              ["Lucky number", String(zodiac.luckyNumber)],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg bg-secondary px-4 py-3">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{k}</p>
                <p className="mt-0.5 font-semibold text-secondary-foreground">{v}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {zodiac.traits.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border px-3 py-1 text-xs font-medium text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Birth chart */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold text-foreground">Your birth chart</h2>
        <div className="mt-5 rounded-xl border border-border bg-card p-6 sm:p-8">
          <p className="text-sm text-muted-foreground">
            Ascendant (Lagna):{" "}
            <span className="font-semibold text-foreground">
              {ascendant.name} ({ascendant.sanskrit})
            </span>
          </p>
          <div className="mt-6">
            <BirthChart ascendantIndex={report.ascendantIndex} placements={report.placements} />
          </div>
          <div className="mt-6 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3">
            {report.placements.map((p) => (
              <div key={p.planet} className="rounded-md bg-secondary px-3 py-2">
                <span className="font-semibold text-secondary-foreground">{p.planet}</span>
                <span className="text-muted-foreground">
                  {" "}
                  — {["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"][p.signIndex]}
                </span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs italic text-muted-foreground">
            This is a simplified, approximate chart generated from your birth details. For a precise
            kundli, consult a professional astrologer with your exact coordinates.
          </p>
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
        >
          ← Create another reading
        </Link>
      </div>
    </div>
  );
}
