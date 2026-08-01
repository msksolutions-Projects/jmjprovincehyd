import data from "@/data/content.json";
import type { ContentData, ContentSection } from "@/types/content";

const content = data as ContentData;
export const allSections = content.sections;

export function getSection(slug: string): ContentSection {
  const section = content.sections.find((item) => item.slug === slug);
  if (!section) throw new Error(`Content section not found: ${slug}`);
  return section;
}

export function searchContent(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];
  return content.sections
    .filter((section) => `${section.title} ${section.markdown}`.toLowerCase().includes(normalized))
    .slice(0, 12);
}
