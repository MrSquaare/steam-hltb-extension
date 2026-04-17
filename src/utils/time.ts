export const formatHours = (value: number | null | undefined): string => {
  if (!value || value <= 0) return "—";

  const roundedHours = Math.round(value * 2) / 2;
  const wholeHours = Math.floor(roundedHours);
  const hasHalfHour = roundedHours % 1 !== 0;

  const halfPart = hasHalfHour ? "½" : "";
  const hours = wholeHours === 0 && hasHalfHour ? "" : wholeHours;
  const label = roundedHours > 1 ? "Hours" : "Hour";

  return `${hours}${halfPart} ${label}`;
};
