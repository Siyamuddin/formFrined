"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { getForm } from "@/lib/data/forms";
import { getMatrixEntry } from "@/lib/data/matrix";
import { sources } from "@/lib/data/sources";
import { actionIds, visaIds, type ActionId, type MatrixEntry, type VisaId } from "@/lib/data/types";
import { en } from "@/lib/i18n/en";
import { formatWon } from "@/lib/i18n";

const copy = en;

type Step = "visa" | "action" | "packet";

function isVisaId(value: string | null): value is VisaId {
  return visaIds.some((id) => id === value);
}

function isActionId(value: string | null): value is ActionId {
  return actionIds.some((id) => id === value);
}

export function Wizard() {
  const params = useSearchParams();
  const visaFromUrl = params.get("visa");
  const actionFromUrl = params.get("action");
  const initialVisa = isVisaId(visaFromUrl) ? visaFromUrl : null;
  const initialAction =
    initialVisa && isActionId(actionFromUrl) ? actionFromUrl : null;
  const [visaId, setVisaId] = useState<VisaId | null>(initialVisa);
  const [actionId, setActionId] = useState<ActionId | null>(initialAction);
  const [step, setStep] = useState<Step>(initialAction ? "packet" : initialVisa ? "action" : "visa");

  function remember(nextVisa: VisaId | null, nextAction: ActionId | null) {
    const url = new URL(window.location.href);
    if (nextVisa) url.searchParams.set("visa", nextVisa);
    else url.searchParams.delete("visa");
    if (nextAction) url.searchParams.set("action", nextAction);
    else url.searchParams.delete("action");
    window.history.replaceState(null, "", url);
  }

  function chooseVisa(next: VisaId) {
    setVisaId(next);
    setActionId(null);
    setStep("action");
    remember(next, null);
  }

  function chooseAction(next: ActionId) {
    if (!visaId) return;
    setActionId(next);
    setStep("packet");
    remember(visaId, next);
  }

  const entry = visaId && actionId ? getMatrixEntry(visaId, actionId) : null;

  return (
    <div className="flex flex-col gap-6">
      <ol className="flex gap-2 text-sm text-foreground/70">
        <li className={step === "visa" ? "font-semibold text-foreground" : undefined}>{copy.stepVisa}</li>
        <li aria-hidden="true">/</li>
        <li className={step === "action" ? "font-semibold text-foreground" : undefined}>{copy.stepAction}</li>
        <li aria-hidden="true">/</li>
        <li className={step === "packet" ? "font-semibold text-foreground" : undefined}>{copy.stepPacket}</li>
      </ol>

      {step === "visa" ? (
        <section className="flex flex-col gap-3">
          <h2 className="text-xl font-semibold">{copy.chooseVisa}</h2>
          <div className="grid gap-3">
            {visaIds.map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => chooseVisa(id)}
                className="min-h-14 rounded-xl border border-line bg-card px-4 py-3 text-left"
              >
                <span className="block text-base font-semibold">
                  {copy.visas[id].code} · {copy.visas[id].name}
                </span>
                <span className="text-sm text-foreground/70">{copy.visas[id].ko}</span>
              </button>
            ))}
          </div>
        </section>
      ) : null}

      {step === "action" && visaId ? (
        <section className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold">{copy.chooseAction}</h2>
            <button
              type="button"
              className="text-sm font-medium text-accent"
              onClick={() => {
                setStep("visa");
                remember(visaId, null);
              }}
            >
              {copy.back}
            </button>
          </div>
          <p className="text-sm text-foreground/70">
            {copy.visas[visaId].code} · {copy.visas[visaId].name}
          </p>
          <div className="grid gap-3">
            {actionIds.map((id) => {
              const candidate = getMatrixEntry(visaId, id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => chooseAction(id)}
                  className="min-h-14 rounded-xl border border-line bg-card px-4 py-3 text-left"
                >
                  <span className="block font-semibold">{copy.actions[id]}</span>
                  {!candidate.applicable ? (
                    <span className="mt-1 block text-sm text-warn">{copy.doesNotApply}</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {step === "packet" && visaId && actionId && entry ? (
        <Packet
          visaId={visaId}
          actionId={actionId}
          entry={entry}
          onBack={() => {
            setStep("action");
            setActionId(null);
            remember(visaId, null);
          }}
        />
      ) : null}
    </div>
  );
}

function Packet({
  visaId,
  actionId,
  entry,
  onBack,
}: {
  visaId: VisaId;
  actionId: ActionId;
  entry: MatrixEntry;
  onBack: () => void;
}) {
  return (
    <section className="flex flex-col gap-5">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-semibold">
          {copy.visas[visaId].code} · {copy.actions[actionId]}
        </h2>
        <button type="button" className="shrink-0 text-sm font-medium text-accent" onClick={onBack}>
          {copy.back}
        </button>
      </div>

      {!entry.applicable && entry.notApplicableKey ? (
        <div className="rounded-xl border border-warn/40 bg-warn-bg p-4">
          <h3 className="font-semibold text-warn">{copy.notApplicableTitle}</h3>
          <p className="mt-2 text-sm leading-6">{copy.notApplicable[entry.notApplicableKey]}</p>
        </div>
      ) : (
        <>
          <OnlineNote entry={entry} />
          <FeeBlock entry={entry} />
          <Forms entry={entry} />
          <Documents entry={entry} />
          {entry.noteKeys.length > 0 ? (
            <div>
              <h3 className="font-semibold">{copy.notesTitle}</h3>
              <ul className="mt-2 flex list-disc flex-col gap-3 pl-5 text-sm leading-6">
                {entry.noteKeys.map((key) => (
                  <li key={key}>{copy.notes[key]}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {entry.gaps.length > 0 ? (
            <div className="rounded-xl border border-warn/40 bg-warn-bg p-4">
              <h3 className="font-semibold text-warn">{copy.gapsTitle}</h3>
              <p className="mt-1 text-sm font-medium">{copy.gapsLead}</p>
              <ul className="mt-2 flex list-disc flex-col gap-2 pl-5 text-sm leading-6">
                {entry.gaps.map((gap) => (
                  <li key={gap.id}>{copy.gaps[gap.labelKey]}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </>
      )}

      <details className="text-sm">
        <summary className="cursor-pointer font-medium">{copy.sourcesTitle}</summary>
        <ul className="mt-2 flex flex-col gap-2 break-all text-foreground/80">
          {entry.sourceUrls.map((url) => (
            <li key={url}>
              <a className="underline" href={url}>
                {url}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

function OnlineNote({ entry }: { entry: MatrixEntry }) {
  let text: string = copy.onlineClosed;
  if (entry.onlineFiling && entry.fee?.kind === "none") {
    text = copy.onlineFree;
  } else if (entry.onlineFiling && entry.fee?.kind === "fixed" && entry.fee.onlineKrw != null) {
    text = copy.onlineOpenWithPrice;
  } else if (entry.onlineFiling) {
    text = copy.onlineAmountUnknown;
  }

  return (
    <div className="rounded-xl bg-accent px-4 py-3 text-sm leading-6 text-accent-ink">
      <h3 className="font-semibold">{copy.onlineTitle}</h3>
      <p className="mt-1">{text}</p>
      {entry.onlineFiling ? (
        <a className="mt-2 inline-block font-semibold underline" href={sources.hikorea}>
          {copy.hikoreaLink}
        </a>
      ) : null}
    </div>
  );
}

function FeeBlock({ entry }: { entry: MatrixEntry }) {
  const fee = entry.fee;
  if (!fee) return null;

  return (
    <div>
      <h3 className="font-semibold">{copy.feeTitle}</h3>
      {fee.kind === "none" ? <p className="mt-2 text-sm">{copy.feeNone}</p> : null}
      {fee.kind === "fixed" ? (
        <ul className="mt-2 text-sm leading-6">
          <li>
            {copy.feeInPerson}: {formatWon(fee.inPersonKrw)}
          </li>
          {fee.onlineKrw != null ? (
            <li>
              {copy.feeOnline}: {formatWon(fee.onlineKrw)}
            </li>
          ) : null}
        </ul>
      ) : null}
      {fee.kind === "permit-fee-report-unknown" ? (
        <p className="mt-2 text-sm leading-6">
          {copy.feePermit}: {formatWon(fee.permitInPersonKrw)}
        </p>
      ) : null}
      {entry.feeDetailKey ? (
        <p className="mt-2 text-sm leading-6">{copy.notes[entry.feeDetailKey]}</p>
      ) : null}
    </div>
  );
}

function Forms({ entry }: { entry: MatrixEntry }) {
  const usesIntegrated = entry.formIds.includes("form-34");
  return (
    <div>
      <h3 className="font-semibold">{copy.formsTitle}</h3>
      <ul className="mt-2 flex flex-col gap-3">
        {entry.formIds.map((id) => {
          const form = getForm(id);
          return (
            <li key={id} className="rounded-xl border border-line bg-card px-4 py-3 text-sm leading-6">
              <p className="font-semibold">{form.nameEn}</p>
              <p>{form.nameKo}</p>
              <p>
                {form.revisionDate
                  ? `${copy.revision}: ${form.revisionDate}`
                  : copy.revisionMissing}
              </p>
              <a className="underline" href={form.sourceUrl}>
                {copy.formSource}
              </a>
            </li>
          );
        })}
      </ul>
      {usesIntegrated ? <p className="mt-2 text-sm leading-6">{copy.otherLanguageForms}</p> : null}
    </div>
  );
}

function Documents({ entry }: { entry: MatrixEntry }) {
  if (entry.documentIds.length === 0) return null;
  return (
    <div>
      <h3 className="font-semibold">{copy.documentsTitle}</h3>
      <ul className="mt-2 flex list-disc flex-col gap-2 pl-5 text-sm leading-6">
        {entry.documentIds.map((id) => (
          <li key={id}>{copy.documents[id]}</li>
        ))}
      </ul>
    </div>
  );
}
