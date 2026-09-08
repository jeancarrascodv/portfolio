"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRightIcon, CheckIcon, CopyIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";
import type { OperationsCopy } from "@/lib/operations";
import type { Locale } from "@/i18n/config";

export function OperationsModel({ copy: c }: { copy: OperationsCopy }) {
  const [mode, setMode] = useState(0);
  const [step, setStep] = useState(0);
  const flow = c.workflows[mode];
  return (
    <div className="ops-model">
      <div className="model-topline"><span><i /> {c.demo}</span><span>JC / SYS.01</span></div>
      <div className="model-heading"><h2>{c.system}</h2><span aria-hidden="true">↗</span></div>
      <div className="model-modes" role="group" aria-label={c.system}>
        {c.modes.map((name, i) => <button key={name} type="button" aria-pressed={mode === i} onClick={() => { setMode(i); setStep(0); }}>{name}</button>)}
      </div>
      <div className="model-diagram">
        <div className="model-inputs"><span className="model-label">{c.source}</span>{flow.inputs.map((input, i) => <div key={input}><span aria-hidden="true">{["▤", "▦", "◈"][i]}</span>{input}<i /></div>)}</div>
        <div className="model-connectors" aria-hidden="true"><svg viewBox="0 0 68 220" preserveAspectRatio="none"><path d="M0 58H24Q34 58 34 70V110H68 M0 118H68 M0 178H24Q34 178 34 166V118" /><circle r="3"><animateMotion dur="4s" repeatCount="indefinite" path="M0 58H24Q34 58 34 70V110H68" /></circle></svg></div>
        <div className="model-core"><span className="model-label">{c.engine}</span><div className="core-mark" aria-hidden="true"><div className="core-ring" /><svg viewBox="0 0 64 64"><path d="M16 42V22L32 13l16 9v20l-16 9z M16 22l16 10 16-10 M32 32v19 M24 18l16 10v19" /></svg></div><strong>IT + AI</strong><span>LLMs · APIs · Rules</span></div>
      </div>
      <div className="model-output"><span><CheckIcon width={16} height={16} />{c.output}</span><strong>{flow.result}</strong></div>
      <div className="model-steps" role="group" aria-label={c.engine}>{flow.nodes.map((node, i) => <button type="button" key={node} aria-pressed={step === i} onClick={() => setStep(i)}><span>0{i + 1}</span>{node}</button>)}</div>
      <p className="model-explanation" aria-live="polite">{flow.descriptions[step]}</p>
      <div className="model-footer"><span className="status-dot" />{c.oversight}</div>
    </div>
  );
}

export function OpportunityCalculator({ copy: c, locale }: { copy: OperationsCopy; locale: Locale }) {
  const [volume, setVolume] = useState(100);
  const [minutes, setMinutes] = useState(10);
  const [automation, setAutomation] = useState(60);
  const current = volume * minutes / 60 * 4.33;
  const recovered = current * automation / 100;
  const format = (value: number) => new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(value);
  const subject = locale === "es" ? "Oportunidad de automatización" : "Automation opportunity";
  const body = `${c.volume}: ${volume}\n${c.minutes}: ${minutes}\n${c.automation}: ${automation}%\n\n${locale === "es" ? "Mi proceso consiste en:" : "My process is:"}\n`;
  const fields = [
    { id: "volume", label: c.volume, value: volume, set: setVolume, min: 10, max: 1000, step: 10, suffix: "" },
    { id: "minutes", label: c.minutes, value: minutes, set: setMinutes, min: 1, max: 60, step: 1, suffix: " min" },
    { id: "automation", label: c.automation, value: automation, set: setAutomation, min: 0, max: 100, step: 5, suffix: "%" },
  ];
  return (
    <div className="opportunity-tool">
      <div className="calculator-controls">{fields.map(field => <div className="range-field" key={field.id}><div><label htmlFor={field.id}>{field.label}</label><output htmlFor={field.id}>{field.value}{field.suffix}</output></div><input id={field.id} type="range" min={field.min} max={field.max} step={field.step} value={field.value} aria-valuetext={`${field.value}${field.suffix}`} onChange={event => field.set(Number(event.target.value))} /></div>)}<p className="calculator-formula">{c.formula}</p></div>
      <div className="calculator-result"><div aria-live="polite" aria-atomic="true"><strong>{format(recovered)}<span>h</span></strong><p>{c.recovered}</p></div><div className="comparison"><div><span>{c.before}</span><b>{format(current)} {c.hours}</b></div><div className="comparison-track"><i style={{ width: "100%" }} /></div><div><span>{c.after}</span><b>{format(current - recovered)} {c.hours}</b></div><div className="comparison-track after"><i style={{ width: `${100 - automation}%` }} /></div></div><a className="ops-button ops-button-dark" href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}>{c.calculatorCta}<ArrowUpRightIcon width={17} /></a></div>
    </div>
  );
}

export function CopyEmail({ copy: c }: { copy: OperationsCopy }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);
  const copy = async () => {
    try { await navigator.clipboard.writeText(siteConfig.email); setStatus("copied"); }
    catch { setStatus("error"); }
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setStatus("idle"), 4000);
  };
  return <div className="copy-wrap"><button type="button" className="copy-email" onClick={copy}>{status === "copied" ? <CheckIcon width={16} /> : <CopyIcon width={16} />}{status === "copied" ? c.copied : c.copy}</button><span role="status" className={status === "error" ? "copy-error" : "sr-only"}>{status === "error" ? c.copyFailed : status === "copied" ? c.copied : ""}</span></div>;
}
