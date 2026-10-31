/**
 * English copy. Add Vietnamese by creating vi.ts with the same shape
 * and registering it in ./index.ts. Do not add a second i18n framework.
 */
export const en = {
  metaTitle: "Form Friend",
  metaDescription:
    "A checklist of official Korean immigration forms, papers, and fees. You fill in and sign the forms yourself.",
  appName: "Form Friend",
  tagline: "See the packet for one visa and one thing you need to do.",
  privacy:
    "This page runs in your browser. It does not ask for your name, passport number, ARC number, or address.",
  disclaimer:
    "Form Friend is a self-fill tool. It is not legal advice or immigration advice, and it is not affiliated with the Ministry of Justice. You fill in and sign the forms yourself.",
  footerCredit:
    "Official form blanks are from the Ministry of Justice. They are public works under the Korea Open Government License (KOGL). Source credit: Ministry of Justice.",
  stepVisa: "Visa",
  stepAction: "What you need",
  stepPacket: "Packet",
  chooseVisa: "Which visa are you on?",
  chooseAction: "What do you need to do?",
  back: "Back",
  change: "Change",
  formsTitle: "Forms",
  documentsTitle: "Papers to bring",
  feeTitle: "Fee",
  onlineTitle: "Filing online",
  notesTitle: "Before you go",
  gapsTitle: "Not confirmed",
  gapsLead: "Check with the immigration office.",
  sourcesTitle: "Sources",
  revision: "Revision date on the form",
  revisionMissing: "Revision date: check with the immigration office.",
  formSource: "Official form page",
  otherLanguageForms:
    "The Ministry of Justice also publishes two other-language blanks of this same form (별지 제34호의2서식 and 별지 제34호의3서식). This list uses the Korean-English blank.",
  feeNone: "No fee.",
  feeInPerson: "At the immigration office",
  feeOnline: "On HiKorea e-application",
  feePermit: "If your job needs a permit first",
  feeWon: "won",
  onlineOpen:
    "You can file this through HiKorea e-application. The Korea Immigration Service says the online fee is about 20% lower than the office fee.",
  onlineOpenWithPrice:
    "You can file this through HiKorea e-application. Government24 lists the online extension charge below. The immigration website describes that reduction as about 20%.",
  onlineFree:
    "You can file this on HiKorea e-application. There is no fee at the office or online.",
  onlineClosed: "HiKorea e-application is not open for this visa and this action.",
  onlineAmountUnknown:
    "HiKorea e-application is open for the immigration permit. The immigration website says the online fee is about 20% lower. The exact charge in won is not confirmed on this page.",
  notApplicableTitle: "This combination does not apply",
  doesNotApply: "Does not apply to this visa.",
  hikoreaLink: "Open HiKorea",
  visas: {
    "D-2": { code: "D-2", name: "Student", ko: "유학" },
    "E-9": { code: "E-9", name: "Non-professional employment", ko: "비전문취업" },
    "E-7": { code: "E-7", name: "Specified activity", ko: "특정활동" },
    "F-6": { code: "F-6", name: "Marriage migrant", ko: "결혼이민" },
  },
  actions: {
    extension: "Extension of stay",
    "arc-registration": "ARC registration",
    "workplace-change": "Change of workplace",
    "address-change": "Change of address",
    "arc-reissue": "ARC reissue",
  },
  notApplicable: {
    "workplace-not-d2":
      "Change of workplace does not apply to a student (D-2) visa. A student does not have a designated workplace under the workplace-change rule. Part-time work is a different permit, and it is not in this list.",
    "workplace-not-f6":
      "Change of workplace does not apply to a marriage migrant (F-6) visa. That permit is for statuses that tie you to a workplace.",
  },
  documents: {
    "passport-or-entry-permit": "Your passport, or your entry permit if you are applying with that instead.",
    passport: "Your passport.",
    "passport-or-arc": "Your passport or your alien registration card.",
    arc: "Your alien registration card.",
    "arc-unless-lost": "Your current alien registration card, unless it was lost.",
    "residence-proof": "A paper that shows where you live.",
    "address-proof":
      "A lease, a sales contract, or another paper the Ministry of Justice accepts as proof that you moved. Government24 also mentions a housing-confirmation paper, a utility receipt, a dorm-fee receipt, or official mail sent to the new address.",
    "registration-photo":
      "A registration photo. The attachment annex asks for one 3.5 cm × 4.5 cm photo, taken in the last 6 months, on a plain light background, with your face uncovered. Government24’s registration page instead asks for two 3 cm × 4 cm color photos.",
    "reissue-photo": "One color photo, 3.5 cm × 4.5 cm.",
    "d2-enrollment":
      "If you are in a regular program at a junior college or higher: a certificate of enrollment. If you are writing a master’s or doctoral thesis, a letter from your advisor, or proof that you are a government-sponsored scholarship student, can stand in for that certificate.",
    "d2-funds": "Papers that show you can pay tuition and living costs.",
    "d2-research": "If you are here for a specific research activity instead of a degree program: papers that show that research.",
    "d2-registration-enrollment": "A certificate of enrollment.",
    "d2-health": "A health certificate.",
    "e7-contract": "Your employment contract.",
    "e7-business-registration":
      "The employer’s business registration. If the employer is a corporation, the corporate registry extract.",
    "e7-payment-history": "A payment-history certificate (납부내역증명서).",
    "e7-guarantee-if-restricted":
      "An identity guarantee, only if your occupation is one where the workplace report is restricted.",
    "e7-recommendation-or-need":
      "A hiring recommendation from the head of the responsible ministry, or from the mayor or governor if the job is in a free economic zone. A paper that shows why the employer needs to hire you can be used instead.",
    "e7-current-workplace-consent":
      "Written consent from the head of your current workplace. You do not need this if that workplace has closed, or if you worked through the contract end date or the date both sides agreed.",
    "f6-spouse-marriage":
      "If you hold F-6 because you are married to a Korean citizen: your Korean spouse’s marriage-relation certificate.",
    "f6-spouse-registration":
      "If you hold F-6 because you are married to a Korean citizen: a copy of your Korean spouse’s resident registration.",
    "f6-child-family":
      "If you hold F-6 because you are raising a child: a family-relation certificate.",
    "f6-child-care":
      "If you hold F-6 because you are raising a child: papers that show you are raising the child.",
    "f6-marriage-ended":
      "If you hold F-6 because the marriage ended and it was not your fault: papers that show your spouse’s death or disappearance, or that the marriage ended without your fault.",
    "eps-passport-if-needed":
      "For the employment-center step: a copy of your passport, only if the center cannot confirm your alien registration.",
  },
  notes: {
    "address-where":
      "File the address change at the immigration office that covers your new address, or at the city, district, or neighborhood office there. Use the integrated form at immigration. Use the separate address-change report at a city, district, or neighborhood office.",
    "address-deadline": "Report the move within 15 days of the day you move in.",
    "office-may-vary":
      "The office can ask for more papers, or accept fewer, while it reviews the case.",
    "extension-window":
      "Two Government24 pages do not match on when you can apply. The foreigner guide says from 4 months before your stay ends. The extension service page, updated 29 July 2026, says e-application is open from 60 days to 3 days before the stay ends, and a visit can be reserved until the day before, with a problem if that visit is more than 60 days out.",
    "argentina-waiver":
      "Government24 says this fee is waived for an Argentine national under 14.",
    "register-deadline":
      "If you will stay more than 90 days, register within 90 days of the day you entered Korea.",
    "register-visit":
      "Alien registration is a visit. It is not on the HiKorea e-application list.",
    "registration-photo-conflict":
      "Two official pages describe the registration photo differently. Check with the immigration office which one to bring.",
    "card-cash":
      "The fee rule says the alien-registration-card fee is paid in cash, or with a receipt that shows a cash payment.",
    "reissue-reasons":
      "Reissue is for a lost card, a card that is too worn to use, a card with no blank space left, a change of stay status, or a change of name, sex, date of birth, or nationality.",
    "reissue-cash":
      "The fee rule says this card fee is paid in cash, or with a receipt that shows a cash payment.",
    "reissue-visit":
      "Reissue is a visit. Government24 describes booking that visit on HiKorea. It is not an e-application.",
    "e7-f6-no-online-extension":
      "E-7 and F-6 are left out of HiKorea e-application for an extension of stay. File at the immigration office.",
    "f6-which-branch":
      "Bring the papers that match why you hold F-6: marriage to a Korean citizen, raising a child, or a marriage that ended without your fault. You do not bring all three sets.",
    "e9-workplace-steps":
      "This is two steps. First apply to change workplace at the employment center. That application has no fee. After you have a new employer, get a workplace-change permit from immigration. The office fee for that permit is 120,000 won.",
    "e7-workplace-split":
      "You need permission before you change workplace, unless your job is one the Minister of Justice lists for a report instead. People in that second group report the change within 15 days. This page does not sort E-7 jobs into those two groups. HiKorea e-application for a workplace-change permit is listed for E-9 only.",
  },
  gaps: {
    "extension-when": "Which application window to follow. The two Government24 pages above do not match.",
    "local-address-form-revision":
      "The revision date of the address-change forms used at a city, district, or neighborhood office.",
    "e9-extension-papers":
      "The extra E-9 papers in the attachment table. The published table’s columns for E-9 ran together with neighboring visas, so they are not listed here.",
    "e9-registration-papers":
      "The extra E-9 papers for alien registration. The same table did not separate them cleanly.",
    "e9-workplace-papers":
      "The papers to attach to the E-9 immigration workplace-change permit. The attachment table did not separate them cleanly.",
    "e9-workplace-online-fee": "The exact HiKorea charge in won for the E-9 workplace-change permit.",
    "eps-form-revision": "The revision date of the employment-center workplace-change form.",
    "e7-registration-papers":
      "Any extra E-7 papers for alien registration. The attachment row sat against the seasonal-worker row, so it is not listed here.",
    "e7-report-fee":
      "The fee, if any, when an E-7 workplace change is a 15-day report rather than a permit. The fee schedule prices the permit only.",
    "f6-registration-papers":
      "Any extra F-6 papers for alien registration. No separate row for them was clear in the attachment table.",
    "registration-photo-which": "Which of the two official registration-photo rules the office will accept.",
  },
} as const;

export type Messages = typeof en;
