import assert from "node:assert/strict";
import test from "node:test";
import { documents } from "./documents";
import { forms } from "./forms";
import { listGaps, listMatrixEntries } from "./matrix";
import { actionIds, visaIds } from "./types";
import { en } from "../i18n/en";

test("every visa and action has one matrix entry", () => {
  const entries = listMatrixEntries();
  assert.equal(entries.length, visaIds.length * actionIds.length);
});

test("entries point at real forms, documents, notes, and sources", () => {
  const formIds = new Set(forms.map((form) => form.id));
  const documentIds = new Set(documents.map((document) => document.id));

  for (const entry of listMatrixEntries()) {
    assert.ok(entry.sourceUrls.length > 0, `${entry.visaId} ${entry.actionId} needs a source`);
    for (const formId of entry.formIds) {
      assert.ok(formIds.has(formId), formId);
    }
    for (const documentId of entry.documentIds) {
      assert.ok(documentIds.has(documentId), documentId);
      assert.ok(documentId in en.documents, `missing copy for ${documentId}`);
    }
    for (const noteKey of entry.noteKeys) {
      assert.ok(noteKey in en.notes, noteKey);
    }
    for (const gap of entry.gaps) {
      assert.ok(gap.labelKey in en.gaps, gap.labelKey);
    }
    if (!entry.applicable) {
      assert.ok(entry.notApplicableKey && entry.notApplicableKey in en.notApplicable);
      assert.equal(entry.formIds.length, 0);
      assert.equal(entry.fee, null);
      assert.equal(entry.onlineFiling, null);
    } else {
      assert.ok(entry.formIds.length > 0);
      assert.notEqual(entry.fee, null);
      assert.equal(typeof entry.onlineFiling, "boolean");
    }
  }
});

test("workplace change is closed for D-2 and F-6 only", () => {
  const closed = listMatrixEntries()
    .filter((entry) => !entry.applicable)
    .map((entry) => `${entry.visaId}:${entry.actionId}`);
  assert.deepEqual(closed, ["D-2:workplace-change", "F-6:workplace-change"]);
});

test("online extension is open for D-2 and E-9 only", () => {
  const open = listMatrixEntries()
    .filter((entry) => entry.actionId === "extension" && entry.onlineFiling)
    .map((entry) => entry.visaId);
  assert.deepEqual(open, ["D-2", "E-9"]);
});

test("unconfirmed fees do not carry an invented online amount", () => {
  for (const entry of listMatrixEntries()) {
    if (entry.fee?.kind === "fixed" && entry.fee.onlineKrw == null && entry.onlineFiling) {
      assert.ok(
        entry.gaps.some((gap) => gap.labelKey === "e9-workplace-online-fee"),
        `${entry.visaId} ${entry.actionId} is missing an online-fee gap`,
      );
    }
    if (entry.fee?.kind === "permit-fee-report-unknown") {
      assert.ok(entry.gaps.some((gap) => gap.labelKey === "e7-report-fee"));
    }
  }
});

test("gap catalog is stable enough to list in the pull request", () => {
  const labels = [...new Set(listGaps().map((gap) => gap.labelKey))];
  assert.deepEqual(labels.sort(), [
    "e7-registration-papers",
    "e7-report-fee",
    "e9-extension-papers",
    "e9-registration-papers",
    "e9-workplace-online-fee",
    "e9-workplace-papers",
    "eps-form-revision",
    "extension-when",
    "f6-registration-papers",
    "local-address-form-revision",
    "registration-photo-which",
  ]);
});
