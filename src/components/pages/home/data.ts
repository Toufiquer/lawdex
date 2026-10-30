/*
|-----------------------------------------
| setting up data.ts for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, 31 October, 2026
|-----------------------------------------
*/

export type HomeCard = { title: string; description: string };
export type HomeData = {
  forceUpdate: "true" | "false";
  paddingX: number;
  paddingY: number;
  eyebrow: string;
  title: string;
  intro: string;
  imageUrl: string;
  imageAlt: string;
  sectionsJson: string;
};

// Fixed section order keeps the public page and editor in sync.
export const defaultCards: HomeCard[] = [
  {
    title: "Legal support for the moments that matter",
    description: "Explore guidance across the legal matters that touch your life and business.",
  },
  {
    title: "A considered approach to every matter",
    description:
      "Lawdex helps individuals, families and businesses in Bangladesh find a clearer path through legal questions.",
  },
  {
    title: "The confidence to move forward",
    description: "Good legal support begins with listening, discretion and a clear understanding of your priorities.",
  },
  {
    title: "People behind the practice",
    description:
      "Connect with legal professionals for a conversation about your needs and the next steps available to you.",
  },
  {
    title: "A stronger foundation for business",
    description:
      "From establishing a company to navigating commercial obligations, find support for the decisions that shape your business.",
  },
  {
    title: "For the matters closest to home",
    description:
      "Personal legal matters deserve a thoughtful conversation and guidance tailored to your circumstances.",
  },
  {
    title: "A clear path, together",
    description: "Every matter is different. Our process starts with understanding yours.",
  },
  {
    title: "Start with a conversation",
    description:
      "Tell us what kind of legal support you are looking for, then contact Lawdex to discuss an appointment.",
  },
  {
    title: "Knowledge for what comes next",
    description: "A starting point for understanding common legal considerations in Bangladesh.",
  },
  { title: "Questions, answered", description: "A few helpful answers before you get in touch." },
  {
    title: "Let’s find your way forward",
    description: "Whatever brings you here, your next step can begin with a conversation.",
  },
];
export const defaultHomeCard: HomeCard = { title: "", description: "" };
export const defaultData: HomeData = {
  forceUpdate: "false",
  paddingX: 0,
  paddingY: 0,
  eyebrow: "Legal guidance · Bangladesh",
  title: "Clarity for the decisions that matter.",
  intro:
    "Thoughtful legal guidance for individuals, families and businesses. Wherever you are in your journey, begin with a conversation.",
  imageUrl: "",
  imageAlt: "Courthouse columns and architectural details",
  sectionsJson: JSON.stringify(defaultCards),
};

export function parseHomeCards(value?: string): HomeCard[] {
  try {
    const parsed: unknown = JSON.parse(value || "[]");
    if (!Array.isArray(parsed)) return defaultCards;
    return defaultCards.map((fallback, index) => {
      const item = parsed[index];
      if (!item || typeof item !== "object" || Array.isArray(item)) return fallback;
      const card = item as Partial<HomeCard>;
      // Ignore the retired electronics defaults while preserving other saved edits.
      const retiredTitles = [
        "Discover electronics",
        "Find your everyday essentials",
        "Make room for better focus",
        "Stay connected",
        "Entertainment, your way",
        "Compare the details",
        "Think about compatibility",
        "Find the right fit",
        "Explore at your pace",
        "Get to know NexaMart",
        "Ready to explore?",
      ];
      if (
        retiredTitles.includes(card.title ?? "") ||
        /nexamart|electronics|products|shopping/i.test(`${card.title ?? ""} ${card.description ?? ""}`)
      )
        return fallback;
      return {
        title: typeof card.title === "string" && card.title.trim() ? card.title : fallback.title,
        description:
          typeof card.description === "string" && card.description.trim() ? card.description : fallback.description,
      };
    });
  } catch {
    return defaultCards;
  }
}
