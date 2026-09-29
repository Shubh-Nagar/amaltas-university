import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Send, RotateCcw, ArrowUpRight } from "lucide-react";
import { reply, createState, STARTER_CHIPS, WELCOME } from "../data/assistantKB.js";
import { logChat, logLead, loadLead, saveLead, digitsOnly, validateLead } from "../lib/chatLogger.js";
import { PROGRAMS } from "../data/content.js";

let nextId = 1;
const AUTO_OPEN_DELAY = 2500;
// Swap this for a photo (e.g. /assets/assistant/priya.jpg) to change the avatar everywhere.
const AVATAR = "/assets/assistant/priya.svg";
const NAME = "Priya";
const COURSES =[...PROGRAMS.map((p) => p.n), "Not sure yet"];
const welcomeMessage = (lead) => ({
  id: nextId++,
  from: "bot",
  text: lead ? WELCOME.replace(/^Hi!/, `Hi ${lead.name.split(" ")[0]}!`) : WELCOME,
  links: [],
  chips: STARTER_CHIPS,
});

function LeadForm({ onSubmit, nameRef }) {
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  function submit(e) {
    e.preventDefault();
    const details = { name: name.trim().replace(/\s+/g, " "), course, phone };
    const next = validateLead(details);
    setErrors(next);
    if (Object.keys(next).length) return;
    onSubmit(details);
  }

  return (
    <form className="assistant-lead" onSubmit={submit} noValidate>
      <div className="assistant-bubble bot">
        Hi! I'm {NAME}, Amaltas University's virtual assistant. Share a few details to start chatting —
        our admissions team may also call you to help.
      </div>
      <label className="assistant-field">
        <span>Full name</span>
        <input
          ref={nameRef}
          type="text"
          value={name}
          maxLength={80}
          autoComplete="name"
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((er) => ({ ...er, name: undefined }));
          }}
          aria-invalid={!!errors.name}
        />
        {errors.name && <em>{errors.name}</em>}
      </label>
      <label className="assistant-field">
        <span>Course interested in</span>
        <select value={course} onChange={(e) => { setCourse(e.target.value); setErrors((er) => ({ ...er, course: undefined })); }} aria-invalid={!!errors.course}>
          <option value="" disabled>Select a course</option>
          {COURSES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.course && <em>{errors.course}</em>}
      </label>
      <label className="assistant-field">
        <span>Mobile number</span>
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          value={phone}
          autoComplete="tel-national"
          placeholder="10-digit mobile number"
          onChange={(e) => {
            setPhone(digitsOnly(e.target.value));
            if (errors.phone) setErrors((er) => ({ ...er, phone: undefined }));
          }}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <em>{errors.phone}</em>}
      </label>
      <button type="submit" className="assistant-lead-submit">Start chat</button>
    </form>
  );
}

// Renders the KB's light markup: newlines and **bold**.
function RichText({ text }) {
  return text.split("\n").map((line, i) => (
    <span key={i} className={line.trim() === "" ? "assistant-gap" : "assistant-line"}>
      {line.split(/\*\*(.+?)\*\*/g).map((part, j) => (j % 2 ? <strong key={j}>{part}</strong> : part))}
    </span>
  ));
}

export default function AmaltasAssistant({ className }) {
  const [open, setOpen] = useState(false);
  const [lead, setLead] = useState(loadLead);
  const [messages, setMessages] = useState(() => [welcomeMessage(lead)]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(0);
  const engine = useRef(createState());
  const timers = useRef(new Set());
  const scrollRef = useRef(null);
  const panelRef = useRef(null);
  const fabRef = useRef(null);
  const inputRef = useRef(null);
  const leadNameRef = useRef(null);
  const autoOpened = useRef(false);
  const autoOpenTimer = useRef(null);
  const { pathname } = useLocation();

  // Pop the chat open every time the home page is visited.
  useEffect(() => {
    if (pathname !== "/") return;
    autoOpenTimer.current = setTimeout(() => {
      autoOpened.current = true;
      setOpen(true);
    }, AUTO_OPEN_DELAY);
    return () => clearTimeout(autoOpenTimer.current);
  }, [pathname]);

  const close = useCallback((refocus) => {
    setOpen(false);
    if (refocus) fabRef.current?.focus();
  }, []);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, pending, open]);

  // Close on outside click / Escape; lock page scroll behind the mobile sheet.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (panelRef.current?.contains(e.target) || fabRef.current?.contains(e.target)) return;
      close(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") close(true);
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    document.body.classList.add("assistant-open");
    // an automatic open shouldn't pull keyboard focus away from the page
    const wasAuto = autoOpened.current;
    autoOpened.current = false;
    const focusTimer = !wasAuto && window.matchMedia?.("(pointer: fine)").matches
      ? setTimeout(() => (inputRef.current || leadNameRef.current)?.focus({ preventScroll: true }), 200)
      : null;
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("assistant-open");
      clearTimeout(focusTimer);
    };
  }, [open, close]);

  function startChat(details) {
    saveLead(details);
    logLead(details);
    setLead(details);
    setMessages([welcomeMessage(details)]);
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
  }

  function send(raw) {
    const text = raw.trim();
    if (!text || !lead) return;
    setInput("");
    setMessages((m) => [...m, { id: nextId++, from: "user", text }]);

    const result = reply(engine.current, text);
    engine.current = result.state;
    logChat({ question: text, answer: result.replies.map((r) => r.text).join("\n"), meta: result.meta, lead });

    setPending((p) => p + 1);
    const delay = Math.min(900, 280 + result.replies[0].text.length * 1.2);
    const t = setTimeout(() => {
      timers.current.delete(t);
      setPending((p) => p - 1);
      const bot = result.replies.map((r) => ({ id: nextId++, from: "bot", ...r }));
      setMessages((m) => (result.reset ? bot : [...m, ...bot]));
    }, delay);
    timers.current.add(t);
  }

  function restart() {
    timers.current.forEach(clearTimeout);
    timers.current.clear();
    setPending(0);
    engine.current = createState();
    setMessages([welcomeMessage(lead)]);
    setInput("");
    inputRef.current?.focus({ preventScroll: true });
  }

  const lastBotId = [...messages].reverse().find((m) => m.from === "bot")?.id;

  return (
    <>
      <button
        ref={fabRef}
        type="button"
        className={className || "fab fab-assistant"}
        onClick={() => {
          // the visitor acted first, so don't pop it open over them on this visit
          clearTimeout(autoOpenTimer.current);
          setOpen((o) => !o);
        }}
        aria-label={open ? `Close chat with ${NAME}` : `Chat with ${NAME}, our virtual assistant`}
        aria-expanded={open}
        aria-controls="amaltas-assistant"
      >
        {open ? (
          <X size={22} />
        ) : (
          <>
            <img className="fab-avatar" src={AVATAR} alt="" width="54" height="54" />
            <i className="fab-online" aria-hidden="true" />
            <span className="fab-tip">Chat with {NAME}</span>
          </>
        )}
      </button>

      <div className={`assistant-backdrop ${open ? "open" : ""}`} aria-hidden="true" />

      <div
        id="amaltas-assistant"
        ref={panelRef}
        className={`assistant-panel ${open ? "open" : ""}`}
        role="dialog"
        aria-label={`Chat with ${NAME}`}
        aria-hidden={!open}
        inert={open ? undefined : ""}
      >
        <div className="assistant-head">
          <img className="assistant-avatar" src={AVATAR} alt="" width="42" height="42" />
          <div className="assistant-head-text">
            <span className="assistant-head-title">{NAME}</span>
            <span className="assistant-head-sub"><i className="assistant-dot" /> Virtual Assistant · Amaltas University</span>
          </div>
          {lead && <button type="button" className="assistant-icon-btn" onClick={restart} aria-label="Start a new chat" title="Start over">
            <RotateCcw size={16} />
          </button>}
          <button type="button" className="assistant-icon-btn" onClick={() => close(true)} aria-label="Close chat" title="Close">
            <X size={18} />
          </button>
        </div>

        {!lead ? (
          <div className="assistant-body" ref={scrollRef}>
            <LeadForm onSubmit={startChat} nameRef={leadNameRef} />
          </div>
        ) : (
        <>
        <div className="assistant-body" ref={scrollRef} role="log" aria-live="polite">
          {messages.map((m) => (
            <div key={m.id} className={`assistant-msg ${m.from}`}>
              <div className={`assistant-bubble ${m.from}`}>
                {m.from === "bot" ? <RichText text={m.text} /> : m.text}
              </div>
              {m.links?.length > 0 && (
                <div className="assistant-links">
                  {m.links.map((l) =>
                    l.to ? (
                      <Link key={l.to} to={l.to} className="assistant-link" onClick={() => close(false)}>
                        {l.label} <ArrowUpRight size={13} />
                      </Link>
                    ) : (
                      <a
                        key={l.href}
                        href={l.href}
                        className="assistant-link"
                        {...(l.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}
                      >
                        {l.label} <ArrowUpRight size={13} />
                      </a>
                    )
                  )}
                </div>
              )}
              {m.id === lastBotId && pending === 0 && m.chips?.length > 0 && (
                <div className="assistant-chips">
                  {m.chips.map((c) => (
                    <button key={c} type="button" className="assistant-chip" onClick={() => send(c)}>
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {pending > 0 && (
            <div className="assistant-msg bot">
              <div className="assistant-bubble bot assistant-typing" aria-label={`${NAME} is typing`}>
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>

        <form
          className="assistant-input-row"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            maxLength={300}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about fees, courses, hostel…"
            aria-label="Ask a question"
            enterKeyHint="send"
            autoComplete="off"
          />
          <button type="submit" className="assistant-send" aria-label="Send" disabled={!input.trim()}>
            <Send size={17} />
          </button>
        </form>
        </>
        )}
      </div>
    </>
  );
}
