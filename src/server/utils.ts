export function getShortDate(dateString: string) {
  const date = new Date(dateString);
  const shortDate = `${date.toLocaleString("en-US", {
    month: "short",
  })}, ${date.getFullYear()}`;
  return shortDate;
}
