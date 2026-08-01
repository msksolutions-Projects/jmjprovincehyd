import { Container, Paper } from "@mui/material";
import { useLocation } from "react-router-dom";
import { PageHeader, type PageHeaderCrumb } from "@/components/common/PageHeader";
import { ContentMarkdown } from "@/components/common/ContentMarkdown";
import { ReadingLayout } from "@/components/common/ReadingLayout";
import { Seo } from "@/components/seo/Seo";
import { breadcrumbSchema } from "@/components/seo/schema";
import { getSection } from "@/services/content";

const descriptions: Record<string, string> = {
  "our-founder": "The life, ministry and charism of Rev. Fr. Mathias Wolff S.J.",
  "our-history":
    "The journey of the Society of Jesus Mary Joseph from Holland to India and the wider world.",
  "missionary-work": "The arrival and service of the first missionary sisters in India.",
  "vision-mission": "Our vision, mission and ever-adaptable apostolic availability.",
  formation: "A person-oriented, contextualised and integral journey into the likeness of Christ.",
  education: "The beginnings and continuing mission of JMJ education in India.",
  "province-profile": "JMJ Hyderabad Province, its apostolates, collaborations and programme.",
  "social-work": "Preferential love of the poor expressed through the social apostolate.",
  "health-care": "Compassionate healing, nursing education and accessible health programmes.",
  "pastoral-and-evangelization": "Pastoral presence and proclamation of the Good News.",
  "eco-friendliness-and-protection": "Ecological fellowship, JPIC and responsibility for creation.",
  "provincial-superiors": "Provincial leadership through the years and current council members.",
  "administration-team": "The leadership team serving JMJ Hyderabad Province.",
  "province-commissions":
    "Commission members serving education, health care, formation, finance and other apostolates.",
  institutions: "Detailed profiles of JMJ institutions and their service.",
  "the-congregation-worldwide":
    "The Congregation of Jesus Mary Joseph across India, Ghana, Italy and the United States.",
  "news-and-updates": "Announcements and updates published by the provincial office.",
};

/** Titles in the source are upper-case; render them in title case. */
const toTitleCase = (value: string) =>
  value
    .toLowerCase()
    .replace(/\b[a-z]/g, (char) => char.toUpperCase())
    .replace(/\bJmj\b/g, "JMJ")
    .replace(/\bT\.l\.c\.\b/gi, "T.L.C.");

export interface ContentPageProps {
  slug: string;
  eyebrow?: string;
  breadcrumbs?: PageHeaderCrumb[];
}

export function ContentPage({
  slug,
  eyebrow = "JMJ Hyderabad Province",
  breadcrumbs = [],
}: ContentPageProps) {
  const section = getSection(slug);
  const { pathname } = useLocation();
  const title = toTitleCase(section.title);
  const description = descriptions[slug];

  return (
    <>
      <Seo
        title={title}
        description={description}
        path={pathname}
        type="article"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          ...breadcrumbs.map((c) => ({ name: c.label, path: c.href ?? pathname })),
          { name: title, path: pathname },
        ])}
      />
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
      />
      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <ReadingLayout headings={section.headings}>
          <Paper sx={{ p: { xs: 2.5, sm: 4, md: 5 } }}>
            <ContentMarkdown markdown={section.markdown} />
          </Paper>
        </ReadingLayout>
      </Container>
    </>
  );
}
