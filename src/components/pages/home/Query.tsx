/*
|-----------------------------------------
| setting up Query.tsx for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, 31 October, 2026
|-----------------------------------------
*/

"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, type ReactNode } from "react";

import { buttonVariants } from "@/components/ui/button";

import { defaultData, parseHomeCards, type HomeData } from "./data";

const photos = {
  hero: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1800&q=85",
  team: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=80",
  office: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80",
  papers: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&q=80",
  meeting: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&q=80",
  library: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=1200&q=80",
};
const services = [
  ["Corporate Law", "Support for companies, agreements and commercial decisions."],
  ["Family Law", "Thoughtful guidance for sensitive family matters."],
  ["Property Law", "Help navigating property transactions and disputes."],
  ["Civil Litigation", "Guidance through civil disputes and legal proceedings."],
  ["Criminal Defense", "Legal assistance when facing criminal proceedings."],
  ["Employment Law", "Advice on workplace rights and responsibilities."],
];
const benefits = [
  ["01", "Professionalism", "A considered approach to your legal needs."],
  ["02", "Confidentiality", "Discretion and care in every conversation."],
  ["03", "Clear communication", "Understand your options and the next steps."],
  ["04", "Client focus", "Guidance shaped around your circumstances."],
];
const steps = [
  ["01", "Initial consultation", "Start by discussing your needs."],
  ["02", "Case evaluation", "Review the circumstances and relevant information."],
  ["03", "Legal strategy", "Consider a practical way forward."],
  ["04", "Representation & follow-up", "Discuss representation and the next steps as appropriate."],
];
const faqs = [
  [
    "How do I arrange a consultation?",
    "Choose a topic below and visit the contact page to get in touch with Lawdex about an appointment.",
  ],
  [
    "What legal matters can I discuss?",
    "You can enquire about the corporate, family, property, civil, criminal and employment matters outlined on this page.",
  ],
  [
    "What should I prepare for an initial conversation?",
    "Have a brief overview of your concern and any relevant dates or documents ready. Avoid sending sensitive documents until you have agreed on a suitable channel.",
  ],
  [
    "Will a consultation determine the outcome of my case?",
    "No outcome can be guaranteed. The appropriate next steps depend on the facts and a professional assessment of your matter.",
  ],
];
const wrap = "mx-auto max-w-7xl px-5 sm:px-8 lg:px-12";
const eyebrow = "text-[11px] font-bold uppercase tracking-[0.24em] text-[#0766db]";
const heading = "font-serif text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl";
const cta = buttonVariants({
  size: "sm",
  className:
    "h-auto min-h-11 cursor-pointer rounded-sm bg-amber-100 px-5 py-3 text-amber-950 transition duration-700 hover:bg-amber-200",
});
function Photo({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={1400}
      height={1000}
      priority={priority}
      unoptimized
      className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.04] ${className}`}
    />
  );
}
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
function Label({ children }: { children: ReactNode }) {
  return <p className={eyebrow}>{children}</p>;
}
function ArrowLink({ href = "#consultation", children }: { href?: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-4 border-b border-[#0b64d8] pb-1 text-sm font-semibold text-[#0757bc] transition duration-700 hover:gap-6"
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function Query({ data }: { data?: Partial<HomeData> }) {
  const values = { ...defaultData, ...data };
  const cards = parseHomeCards(values.sectionsJson);
  const [topic, setTopic] = useState("");
  const reduced = useReducedMotion();
  const heroText = (value: string, fallback: string) =>
    !value || /nexamart|electronics|products|shopping/i.test(value) ? fallback : value;
  return (
    <div
      className="custom-parent-border overflow-hidden bg-[#fffdf8] text-[#071b42]"
      style={{
        paddingInline: Math.min(300, Math.max(0, Number(values.paddingX) || 0)),
        paddingBlock: Math.min(300, Math.max(0, Number(values.paddingY) || 0)),
      }}
    >
      {/* 01 Hero */}
      <section className="relative isolate flex min-h-[680px] items-end overflow-hidden bg-[#071b42] text-white lg:min-h-[760px]">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          initial={reduced ? false : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8 }}
        >
          <Photo src={values.imageUrl || photos.hero} alt="" priority className="opacity-60" />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#06183e]/95 via-[#071b42]/75 to-[#071b42]/20" />
        <div className={`${wrap} w-full py-20 sm:py-28`}>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-xs font-bold uppercase tracking-[.25em] text-[#a5d8ff]">
              {heroText(values.eyebrow, defaultData.eyebrow)}
            </p>
            <h1 className="mt-6 max-w-3xl font-serif text-5xl leading-[1.04] tracking-tight sm:text-7xl lg:text-[5.6rem]">
              {heroText(values.title, defaultData.title)}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-blue-50/90 sm:text-lg">
              {heroText(values.intro, defaultData.intro)}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-6">
              <a className={cta} href="#consultation">
                Book a Consultation <span aria-hidden="true">↗</span>
              </a>
              <a
                className="border-b border-white/60 pb-1 text-sm font-medium transition duration-700 hover:border-white"
                href="#services"
              >
                Explore Legal Services ↓
              </a>
            </div>
          </motion.div>
          <div className="mt-20 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[.25em] text-white/70">
            <span className="h-px w-12 bg-[#77c5ff]" /> A thoughtful approach to law
          </div>
        </div>
      </section>
      {/* 02 Services */}
      <section id="services" className="border-t border-[#eadfca] bg-[#fffdf8] py-20 sm:py-28">
        <div className={wrap}>
          <Reveal className="grid gap-5 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div>
              <Label>01 / Our legal services</Label>
              <h2 className={`${heading} mt-5 max-w-2xl`}>{cards[0].title}</h2>
            </div>
            <p className="max-w-md text-base leading-7 text-slate-600 lg:ml-auto">{cards[0].description}</p>
          </Reveal>
          <div className="mt-12 grid border-l border-t border-[#eadfca] md:grid-cols-2 lg:grid-cols-3">
            {services.map(([title, desc], i) => (
              <Reveal key={title} delay={i * 0.05}>
                <a
                  href="#consultation"
                  className="group flex min-h-52 h-full flex-col justify-between border-b border-r border-[#eadfca] p-6 transition duration-700 hover:bg-[#edf5ff] sm:p-8"
                >
                  <div className="flex justify-between text-xs tracking-widest text-[#0770e2]">
                    <span>{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-xl transition duration-700 group-hover:translate-x-1 group-hover:-translate-y-1">
                      ↗
                    </span>
                  </div>
                  <div>
                    <h3 className="mt-8 font-serif text-2xl">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* 03 About */}
      <section className="border-t border-[#eadfca] bg-[#f4f8fc] py-20 sm:py-28">
        <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20`}>
          <Reveal className="group relative">
            <div className="aspect-[5/4] overflow-hidden">
              <Photo src={photos.office} alt="A modern professional workspace" />
            </div>
            <div className="absolute -bottom-5 right-5 max-w-[220px] bg-[#07316c] p-6 text-white shadow-xl sm:right-[-25px]">
              <p className="font-serif text-2xl">Clarity. Care. Counsel.</p>
              <p className="mt-2 text-xs leading-5 text-blue-100">A more considered way to approach legal matters.</p>
            </div>
          </Reveal>
          <Reveal>
            <Label>02 / About Lawdex</Label>
            <h2 className={`${heading} mt-5`}>{cards[1].title}</h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">{cards[1].description}</p>
            <p className="mt-4 leading-7 text-slate-600">
              Our purpose is simple: make reliable legal guidance more approachable, with professionalism, discretion
              and communication at the heart of every conversation.
            </p>
            <div className="mt-8">
              <ArrowLink>Get to know our approach</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>
      {/* 04 Benefits */}
      <section className="border-t border-[#eadfca] bg-[#071d45] py-20 text-white sm:py-28">
        <div className={wrap}>
          <Reveal className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.24em] text-[#83caff]">03 / Why Lawdex</p>
              <h2 className={`${heading} mt-5 max-w-xl`}>{cards[2].title}</h2>
            </div>
            <p className="max-w-md self-end leading-7 text-blue-100/80 md:ml-auto">{cards[2].description}</p>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map(([n, title, desc], i) => (
              <Reveal key={title} delay={i * 0.08} className="border-t border-blue-300/40 pt-6">
                <span className="font-serif text-3xl text-[#65bfff]">{n}</span>
                <h3 className="mt-8 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-blue-100/75">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* 05 Team */}
      <section className="border-t border-[#eadfca] py-20 sm:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-center`}>
          <Reveal>
            <Label>04 / Meet our legal team</Label>
            <h2 className={`${heading} mt-5`}>{cards[3].title}</h2>
            <p className="mt-6 max-w-lg leading-8 text-slate-600">{cards[3].description}</p>
            <p className="mt-4 text-sm leading-7 text-slate-500">
              Ask about the right professional for your matter when you contact us.
            </p>
            <div className="mt-8">
              <ArrowLink>Speak to a lawyer</ArrowLink>
            </div>
          </Reveal>
          <Reveal className="group relative">
            <div className="aspect-[16/10] overflow-hidden">
              <Photo src={photos.team} alt="Professionals collaborating around a table" />
            </div>
            <div className="absolute bottom-0 left-0 max-w-xs bg-white p-5 sm:p-7">
              <p className="text-xs uppercase tracking-widest text-[#0766db]">A personal approach</p>
              <p className="mt-2 font-serif text-xl">A conversation centred on you.</p>
              <p className="mt-2 text-xs text-slate-500">Illustrative photography</p>
            </div>
          </Reveal>
        </div>
      </section>
      {/* 06 Corporate */}
      <section className="border-t border-[#eadfca] bg-[#edf4fb] py-20 sm:py-28">
        <div className={`${wrap} grid gap-10 lg:grid-cols-2 lg:items-center`}>
          <Reveal className="group relative order-2 lg:order-1">
            <div className="aspect-[4/3] overflow-hidden">
              <Photo src={photos.meeting} alt="A business meeting in progress" />
            </div>
            <div className="absolute right-0 top-0 bg-[#075cc8] px-5 py-4 text-xs font-semibold uppercase tracking-widest text-white">
              Business / Law
            </div>
          </Reveal>
          <Reveal className="order-1 lg:order-2 lg:pl-10">
            <Label>05 / Corporate & business</Label>
            <h2 className={`${heading} mt-5`}>{cards[4].title}</h2>
            <p className="mt-6 leading-7 text-slate-600">{cards[4].description}</p>
            <ul className="mt-8 grid gap-0 border-t border-[#cbd9e6]">
              {["Company formation", "Commercial agreements", "Compliance", "Business legal support"].map((x) => (
                <li key={x} className="flex justify-between border-b border-[#cbd9e6] py-4 text-sm font-medium">
                  {x}
                  <span className="text-[#0766db]">↗</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      {/* 07 Personal */}
      <section className="border-t border-[#eadfca] py-20 sm:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-[1fr_.9fr]`}>
          <Reveal>
            <Label>06 / Family & personal</Label>
            <h2 className={`${heading} mt-5 max-w-xl`}>{cards[5].title}</h2>
            <p className="mt-6 max-w-lg leading-8 text-slate-600">{cards[5].description}</p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {["Family matters", "Property disputes", "Inheritance matters", "Personal guidance"].map((x, i) => (
                <div key={x} className="border-t border-[#eadfca] pt-4">
                  <span className="text-xs text-[#0766db]">0{i + 1}</span>
                  <h3 className="mt-2 font-serif text-xl">{x}</h3>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <ArrowLink>Discuss your needs</ArrowLink>
            </div>
          </Reveal>
          <Reveal className="group relative">
            <div className="aspect-[4/5] max-h-[620px] overflow-hidden">
              <Photo src={photos.papers} alt="Documents and a pen on a desk" />
            </div>
            <div
              className="absolute -bottom-4 -left-4 h-28 w-28 border border-[#0766db]/30 sm:-left-8 sm:h-40 sm:w-40"
              aria-hidden="true"
            />
          </Reveal>
        </div>
      </section>
      {/* 08 Process */}
      <section className="border-t border-[#eadfca] bg-[#f5f8fb] py-20 sm:py-28">
        <div className={wrap}>
          <Reveal className="text-center">
            <Label>07 / Our legal process</Label>
            <h2 className={`${heading} mt-5`}>{cards[6].title}</h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-slate-600">{cards[6].description}</p>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map(([n, title, desc], i) => (
              <Reveal key={title} delay={i * 0.1} className="relative border-t border-[#8ab8ed] pt-7">
                <span className="absolute -top-2 left-0 h-4 w-4 rounded-full border-4 border-[#f5f8fb] bg-[#0766db]" />
                <span className="font-serif text-4xl text-[#9ab6d4]">{n}</span>
                <h3 className="mt-5 font-serif text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      {/* 09 Consultation */}
      <section id="consultation" className="border-t border-[#eadfca] bg-white py-20 sm:py-28">
        <div className={`${wrap} grid gap-0 lg:grid-cols-2`}>
          <Reveal className="group min-h-[360px] overflow-hidden">
            <Photo src={photos.meeting} alt="Professionals in conversation at a meeting" />
          </Reveal>
          <Reveal className="border border-[#eadfca] bg-[#fffdf8] p-7 sm:p-12">
            <Label>08 / Legal consultation</Label>
            <h2 className={`${heading} mt-5`}>{cards[7].title}</h2>
            <p className="mt-5 leading-7 text-slate-600">{cards[7].description}</p>
            <div className="mt-8">
              <label htmlFor="lawdex-topic" className="text-sm font-semibold">
                What would you like to discuss?
              </label>
              <select
                id="lawdex-topic"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className="mt-2 min-h-12 w-full rounded-sm border border-[#eadfca] bg-white px-3 text-sm text-[#071b42]"
              >
                <option value="">Select a legal service</option>
                {services.map(([name]) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
                <option value="Other">Other enquiry</option>
              </select>
              <p className="mt-3 text-xs leading-6 text-slate-500">
                {topic
                  ? `${topic} selected. Mention this when you contact us.`
                  : "Select a topic to prepare for your enquiry."}{" "}
                Please do not share confidential case details here.
              </p>
              <Link className={`${cta} mt-6`} href="/contact-us">
                Continue to contact Lawdex <span aria-hidden="true">↗</span>
              </Link>
              <p className="mt-3 text-xs text-slate-500">
                Appointments are arranged directly with Lawdex; this selection does not book one.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
      {/* 10 Insights */}
      <section className="border-t border-[#eadfca] bg-[#fffdf8] py-20 sm:py-28">
        <div className={wrap}>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Label>09 / Legal insights & resources</Label>
              <h2 className={`${heading} mt-5 max-w-2xl`}>{cards[8].title}</h2>
            </div>
            <p className="max-w-sm leading-7 text-slate-600">{cards[8].description}</p>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              [photos.library, "Legal awareness", "Understanding your options starts with asking the right questions."],
              [
                photos.meeting,
                "Business regulations",
                "Consider the legal obligations that may apply to your business.",
              ],
              [
                photos.papers,
                "Property matters",
                "Review relevant documents carefully before making property decisions.",
              ],
            ].map(([src, tag, text], i) => (
              <Reveal key={tag} delay={i * 0.1} className="group">
                <div className="aspect-[3/2] overflow-hidden">
                  <Photo
                    src={src}
                    alt={
                      tag === "Legal awareness"
                        ? "Books in a library"
                        : tag === "Business regulations"
                          ? "Business discussion at a table"
                          : "Documents on a desk"
                    }
                  />
                </div>
                <p className="mt-5 text-xs font-bold uppercase tracking-widest text-[#0766db]">{tag} / Bangladesh</p>
                <h3 className="mt-3 font-serif text-2xl leading-tight">{text}</h3>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-xs leading-6 text-slate-500">
            For general education only; this information is not personalised legal advice.
          </p>
        </div>
      </section>
      {/* 11 FAQ */}
      <section className="border-t border-[#eadfca] bg-[#f3f7fb] py-20 sm:py-28">
        <div className={`${wrap} grid gap-12 lg:grid-cols-[.8fr_1.2fr]`}>
          <Reveal>
            <Label>10 / Frequently asked questions</Label>
            <h2 className={`${heading} mt-5`}>{cards[9].title}</h2>
            <p className="mt-5 max-w-sm leading-7 text-slate-600">{cards[9].description}</p>
          </Reveal>
          <Reveal>
            <div className="border-t border-[#cad9e8]">
              {faqs.map(([q, a]) => (
                <details key={q} className="group border-b border-[#cad9e8] py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold marker:content-none">
                    {q}
                    <span
                      className="text-2xl font-normal text-[#0766db] transition duration-700 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="max-w-2xl pt-4 text-sm leading-7 text-slate-600">{a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      {/* 12 Contact */}
      <section className="relative isolate overflow-hidden border-t border-[#eadfca] bg-[#071b42] py-24 text-white sm:py-32">
        <div className="absolute inset-0 -z-10 opacity-20">
          <Photo src={photos.library} alt="" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#071b42] via-[#071b42]/90 to-[#0755aa]/50" />
        <Reveal className={wrap}>
          <p className="text-xs font-bold uppercase tracking-[.24em] text-[#91d1ff]">11 / Contact Lawdex</p>
          <h2 className={`${heading} mt-6 max-w-3xl sm:text-6xl lg:text-7xl`}>{cards[10].title}</h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100/85">{cards[10].description}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link href="/contact-us" className={cta}>
              Contact Lawdex <span aria-hidden="true">↗</span>
            </Link>
            <a
              href="#consultation"
              className="border-b border-white/60 pb-1 text-sm transition duration-700 hover:border-white"
            >
              Discuss a consultation ↗
            </a>
          </div>
          <p className="mt-16 text-xs uppercase tracking-[.2em] text-blue-100/70">
            Legal guidance for individuals, families & businesses in Bangladesh
          </p>
        </Reveal>
      </section>
    </div>
  );
}
