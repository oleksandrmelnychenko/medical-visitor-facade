import type { SVGProps } from "react";

export function LogoSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 210 56"
      aria-hidden="true"
      {...props}
    >
      <text
        x="0"
        y="42"
        fontFamily='"Playfair Display", "Cormorant Garamond", "Didot", Georgia, serif'
        fontSize="48"
        fontWeight="500"
        letterSpacing="0"
        fill="currentColor"
      >
        GMED
      </text>
    </svg>
  );
}
