import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jyotish — Discover Your Numbers & Stars" },
      {
        name: "description",
        content:
          "Enter your name, date, time and place of birth to instantly reveal your Mulank, Bhagyank, zodiac sign and birth chart.",
      },
      { property: "og:title", content: "Jyotish — Discover Your Numbers & Stars" },
      {
        property: "og:description",
        content:
          "Instant Vedic numerology and astrology reading from your birth details — free and private.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const inputClass =
  "w-full rounded-md border border-input bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

function Index() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [place, setPlace] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPlace = place.trim();
    if (!trimmedName || trimmedName.length > 100) {
      setError("Please enter your full name (up to 100 characters).");
      return;
    }
    if (!dob) {
      setError("Please select your date of birth.");
      return;
    }
    if (!time) {
      setError("Please select your time of birth.");
      return;
    }
    if (!trimmedPlace || trimmedPlace.length > 100) {
      setError("Please enter your place of birth (up to 100 characters).");
      return;
    }
    setError("");
    navigate({
      to: "/report",
      search: { name: trimmedName, dob, time, place: trimmedPlace },
    });
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 40%, var(--color-gold) 0%, transparent 60%)",
          }}
        />
        <div className="mx-auto max-w-3xl px-4 pb-16 pt-20 text-center">
          <div className="ornament-divider mx-auto mb-6 max-w-xs text-sm">✦</div>
          <h1 className="font-display text-5xl font-semibold leading-tight text-foreground sm:text-6xl">
            What do the stars
            <br />
            say about <span className="text-primary">you?</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            Enter your birth details to reveal your Mulank, Bhagyank, life path, zodiac sign and a
            kundli-style birth chart — calculated instantly, right in your browser.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="mx-auto max-w-xl px-4 pb-20">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Your birth details
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Nothing is saved — your reading appears instantly.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                Full name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Aarav Sharma"
                maxLength={100}
                className={inputClass}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="dob" className="mb-1.5 block text-sm font-medium text-foreground">
                  Date of birth
                </label>
                <input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  max={new Date().toISOString().slice(0, 10)}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="time" className="mb-1.5 block text-sm font-medium text-foreground">
                  Time of birth
                </label>
                <input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div>
              <label htmlFor="place" className="mb-1.5 block text-sm font-medium text-foreground">
                Place of birth
              </label>
              <input
                id="place"
                type="text"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="e.g. Varanasi, India"
                maxLength={100}
                className={inputClass}
              />
            </div>
          </div>

          {error && (
            <p role="alert" className="mt-4 text-sm font-medium text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="mt-6 w-full rounded-md bg-primary px-4 py-3 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Reveal my reading ✦
          </button>
        </form>

        {/* Highlights */}
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { icon: "ॐ", title: "Numerology", text: "Mulank, Bhagyank, life path & name numbers" },
            { icon: "☉", title: "Zodiac", text: "Your sun sign, element, ruler & lucky guides" },
            { icon: "☸", title: "Birth chart", text: "Kundli-style chart from your time & place" },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-xl border border-border bg-card p-5 text-center"
            >
              <div className="text-3xl text-gold">{f.icon}</div>
              <h3 className="mt-2 font-display text-lg font-semibold text-foreground">{f.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
