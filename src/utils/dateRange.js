const MONTHS_EN = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
];
const MONTHS_DE = [
  "januar", "februar", "märz", "maerz", "april", "mai", "juni",
  "juli", "august", "september", "oktober", "november", "dezember",
];
const DE_INDEX = {
  januar: 0, februar: 1, märz: 2, maerz: 2, april: 3, mai: 4, juni: 5,
  juli: 6, august: 7, september: 8, oktober: 9, november: 10, dezember: 11,
};

const PRESENT_REGEX =
  /^(present|heute|current|aktuell|today|now|jetzt|gegenwärtig|gegenwaertig)$/i;

function parseDateToken(token) {
  if (!token) return null;
  const t = token.trim().toLowerCase();
  if (PRESENT_REGEX.test(t)) return { date: new Date(), isPresent: true };
  const m = t.match(/^([a-zäöü]+)\s+(\d{4})$/i);
  if (!m) return null;
  const [, monthName, yearStr] = m;
  const year = parseInt(yearStr, 10);
  const idxEn = MONTHS_EN.indexOf(monthName);
  if (idxEn >= 0) return { date: new Date(year, idxEn, 1), isPresent: false };
  if (monthName in DE_INDEX)
    return { date: new Date(year, DE_INDEX[monthName], 1), isPresent: false };
  const idxDe = MONTHS_DE.indexOf(monthName);
  if (idxDe >= 0) return { date: new Date(year, idxDe, 1), isPresent: false };
  return null;
}

export function parseDateRangeFromInfoTags(infoTags) {
  if (!Array.isArray(infoTags)) return null;
  for (const tag of infoTags) {
    if (typeof tag !== "string") continue;
    if (!/[-–—]/.test(tag)) continue;
    const parts = tag.split(/\s*[-–—]\s*/);
    if (parts.length !== 2) continue;
    const start = parseDateToken(parts[0]);
    const end = parseDateToken(parts[1]);
    if (!start || !end) continue;
    return {
      start: start.date,
      end: end.date,
      endIsPresent: end.isPresent,
    };
  }
  return null;
}

export function isOngoing(range) {
  if (!range) return false;
  if (range.endIsPresent) return true;
  return range.end.getTime() > Date.now();
}

export function formatDuration(range, lang) {
  if (!range) return null;
  const effectiveEnd = isOngoing(range) ? new Date() : range.end;
  const months =
    (effectiveEnd.getFullYear() - range.start.getFullYear()) * 12 +
    (effectiveEnd.getMonth() - range.start.getMonth());
  if (months <= 0) return null;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  const isDe = typeof lang === "string" && lang.toLowerCase().startsWith("de");
  const y = isDe ? "J" : "y";
  const m = isDe ? "M" : "mo";
  if (years > 0 && rem > 0) return `${years}${y} ${rem}${m}`;
  if (years > 0) return `${years}${y}`;
  return `${rem}${m}`;
}

export function totalYearsSinceEarliest(experienceEntries) {
  if (!Array.isArray(experienceEntries) || !experienceEntries.length) return 0;
  let earliest = null;
  for (const entry of experienceEntries) {
    const range = parseDateRangeFromInfoTags(entry?.experienceInfoTags);
    if (!range) continue;
    if (!earliest || range.start < earliest) earliest = range.start;
  }
  if (!earliest) return 0;
  const now = new Date();
  return Math.floor(
    (now.getTime() - earliest.getTime()) / (365.25 * 24 * 3600 * 1000),
  );
}
