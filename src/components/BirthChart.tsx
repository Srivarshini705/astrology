import {
  CHART_HOUSES,
  houseOfPlanet,
  signInHouse,
  type PlanetPlacement,
} from "@/lib/astrology";

interface BirthChartProps {
  ascendantIndex: number;
  placements: PlanetPlacement[];
}

/** North Indian (diamond) style kundli chart rendered as SVG. */
export function BirthChart({ ascendantIndex, placements }: BirthChartProps) {
  const planetsByHouse = new Map<number, string[]>();
  for (const p of placements) {
    const h = houseOfPlanet(p.signIndex, ascendantIndex);
    planetsByHouse.set(h, [...(planetsByHouse.get(h) ?? []), p.abbr]);
  }

  return (
    <svg
      viewBox="0 0 300 300"
      className="mx-auto w-full max-w-md"
      role="img"
      aria-label="North Indian style birth chart"
    >
      {/* Outer square */}
      <rect
        x="2"
        y="2"
        width="296"
        height="296"
        fill="var(--color-card)"
        stroke="var(--color-gold)"
        strokeWidth="2"
      />
      {/* Diagonals */}
      <line x1="2" y1="2" x2="298" y2="298" stroke="var(--color-gold)" strokeWidth="1" />
      <line x1="298" y1="2" x2="2" y2="298" stroke="var(--color-gold)" strokeWidth="1" />
      {/* Center diamond */}
      <polygon
        points="150,2 298,150 150,298 2,150"
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth="1"
      />

      {CHART_HOUSES.map((pos, i) => {
        const sign = signInHouse(i, ascendantIndex);
        const planets = planetsByHouse.get(i) ?? [];
        const isAsc = i === 0;
        return (
          <g key={i}>
            <text
              x={pos.x}
              y={pos.y - (planets.length ? 10 : 0)}
              textAnchor="middle"
              fontSize="11"
              fill="var(--color-muted-foreground)"
            >
              {sign}
            </text>
            {isAsc && (
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fontSize="8"
                fontWeight="600"
                fill="var(--color-gold)"
              >
                ASC
              </text>
            )}
            {planets.length > 0 && (
              <text
                x={pos.x}
                y={pos.y + (isAsc ? 18 : 12)}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="var(--color-primary)"
              >
                {planets.join(" ")}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
