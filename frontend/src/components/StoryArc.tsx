const BEATS = [
  { x: 16, y: 146, label: "Setup", anchor: "start" as const, dx: 0, dy: 18 },
  { x: 108, y: 122, label: "Catalyst", anchor: "middle" as const, dx: 0, dy: 22 },
  { x: 196, y: 58, label: "Midpoint", anchor: "middle" as const, dx: 0, dy: -12 },
  { x: 270, y: 24, label: "Climax", anchor: "middle" as const, dx: 0, dy: -12, red: true },
  { x: 386, y: 138, label: "Resolution", anchor: "end" as const, dx: 0, dy: 18 },
];

export function StoryArcMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 170"
      className={className}
      fill="none"
      role="img"
      aria-label="A hand-drawn story arc rising from setup to climax and resolving"
    >
      <path
        d="M16 146 C 72 138, 108 130, 152 94 C 192 62, 226 32, 268 24 C 300 18, 320 40, 332 72 C 346 104, 366 128, 388 136"
        stroke="#1F2022"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="0.5 8"
      />
      {BEATS.map((b) => (
        <g key={b.label}>
          <circle cx={b.x} cy={b.y} r={b.red ? 6 : 4} fill={b.red ? "#C83B2D" : "#1F2022"} />
          <text
            x={b.x + b.dx}
            y={b.y + b.dy}
            textAnchor={b.anchor}
            fontSize="11"
            fontFamily="'IBM Plex Mono', monospace"
            letterSpacing="1.5"
            fill={b.red ? "#C83B2D" : "#8C6D4F"}
            style={{ textTransform: "uppercase" }}
          >
            {b.label.toUpperCase()}
          </text>
        </g>
      ))}
    </svg>
  );
}
