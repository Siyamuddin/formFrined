import type { Messages } from "../i18n/en";

export const visaIds = ["D-2", "E-9", "E-7", "F-6"] as const;
export type VisaId = (typeof visaIds)[number];

export const actionIds = [
  "extension",
  "arc-registration",
  "workplace-change",
  "address-change",
  "arc-reissue",
] as const;
export type ActionId = (typeof actionIds)[number];

export type FormRecord = {
  id: string;
  nameKo: string;
  nameEn: string;
  /** Date printed on the form, YYYY-MM-DD. Null when we could not confirm it. */
  revisionDate: string | null;
  sourceUrl: string;
};

export type DocumentId = keyof Messages["documents"];
export type NoteKey = keyof Messages["notes"];
export type GapLabelKey = keyof Messages["gaps"];
export type NotApplicableKey = keyof Messages["notApplicable"];

export type DocumentRecord = {
  id: DocumentId;
  sourceUrl: string;
};

/** A fact we could not confirm. The UI does not invent a value for it. */
export type Gap = {
  id: string;
  labelKey: GapLabelKey;
};

export type Fee =
  | { kind: "none"; sourceUrl: string }
  | {
      kind: "fixed";
      inPersonKrw: number;
      /** Null when e-application is closed, or when the online won amount is not confirmed. */
      onlineKrw: number | null;
      sourceUrls: string[];
    }
  | {
      kind: "permit-fee-report-unknown";
      permitInPersonKrw: number;
      sourceUrls: string[];
    };

export type MatrixEntry = {
  visaId: VisaId;
  actionId: ActionId;
  applicable: boolean;
  notApplicableKey?: NotApplicableKey;
  formIds: string[];
  documentIds: DocumentId[];
  fee: Fee | null;
  /** HiKorea e-application accepts this visa and action. */
  onlineFiling: boolean | null;
  noteKeys: NoteKey[];
  /** Shown with the fee when the amount needs a short explanation. */
  feeDetailKey?: NoteKey;
  gaps: Gap[];
  sourceUrls: string[];
};
