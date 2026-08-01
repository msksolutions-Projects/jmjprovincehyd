import { useState, type SyntheticEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Container,
  Skeleton,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import { Link as RouterLink } from "react-router-dom";
import { fetchGallery } from "@/features/gallery/gallery.service";
import { fetchPublications, formatBytes } from "@/features/publications/publications.service";
import { institutions } from "@/features/institutions/useInstitutions";
import { ErrorState } from "@/components/feedback/ErrorState";

type TabKey = "gallery" | "publications" | "institutions";

const tabs: { key: TabKey; label: string; viewAll: { label: string; href: string } }[] = [
  { key: "gallery", label: "Gallery", viewAll: { label: "View all photographs", href: "/gallery" } },
  {
    key: "publications",
    label: "Publications",
    viewAll: { label: "View all publications", href: "/publications" },
  },
  {
    key: "institutions",
    label: "Institutions",
    viewAll: { label: "View all institutions", href: "/institutions" },
  },
];

/** Shared row: eyebrow, title and an arrow, linking to the item. */
function MediaRow({
  eyebrow,
  title,
  href,
  external = false,
  media,
}: {
  eyebrow: string;
  title: string;
  href: string;
  external?: boolean;
  media?: { src: string; alt: string } | { icon: true };
}) {
  const linkProps = external
    ? { component: "a" as const, href, target: "_blank", rel: "noopener noreferrer" }
    : { component: RouterLink, to: href };

  return (
    <Box
      {...linkProps}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        py: 2.25,
        px: { xs: 0, md: 2 },
        textDecoration: "none",
        color: "inherit",
        borderBottom: 1,
        borderColor: "divider",
        transition: "background-color .18s ease",
        "&:hover": { bgcolor: "action.hover" },
        "&:hover .row-arrow": { transform: "translateX(4px)" },
      }}
    >
      {media && "icon" in media ? (
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: 2,
            flexShrink: 0,
            display: "grid",
            placeItems: "center",
            bgcolor: "action.selected",
          }}
        >
          <PictureAsPdfRoundedIcon color="secondary" />
        </Box>
      ) : media ? (
        <Box
          component="img"
          src={media.src}
          alt={media.alt}
          loading="lazy"
          sx={{
            width: 88,
            height: 64,
            objectFit: "cover",
            borderRadius: 2,
            flexShrink: 0,
            bgcolor: "action.hover",
          }}
        />
      ) : null}

      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography variant="overline" color="secondary.main" sx={{ display: "block" }}>
          {eyebrow}
        </Typography>
        <Typography variant="h6" sx={{ lineHeight: 1.35 }}>
          {title}
        </Typography>
      </Box>

      <ArrowForwardRoundedIcon
        className="row-arrow"
        fontSize="small"
        sx={{ color: "text.secondary", transition: "transform .18s ease" }}
      />
    </Box>
  );
}

function RowsSkeleton() {
  return (
    <Stack aria-busy="true" aria-live="polite" aria-label="Loading">
      {Array.from({ length: 3 }, (_, index) => (
        <Stack key={index} direction="row" spacing={2.5} alignItems="center" sx={{ py: 2.25 }}>
          <Skeleton variant="rounded" width={88} height={64} />
          <Box sx={{ flex: 1 }}>
            <Skeleton width={100} height={14} />
            <Skeleton width="60%" height={24} />
          </Box>
        </Stack>
      ))}
    </Stack>
  );
}

function GalleryPanel() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["gallery"],
    queryFn: ({ signal }) => fetchGallery(signal),
  });

  if (isPending) return <RowsSkeleton />;
  if (isError) return <ErrorState onRetry={() => void refetch()} />;

  return (
    <>
      {data.images.slice(0, 3).map((image) => (
        <MediaRow
          key={image.id}
          eyebrow={image.categoryLabel}
          title={image.title}
          href="/gallery"
          media={{ src: image.thumbnail, alt: "" }}
        />
      ))}
    </>
  );
}

function PublicationsPanel() {
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["publications"],
    queryFn: ({ signal }) => fetchPublications(signal),
  });

  if (isPending) return <RowsSkeleton />;
  if (isError) return <ErrorState onRetry={() => void refetch()} />;

  return (
    <>
      {data.slice(0, 3).map((item) => (
        <MediaRow
          key={item.file}
          eyebrow={`PDF · ${formatBytes(item.bytes)}`}
          title={item.title}
          href={item.file}
          external
          media={{ icon: true }}
        />
      ))}
    </>
  );
}

function InstitutionsPanel() {
  // The three oldest houses — the Province's own starting point.
  const oldest = [...institutions]
    .filter((item) => /\d{4}/.test(item.established))
    .sort(
      (a, b) =>
        Math.min(...(a.established.match(/\d{4}/g) ?? ["9999"]).map(Number)) -
        Math.min(...(b.established.match(/\d{4}/g) ?? ["9999"]).map(Number)),
    )
    .slice(0, 3);

  return (
    <>
      {oldest.map((item) => (
        <MediaRow
          key={item.id}
          eyebrow={`${item.type} · Established ${item.established}`}
          title={item.institution}
          href={`/institutions/${item.id}`}
        />
      ))}
    </>
  );
}

export function MediaTabs() {
  const [active, setActive] = useState<TabKey>("gallery");
  const current = tabs.find((tab) => tab.key === active) ?? tabs[0]!;

  return (
    <Box component="section" sx={{ bgcolor: "background.paper", py: { xs: 7, md: 12 } }}>
      <Container>
        <Box sx={{ maxWidth: 760, mb: 4 }}>
          <Typography variant="overline" color="secondary.main" sx={{ display: "block", mb: 1.5 }}>
            From the Province
          </Typography>
          <Typography variant="h2" sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" }, lineHeight: 1.18 }}>
            Photographs, publications and the houses where the work happens.
          </Typography>
        </Box>

        <Tabs
          value={active}
          onChange={(_event: SyntheticEvent, value: TabKey) => setActive(value)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          aria-label="Province media"
          sx={{ borderBottom: 1, borderColor: "divider", mb: 1 }}
        >
          {tabs.map((tab) => (
            <Tab key={tab.key} value={tab.key} label={tab.label} id={`media-tab-${tab.key}`} />
          ))}
        </Tabs>

        <Box role="tabpanel" aria-labelledby={`media-tab-${active}`}>
          {active === "gallery" && <GalleryPanel />}
          {active === "publications" && <PublicationsPanel />}
          {active === "institutions" && <InstitutionsPanel />}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Button
            component={RouterLink}
            to={current.viewAll.href}
            endIcon={<ArrowForwardRoundedIcon />}
            size="large"
          >
            {current.viewAll.label}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
