import type { CSSProperties } from "react";

const buildChoiceCardStyle = (
  hoverColor: string,
  surfaceColor: string,
  surfaceHoverColor: string,
  borderColor: string,
  iconSurfaceColor: string,
  iconBorderColor: string,
  iconRadius = "0",
) => ({
  "--hover-color": hoverColor,
  "--card-surface": surfaceColor,
  "--card-surface-hover": surfaceHoverColor,
  "--card-border": borderColor,
  "--card-icon-surface": iconSurfaceColor,
  "--card-icon-border": iconBorderColor,
  "--card-icon-radius": iconRadius,
} as CSSProperties);

export const BINARY_CHOICE_HOVER_COLORS = {
  yes: "#E5D5A8",
  no: "#A8D5E5",
  neutral: "#D5D5D5",
} as const;

export const BINARY_CHOICE_CARD_STYLES = {
  yes: buildChoiceCardStyle(
    BINARY_CHOICE_HOVER_COLORS.yes,
    "transparent",
    "rgba(24, 28, 38, 0.035)",
    "transparent",
    "transparent",
    "transparent",
  ),
  no: buildChoiceCardStyle(
    BINARY_CHOICE_HOVER_COLORS.no,
    "transparent",
    "rgba(24, 28, 38, 0.035)",
    "transparent",
    "transparent",
    "transparent",
  ),
  neutral: buildChoiceCardStyle(
    BINARY_CHOICE_HOVER_COLORS.neutral,
    "transparent",
    "rgba(24, 28, 38, 0.035)",
    "transparent",
    "transparent",
    "transparent",
  ),
} as const;
