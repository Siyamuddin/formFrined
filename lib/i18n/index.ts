import { en, type Messages } from "./en";

export type Locale = "en";

const catalogs: Record<Locale, Messages> = { en };

export function getMessages(locale: Locale = "en"): Messages {
  return catalogs[locale];
}

export function formatWon(krw: number): string {
  return `${new Intl.NumberFormat("en-US").format(krw)} won`;
}
