import { sources } from "./sources";
import { actionIds, visaIds, type ActionId, type GapLabelKey, type MatrixEntry, type VisaId } from "./types";

const extensionSources = [
  sources.feeArticle,
  sources.gov24Extension,
  sources.gov24Foreigner,
  sources.annex52,
  sources.eApplicationNotice,
  sources.mojForm34,
];

const registrationSources = [
  sources.act,
  sources.feeArticle,
  sources.gov24Registration,
  sources.annex52,
  sources.eApplicationNotice,
  sources.mojForm34,
];

const addressSources = [
  sources.act,
  sources.decree,
  sources.addressRule,
  sources.gov24Address,
  sources.eApplicationNotice,
  sources.mojForm34,
];

const reissueSources = [
  sources.feeArticle,
  sources.gov24Reissue,
  sources.eApplicationNotice,
  sources.mojForm34,
];

function addressEntry(visaId: VisaId): MatrixEntry {
  return {
    visaId,
    actionId: "address-change",
    applicable: true,
    formIds: ["form-34", "form-34-local-address"],
    documentIds: ["passport-or-arc", "address-proof"],
    fee: { kind: "none", sourceUrl: sources.gov24Address },
    onlineFiling: true,
    noteKeys: ["address-where", "address-deadline", "office-may-vary"],
    gaps: [
      {
        id: `${visaId}-address-form-revision`,
        labelKey: "local-address-form-revision",
      },
    ],
    sourceUrls: addressSources,
  };
}

function reissueEntry(visaId: VisaId): MatrixEntry {
  return {
    visaId,
    actionId: "arc-reissue",
    applicable: true,
    formIds: ["form-34"],
    documentIds: ["passport", "reissue-photo", "arc-unless-lost"],
    fee: {
      kind: "fixed",
      inPersonKrw: 35000,
      onlineKrw: null,
      sourceUrls: [sources.feeArticle, sources.gov24Reissue],
    },
    onlineFiling: false,
    noteKeys: ["reissue-reasons", "reissue-cash", "reissue-visit", "argentina-waiver"],
    gaps: [],
    sourceUrls: reissueSources,
  };
}

const entries: MatrixEntry[] = [
  {
    visaId: "D-2",
    actionId: "extension",
    applicable: true,
    formIds: ["form-34"],
    documentIds: [
      "passport-or-entry-permit",
      "arc",
      "residence-proof",
      "d2-enrollment",
      "d2-funds",
      "d2-research",
    ],
    fee: {
      kind: "fixed",
      inPersonKrw: 60000,
      onlineKrw: 50000,
      sourceUrls: [sources.feeArticle, sources.gov24Foreigner],
    },
    onlineFiling: true,
    noteKeys: ["extension-window", "office-may-vary", "argentina-waiver"],
    gaps: [{ id: "D-2-extension-when", labelKey: "extension-when" }],
    sourceUrls: extensionSources,
  },
  {
    visaId: "D-2",
    actionId: "arc-registration",
    applicable: true,
    formIds: ["form-34"],
    documentIds: [
      "passport",
      "registration-photo",
      "residence-proof",
      "d2-registration-enrollment",
      "d2-health",
    ],
    fee: {
      kind: "fixed",
      inPersonKrw: 35000,
      onlineKrw: null,
      sourceUrls: [sources.feeArticle, sources.gov24Registration],
    },
    onlineFiling: false,
    noteKeys: ["register-deadline", "register-visit", "registration-photo-conflict", "card-cash", "office-may-vary"],
    gaps: [{ id: "D-2-registration-photo", labelKey: "registration-photo-which" }],
    sourceUrls: registrationSources,
  },
  {
    visaId: "D-2",
    actionId: "workplace-change",
    applicable: false,
    notApplicableKey: "workplace-not-d2",
    formIds: [],
    documentIds: [],
    fee: null,
    onlineFiling: null,
    noteKeys: [],
    gaps: [],
    sourceUrls: [sources.workplaceAct, sources.annex52],
  },
  addressEntry("D-2"),
  reissueEntry("D-2"),

  {
    visaId: "E-9",
    actionId: "extension",
    applicable: true,
    formIds: ["form-34"],
    documentIds: ["passport-or-entry-permit", "arc", "residence-proof"],
    fee: {
      kind: "fixed",
      inPersonKrw: 60000,
      onlineKrw: 50000,
      sourceUrls: [sources.feeArticle, sources.gov24Foreigner],
    },
    onlineFiling: true,
    noteKeys: ["extension-window", "office-may-vary", "argentina-waiver"],
    gaps: [
      { id: "E-9-extension-extra-papers", labelKey: "e9-extension-papers" },
      { id: "E-9-extension-when", labelKey: "extension-when" },
    ],
    sourceUrls: extensionSources,
  },
  {
    visaId: "E-9",
    actionId: "arc-registration",
    applicable: true,
    formIds: ["form-34"],
    documentIds: ["passport", "registration-photo", "residence-proof"],
    fee: {
      kind: "fixed",
      inPersonKrw: 35000,
      onlineKrw: null,
      sourceUrls: [sources.feeArticle, sources.gov24Registration],
    },
    onlineFiling: false,
    noteKeys: ["register-deadline", "register-visit", "registration-photo-conflict", "card-cash", "office-may-vary"],
    gaps: [
      { id: "E-9-registration-extra-papers", labelKey: "e9-registration-papers" },
      { id: "E-9-registration-photo", labelKey: "registration-photo-which" },
    ],
    sourceUrls: registrationSources,
  },
  {
    visaId: "E-9",
    actionId: "workplace-change",
    applicable: true,
    formIds: ["form-eps-workplace", "form-34"],
    documentIds: ["eps-passport-if-needed"],
    fee: {
      kind: "fixed",
      inPersonKrw: 120000,
      onlineKrw: null,
      sourceUrls: [sources.feeArticle, sources.gov24EpsWorkplace],
    },
    onlineFiling: true,
    feeDetailKey: "e9-workplace-steps",
    noteKeys: ["office-may-vary"],
    gaps: [
      { id: "E-9-workplace-immigration-papers", labelKey: "e9-workplace-papers" },
      { id: "E-9-workplace-online-fee", labelKey: "e9-workplace-online-fee" },
      { id: "E-9-workplace-form-revision", labelKey: "eps-form-revision" },
    ],
    sourceUrls: [
      sources.workplaceAct,
      sources.feeArticle,
      sources.eApplicationNotice,
      sources.gov24EpsWorkplace,
      sources.epsWorkplace,
      sources.immigrationOnline,
      sources.mojForm34,
    ],
  },
  addressEntry("E-9"),
  reissueEntry("E-9"),

  {
    visaId: "E-7",
    actionId: "extension",
    applicable: true,
    formIds: ["form-34"],
    documentIds: [
      "passport-or-entry-permit",
      "arc",
      "residence-proof",
      "e7-contract",
      "e7-business-registration",
      "e7-payment-history",
      "e7-guarantee-if-restricted",
    ],
    fee: {
      kind: "fixed",
      inPersonKrw: 60000,
      onlineKrw: null,
      sourceUrls: [sources.feeArticle, sources.gov24Extension],
    },
    onlineFiling: false,
    noteKeys: ["extension-window", "e7-f6-no-online-extension", "office-may-vary", "argentina-waiver"],
    gaps: [{ id: "E-7-extension-when", labelKey: "extension-when" }],
    sourceUrls: extensionSources,
  },
  {
    visaId: "E-7",
    actionId: "arc-registration",
    applicable: true,
    formIds: ["form-34"],
    documentIds: ["passport", "registration-photo", "residence-proof"],
    fee: {
      kind: "fixed",
      inPersonKrw: 35000,
      onlineKrw: null,
      sourceUrls: [sources.feeArticle, sources.gov24Registration],
    },
    onlineFiling: false,
    noteKeys: ["register-deadline", "register-visit", "registration-photo-conflict", "card-cash", "office-may-vary"],
    gaps: [
      { id: "E-7-registration-extra-papers", labelKey: "e7-registration-papers" },
      { id: "E-7-registration-photo", labelKey: "registration-photo-which" },
    ],
    sourceUrls: registrationSources,
  },
  {
    visaId: "E-7",
    actionId: "workplace-change",
    applicable: true,
    formIds: ["form-34"],
    documentIds: [
      "e7-recommendation-or-need",
      "e7-contract",
      "e7-current-workplace-consent",
      "e7-business-registration",
      "e7-guarantee-if-restricted",
    ],
    fee: {
      kind: "permit-fee-report-unknown",
      permitInPersonKrw: 120000,
      sourceUrls: [sources.feeArticle],
    },
    onlineFiling: false,
    noteKeys: ["e7-workplace-split", "office-may-vary"],
    gaps: [{ id: "E-7-workplace-report-fee", labelKey: "e7-report-fee" }],
    sourceUrls: [
      sources.workplaceAct,
      sources.workplaceDecree,
      sources.feeArticle,
      sources.annex52,
      sources.eApplicationNotice,
      sources.mojForm34,
    ],
  },
  addressEntry("E-7"),
  reissueEntry("E-7"),

  {
    visaId: "F-6",
    actionId: "extension",
    applicable: true,
    formIds: ["form-34"],
    documentIds: [
      "passport-or-entry-permit",
      "arc",
      "residence-proof",
      "f6-spouse-marriage",
      "f6-spouse-registration",
      "f6-child-family",
      "f6-child-care",
      "f6-marriage-ended",
    ],
    fee: {
      kind: "fixed",
      inPersonKrw: 30000,
      onlineKrw: null,
      sourceUrls: [sources.feeArticle, sources.gov24Extension],
    },
    onlineFiling: false,
    noteKeys: ["f6-which-branch", "extension-window", "e7-f6-no-online-extension", "office-may-vary"],
    gaps: [{ id: "F-6-extension-when", labelKey: "extension-when" }],
    sourceUrls: extensionSources,
  },
  {
    visaId: "F-6",
    actionId: "arc-registration",
    applicable: true,
    formIds: ["form-34"],
    documentIds: ["passport", "registration-photo", "residence-proof"],
    fee: {
      kind: "fixed",
      inPersonKrw: 35000,
      onlineKrw: null,
      sourceUrls: [sources.feeArticle, sources.gov24Registration],
    },
    onlineFiling: false,
    noteKeys: ["register-deadline", "register-visit", "registration-photo-conflict", "card-cash", "office-may-vary"],
    gaps: [
      { id: "F-6-registration-extra-papers", labelKey: "f6-registration-papers" },
      { id: "F-6-registration-photo", labelKey: "registration-photo-which" },
    ],
    sourceUrls: registrationSources,
  },
  {
    visaId: "F-6",
    actionId: "workplace-change",
    applicable: false,
    notApplicableKey: "workplace-not-f6",
    formIds: [],
    documentIds: [],
    fee: null,
    onlineFiling: null,
    noteKeys: [],
    gaps: [],
    sourceUrls: [sources.workplaceAct, sources.workplaceDecree, sources.annex52],
  },
  addressEntry("F-6"),
  reissueEntry("F-6"),
];

const entryKey = (visaId: VisaId, actionId: ActionId) => `${visaId}:${actionId}`;

const byKey = new Map(entries.map((entry) => [entryKey(entry.visaId, entry.actionId), entry]));

export function getMatrixEntry(visaId: VisaId, actionId: ActionId): MatrixEntry {
  const entry = byKey.get(entryKey(visaId, actionId));
  if (!entry) {
    throw new Error(`Missing matrix entry ${visaId} ${actionId}`);
  }
  return entry;
}

export function listMatrixEntries(): MatrixEntry[] {
  return visaIds.flatMap((visaId) => actionIds.map((actionId) => getMatrixEntry(visaId, actionId)));
}

export function listGaps(): { visaId: VisaId; actionId: ActionId; gapId: string; labelKey: GapLabelKey }[] {
  return listMatrixEntries().flatMap((entry) =>
    entry.gaps.map((gap) => ({
      visaId: entry.visaId,
      actionId: entry.actionId,
      gapId: gap.id,
      labelKey: gap.labelKey,
    })),
  );
}
