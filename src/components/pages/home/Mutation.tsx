/*
|-----------------------------------------
| setting up Mutation.tsx for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, 31 October, 2026
|-----------------------------------------
*/

"use client";

import Image from "next/image";
import { useState } from "react";

import ImagePickerModal from "@/components/dashboard-ui/ImagePickerModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

import { defaultData, parseHomeCards, type HomeData } from "./data";

const labels = [
  "Legal services",
  "About Lawdex",
  "Why choose Lawdex",
  "Legal team",
  "Business services",
  "Personal services",
  "Legal process",
  "Consultation",
  "Legal insights",
  "Frequently asked questions",
  "Contact and final CTA",
];

export default function Mutation({ data, onChange }: { data?: Partial<HomeData>; onChange: (data: HomeData) => void }) {
  const [mediaOpen, setMediaOpen] = useState(false);
  const [open, setOpen] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const values = { ...defaultData, ...data };
  const sections = parseHomeCards(values.sectionsJson);
  const update = (next: Partial<HomeData>) => onChange({ ...values, ...next });
  const updateCard = (index: number, field: "title" | "description", value: string) =>
    update({
      sectionsJson: JSON.stringify(sections.map((item, i) => (i === index ? { ...item, [field]: value } : item))),
    });
  return (
    <div className="custom-parent-border bg-[#fffaf0] text-stone-800">
      <div className="mx-auto max-w-7xl p-4 sm:p-6">
        <header className="flex flex-wrap items-center justify-between gap-4 border border-[#eadfca] bg-white p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Page editor</p>
            <h2 className="mt-1 text-xl font-semibold">Lawdex homepage</h2>
            <p className="mt-1 text-sm text-stone-500">Edit the hero and the eleven fixed sections below.</p>
          </div>
          <label className="flex items-center gap-3 text-sm">
            Force update{" "}
            <Switch
              checked={values.forceUpdate === "true"}
              onCheckedChange={(checked) => update({ forceUpdate: checked ? "true" : "false" })}
            />
          </label>
        </header>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_20rem]">
          <div className="grid gap-4 border border-[#eadfca] bg-white p-4">
            <h3 className="font-semibold">Hero content</h3>
            {(
              [
                ["Eyebrow", "eyebrow"],
                ["Title", "title"],
              ] as const
            ).map(([label, key]) => (
              <label className="grid gap-1 text-sm" key={key}>
                {label}
                <Input value={values[key]} onChange={(e) => update({ [key]: e.target.value })} />
              </label>
            ))}
            <label className="grid gap-1 text-sm">
              Introduction
              <Textarea value={values.intro} onChange={(e) => update({ intro: e.target.value })} />
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["Horizontal padding", "paddingX"],
                  ["Vertical padding", "paddingY"],
                ] as const
              ).map(([label, key]) => (
                <div key={key}>
                  <p className="text-sm">
                    {label}: {values[key]}px
                  </p>
                  <Slider
                    aria-label={label}
                    className="mt-3"
                    min={0}
                    max={300}
                    step={1}
                    value={[Number(values[key]) || 0]}
                    onValueChange={([value]) => update({ [key]: value ?? 0 })}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="border border-[#eadfca] bg-white p-4">
            <h3 className="font-semibold">Hero image</h3>
            {values.imageUrl ? (
              <Image
                className="mt-3 aspect-video w-full object-cover"
                src={values.imageUrl}
                alt={values.imageAlt || "Hero image"}
                width={600}
                height={338}
                unoptimized
              />
            ) : (
              <p className="mt-3 text-sm text-stone-500">Using the default editorial photograph.</p>
            )}
            <Button
              className="mt-3 w-full cursor-pointer bg-amber-100 text-amber-900 transition duration-700 hover:bg-amber-200"
              size="sm"
              type="button"
              onClick={() => setMediaOpen(true)}
            >
              Edit image
            </Button>
            {values.imageUrl && (
              <Button
                className="mt-2 w-full cursor-pointer transition duration-700"
                size="sm"
                variant="outline"
                type="button"
                onClick={() => update({ imageUrl: "" })}
              >
                Use default image
              </Button>
            )}
            <label className="mt-3 grid gap-1 text-sm">
              Image description
              <Input value={values.imageAlt} onChange={(e) => update({ imageAlt: e.target.value })} />
            </label>
          </div>
        </div>
        <div className="mt-4 border border-[#eadfca] bg-white p-4">
          <h3 className="font-semibold">Page sections</h3>
          <p className="mt-1 text-sm text-stone-500">
            The twelve-section layout is fixed; update each heading and introduction here.
          </p>
          <div className="mt-4 grid gap-2">
            {sections.slice((page - 1) * pageSize, page * pageSize).map((card, offset) => {
              const index = (page - 1) * pageSize + offset;
              return (
                <div className="border border-[#eadfca]" key={labels[index]}>
                  <button
                    type="button"
                    aria-expanded={open === index}
                    onClick={() => setOpen(open === index ? null : index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-4 p-3 text-left transition duration-700 hover:bg-amber-50"
                  >
                    <span className="text-sm font-semibold">
                      <span className="mr-3 text-amber-700">{String(index + 2).padStart(2, "0")}</span>
                      {labels[index]}
                    </span>
                    <span aria-hidden="true">{open === index ? "−" : "+"}</span>
                  </button>
                  {open === index && (
                    <div className="grid gap-3 border-t border-[#eadfca] p-4">
                      <label className="grid gap-1 text-sm">
                        Heading
                        <Input value={card.title} onChange={(e) => updateCard(index, "title", e.target.value)} />
                      </label>
                      <label className="grid gap-1 text-sm">
                        Introduction
                        <Textarea
                          value={card.description}
                          onChange={(e) => updateCard(index, "description", e.target.value)}
                        />
                      </label>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
            <label>
              Items per page{" "}
              <select
                className="ml-2 rounded-sm border border-[#eadfca] bg-white p-2"
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setPage(1);
                }}
              >
                {[10, 25, 50, 100].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer transition duration-700"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </Button>
              <span>
                Page {page} of {Math.ceil(sections.length / pageSize)}
              </span>
              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer transition duration-700"
                disabled={page >= Math.ceil(sections.length / pageSize)}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
      {mediaOpen && (
        <ImagePickerModal
          close={() => setMediaOpen(false)}
          description="Choose or upload a homepage hero image."
          onSelect={(imageUrl) => {
            update({ imageUrl });
            setMediaOpen(false);
          }}
          selectedUrl={values.imageUrl}
          title="Choose hero image"
          uploadLabel="Upload hero image"
        />
      )}
    </div>
  );
}
