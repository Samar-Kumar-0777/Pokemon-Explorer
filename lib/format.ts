export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatDashed(text: string): string {
  return text
    .split("-")
    .map((part) => capitalize(part))
    .join(" ");
}
