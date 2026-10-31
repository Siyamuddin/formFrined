import { sources } from "./sources";
import type { FormRecord } from "./types";

export const forms: FormRecord[] = [
  {
    id: "form-34",
    nameKo: "통합신청서 (신고서)",
    nameEn: "Integrated application form",
    revisionDate: "2022-04-12",
    sourceUrl: sources.form34Download,
  },
  {
    id: "form-34-local-address",
    nameKo: "체류지 변경신고서 (별지 제34호의4서식–제34호의8서식)",
    nameEn: "Address-change report for a city, district, or neighborhood office",
    revisionDate: null,
    sourceUrl: sources.addressRule,
  },
  {
    id: "form-eps-workplace",
    nameKo: "외국인근로자 사업장변경신청서 (별지 제13호서식)",
    nameEn: "Foreign worker workplace-change application",
    revisionDate: null,
    sourceUrl: sources.gov24EpsWorkplace,
  },
];

export function getForm(id: string): FormRecord {
  const form = forms.find((item) => item.id === id);
  if (!form) {
    throw new Error(`Unknown form: ${id}`);
  }
  return form;
}
