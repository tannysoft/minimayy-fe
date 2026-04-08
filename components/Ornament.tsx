// Decorative line art inspired by the Rate Card's loose gold swirls
export function Swirl({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 160"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <ellipse
        cx="120"
        cy="80"
        rx="110"
        ry="38"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <ellipse
        cx="120"
        cy="80"
        rx="110"
        ry="38"
        stroke="currentColor"
        strokeWidth="0.8"
        transform="rotate(12 120 80)"
      />
      <ellipse
        cx="120"
        cy="80"
        rx="110"
        ry="38"
        stroke="currentColor"
        strokeWidth="0.8"
        transform="rotate(-12 120 80)"
      />
    </svg>
  );
}

export function Leaves({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 160"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M40 150 C 20 100, 20 60, 60 10"
        stroke="currentColor"
        strokeWidth="1"
      />
      <ellipse
        cx="40"
        cy="120"
        rx="18"
        ry="38"
        transform="rotate(-35 40 120)"
        fill="currentColor"
        fillOpacity="0.2"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <ellipse
        cx="54"
        cy="80"
        rx="18"
        ry="38"
        transform="rotate(-20 54 80)"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="0.8"
      />
      <ellipse
        cx="68"
        cy="40"
        rx="15"
        ry="32"
        transform="rotate(-5 68 40)"
        fill="currentColor"
        fillOpacity="0.1"
        stroke="currentColor"
        strokeWidth="0.8"
      />
    </svg>
  );
}

export function Arch({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 180 240"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <path
          key={i}
          d={`M ${10 + i * 6} 240 L ${10 + i * 6} ${80 + i * 6} A ${
            80 - i * 6
          } ${80 - i * 6} 0 0 1 ${170 - i * 6} ${80 + i * 6} L ${
            170 - i * 6
          } 240`}
          stroke="currentColor"
          strokeWidth="0.7"
          strokeOpacity={0.7 - i * 0.08}
        />
      ))}
    </svg>
  );
}
