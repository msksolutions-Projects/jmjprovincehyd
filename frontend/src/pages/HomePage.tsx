import { Box, Container, Typography } from "@mui/material";
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded";
import LocalHospitalRoundedIcon from "@mui/icons-material/LocalHospitalRounded";
import VolunteerActivismRoundedIcon from "@mui/icons-material/VolunteerActivismRounded";
import ChurchRoundedIcon from "@mui/icons-material/ChurchRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SpaRoundedIcon from "@mui/icons-material/SpaRounded";
import { Seo } from "@/components/seo/Seo";
import { organizationSchema } from "@/components/seo/schema";
import { HeroCarousel } from "@/features/home/HeroCarousel";
import { ImageMarquee } from "@/features/home/ImageMarquee";
import { GalleryCarousel } from "@/features/home/GalleryCarousel";
import { FeatureBand } from "@/features/home/FeatureBand";
import { ExploreGrid, type ExploreItem } from "@/features/home/ExploreGrid";
import { MediaTabs } from "@/features/home/MediaTabs";

const ministries: ExploreItem[] = [
  {
    label: "Education",
    description: "Schools, colleges and teacher training that form the person to fullness of life.",
    href: "/ministries/education",
    icon: SchoolRoundedIcon,
  },
  {
    label: "Health Care",
    description: "Hospitals, nursing education and rural health programmes.",
    href: "/ministries/health-care",
    icon: LocalHospitalRoundedIcon,
  },
  {
    label: "Social Work",
    description: "Service with people who are poor, tribal, marginalized and voiceless.",
    href: "/ministries/social-work",
    icon: VolunteerActivismRoundedIcon,
  },
  {
    label: "Formation",
    description: "Pre-postulancy through juniorate, forming sisters for the mission.",
    href: "/ministries/formation",
    icon: GroupsRoundedIcon,
  },
  {
    label: "Pastoral and Evangelization",
    description: "Parish accompaniment, catechesis and presence in local communities.",
    href: "/ministries/pastoral-evangelization",
    icon: ChurchRoundedIcon,
  },
  {
    label: "Eco Friendliness and Protection",
    description: "Ecological fellowship and care for the integrity of creation.",
    href: "/ministries/eco-friendliness",
    icon: SpaRoundedIcon,
  },
];

/** Only dates carried unambiguously by the source content appear here. */
const milestones: [string, string][] = [
  ["1822", "The Society is founded in Holland by Fr. Mathias Wolff S.J."],
  ["1904", "The first missionary sisters arrive in Guntur."],
  ["1987", "The Indian Province is divided and Hyderabad Province is established."],
  ["2016", "The Congregation of Jesus Mary Joseph is established by decree."],
];

function Milestones() {
  return (
    <Box component="section" sx={{ bgcolor: "primary.main", color: "common.white", py: { xs: 7, md: 11 } }}>
      <Container>
        <Typography variant="overline" sx={{ display: "block", mb: 1.5, color: "rgba(255,255,255,.7)" }}>
          Two centuries
        </Typography>
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" }, lineHeight: 1.18, maxWidth: 720 }}
        >
          From a small society in Holland to thirty-two institutions across the Deccan.
        </Typography>

        <Box
          component="ol"
          sx={{
            listStyle: "none",
            p: 0,
            mt: { xs: 5, md: 7 },
            display: "grid",
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" },
          }}
        >
          {milestones.map(([year, text]) => (
            <Box
              component="li"
              key={year}
              sx={{ borderTop: 2, borderColor: "secondary.light", pt: 2.5 }}
            >
              <Typography
                component="span"
                sx={{
                  display: "block",
                  fontSize: { xs: "2.25rem", md: "2.75rem" },
                  fontWeight: 600,
                  lineHeight: 1,
                  color: "secondary.light",
                }}
              >
                {year}
              </Typography>
              <Typography sx={{ mt: 1.5, color: "rgba(255,255,255,.85)" }}>{text}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export function HomePage() {
  return (
    <>
      <Seo
        title="JMJ Hyderabad Province"
        description="The Congregation of Jesus Mary Joseph, Hyderabad Province — serving through education, health care, social work and formation across Telangana, Andhra Pradesh and Madhya Pradesh since 1822."
        path="/"
        jsonLd={organizationSchema}
      />

      <HeroCarousel />

      <ImageMarquee />

      <FeatureBand
        eyebrow="Welcome"
        statement="An ever adaptable apostolic availability — the charism our founder gave us, lived out wherever the need is greatest."
        body="The Sisters of Jesus Mary Joseph have served in India since 1904. Today the Hyderabad Province runs schools, hospitals, nursing colleges, social service societies and formation houses across three states."
        image="/brand/hero-sisters.webp"
        imageAlt="Sisters of the Hyderabad Province together"
        actions={[
          { label: "About us", href: "/who-we-are/province-profile" },
          { label: "Our history", href: "/who-we-are/history" },
        ]}
      />

      <ExploreGrid
        eyebrow="What we do"
        title="Six apostolates, one mission."
        intro="Each apostolate carries the same purpose into a different part of life — the classroom, the ward, the village, the novitiate."
        items={ministries}
      />

      <Milestones />

      <FeatureBand
        eyebrow="Our founder"
        statement="“Always ready for souls, and I want to labour as a giant.”"
        body="Rev. Fr. Mathias Wolff S.J. founded the Society of Jesus Mary Joseph in Holland in 1822, to serve the liberation of the oppressed, the poor, the voiceless and the marginalized."
        image="/brand/founder.webp"
        imageAlt="Rev. Fr. Mathias Wolff S.J., founder of the Congregation"
        reverse
        actions={[
          { label: "About our founder", href: "/who-we-are/founder" },
          { label: "Vision and mission", href: "/who-we-are/vision-mission" },
        ]}
      />

      <GalleryCarousel />

      <MediaTabs />

      <FeatureBand
        eyebrow="Get in touch"
        statement="You are welcome to write to us."
        body="For admissions, collaboration, vocation enquiries, or anything concerning a particular institution or community — the provincial office at Somajiguda will reply."
        image="/brand/contact.webp"
        imageAlt="The provincial house at Jyothinilayam, Somajiguda"
        tone="dark"
        actions={[
          { label: "Contact the office", href: "/contact" },
          { label: "Convent directory", href: "/contact/convents" },
        ]}
      />
    </>
  );
}
