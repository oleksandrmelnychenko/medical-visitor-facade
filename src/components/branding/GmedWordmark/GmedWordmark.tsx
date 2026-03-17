type GmedWordmarkProps = {
  className?: string;
  fontSize?: number;
  title?: string;
};

export function GmedWordmark({
  className,
  fontSize = 84,
  title = "GMED",
}: GmedWordmarkProps) {
  return (
    <svg
      viewBox="0 0 330 110"
      role="img"
      aria-label={title}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <text
        x="0"
        y="82"
        fill="currentColor"
        fontFamily="var(--font-montserrat), sans-serif"
        fontSize={fontSize}
        fontWeight="700"
        letterSpacing="0.2"
      >
        GMED
      </text>
    </svg>
  );
}
