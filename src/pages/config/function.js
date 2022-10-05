const formatter = new Intl.RelativeTimeFormat("en");

export function dateFormatter(date) {
  let diff = new Date() - new Date(date);
  let days = formatter.format(-diff / (1000 * 60 * 60 * 24), "days");
  return days;
}
