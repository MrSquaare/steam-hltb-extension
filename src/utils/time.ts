export const formatHours = (value: number | null | undefined): string => {
  if (!value || value <= 0) return "—";

  if (value < 1) {
    const minutes = Math.round(value * 60);
    const label = minutes === 1 ? "Minute" : "Minutes";

    return `${minutes} ${label}`;
  }

  const roundedHours = Math.round(value * 2) / 2;
  const hours = Math.floor(roundedHours);
  const hasHalfHour = roundedHours % 1 !== 0;

  const halfPart = hasHalfHour ? "½" : "";
  const label = roundedHours > 1 ? "Hours" : "Hour";

  return `${hours}${halfPart} ${label}`;
};
