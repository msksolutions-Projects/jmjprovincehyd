import { useMemo } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/feedback/EmptyState";
import { Box } from "@mui/material";
import { Seo } from "@/components/seo/Seo";
import { breadcrumbSchema } from "@/components/seo/schema";
import { ContentMarkdown } from "@/components/common/ContentMarkdown";
import { getInstitution, institutions } from "@/features/institutions/useInstitutions";
import {
  hasOwnPhotograph,
  institutionGallery,
  institutionImage,
} from "@/features/institutions/institutionImages";
import { getSection } from "@/services/content";

/**
 * The Province content holds narrative profiles for some houses only. Where no
 * narrative exists we say so plainly rather than inventing one.
 */
function findNarrative(name: string): string | null {
  try {
    const section = getSection("institutions");
    const heading = name
      .split(",")[0]
      ?.replace(/^(JMJ|St\.?|"|')\s*/i, "")
      .trim()
      .toLowerCase();
    if (!heading || heading.length < 4) return null;

    const blocks = section.markdown.split(/\n(?=## )/);
    const match = blocks.find((block) => {
      const title = block.split("\n")[0]?.toLowerCase() ?? "";
      return title.includes(heading) || heading.includes(title.replace(/^##\s*/, "").trim());
    });
    return match ?? null;
  } catch {
    return null;
  }
}

export function InstitutionDetailPage() {
  const { id = "" } = useParams();
  const institution = getInstitution(id);

  const related = useMemo(
    () =>
      institution
        ? institutions.filter((i) => i.type === institution.type && i.id !== institution.id).slice(0, 4)
        : [],
    [institution],
  );

  const narrative = useMemo(
    () => (institution ? findNarrative(institution.institution) : null),
    [institution],
  );

  if (!institution) {
    return (
      <>
        <Seo title="Institution not found" path={`/institutions/${id}`} noIndex />
        <PageHeader
          eyebrow="Our Presence"
          title="Institution not found"
          breadcrumbs={[{ label: "Institutions", href: "/institutions" }]}
        />
        <Container sx={{ py: { xs: 5, md: 8 } }}>
          <EmptyState
            icon={<ApartmentRoundedIcon />}
            title="We could not find that institution"
            description="The link may be out of date. Browse the full directory to find what you need."
            action={
              <Button component={RouterLink} to="/institutions" variant="contained">
                Back to all institutions
              </Button>
            }
          />
        </Container>
      </>
    );
  }

  const facts = [
    ["Type", institution.type],
    ["Established", institution.established],
    ["Courses", institution.courses],
    ["Medium", institution.medium],
    ["Intake", institution.intake],
  ].filter(([, value]) => value && value !== "—");

  return (
    <>
      <Seo
        title={institution.institution}
        description={`${institution.institution} — ${institution.type}, established ${institution.established}. Part of JMJ Hyderabad Province.`}
        path={`/institutions/${institution.id}`}
        type="article"
        jsonLd={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Institutions", path: "/institutions" },
          { name: institution.institution, path: `/institutions/${institution.id}` },
        ])}
      />
      <PageHeader
        eyebrow={institution.type}
        title={institution.institution}
        breadcrumbs={[{ label: "Institutions", href: "/institutions" }]}
      />

      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 8 }}>
            <Box
              sx={{
                borderRadius: 3,
                overflow: "hidden",
                mb: 4,
                aspectRatio: "16 / 9",
                bgcolor: "action.hover",
              }}
            >
              <Box
                component="img"
                src={institutionImage(institution.id, institution.type)}
                alt={
                  hasOwnPhotograph(institution.id)
                    ? `${institution.institution}`
                    : ""
                }
                loading="eager"
                sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </Box>
            {!hasOwnPhotograph(institution.id) && (
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mb: 3 }}>
                Photograph shows JMJ {institution.type.toLowerCase()} work. A photograph of this
                house has not yet been supplied.
              </Typography>
            )}

            {narrative ? (
              <Paper sx={{ p: { xs: 2.5, sm: 4 } }}>
                <ContentMarkdown markdown={narrative} />
              </Paper>
            ) : (
              <Alert severity="info">
                <Typography variant="subtitle2" gutterBottom>
                  Detailed profile coming soon
                </Typography>
                <Typography variant="body2">
                  The Province content records this institution&rsquo;s establishment details but
                  does not yet include a written profile. The details opposite are complete and
                  accurate; the narrative will be added once supplied by the provincial office.
                </Typography>
              </Alert>
            )}

            <Typography variant="h3" sx={{ mt: 6, mb: 2 }}>
              From the archive
            </Typography>
            <Box
              sx={{
                display: "grid",
                gap: 1.5,
                gridTemplateColumns: "repeat(3, 1fr)",
              }}
            >
              {institutionGallery(institution.type).map((src) => (
                <Box
                  key={src}
                  component="img"
                  src={src}
                  alt=""
                  loading="lazy"
                  sx={{
                    width: "100%",
                    aspectRatio: "4 / 3",
                    objectFit: "cover",
                    borderRadius: 2,
                    display: "block",
                    bgcolor: "action.hover",
                  }}
                />
              ))}
            </Box>

            {related.length > 0 && (
              <>
                <Typography variant="h3" sx={{ mt: 6, mb: 2 }}>
                  Other {institution.type.toLowerCase()} institutions
                </Typography>
                <Grid container spacing={2}>
                  {related.map((item) => (
                    <Grid size={{ xs: 12, sm: 6 }} key={item.id}>
                      <Card sx={{ height: "100%" }}>
                        <CardContent>
                          <Link
                            component={RouterLink}
                            to={`/institutions/${item.id}`}
                            variant="subtitle1"
                            underline="hover"
                          >
                            {item.institution}
                          </Link>
                          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                            Established {item.established}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Paper sx={{ p: 3, position: { md: "sticky" }, top: { md: 104 } }}>
              <Typography variant="overline" color="text.secondary" display="block">
                Institution details
              </Typography>
              <List dense disablePadding sx={{ mt: 1 }}>
                {facts.map(([label, value]) => (
                  <ListItem key={label} disableGutters sx={{ py: 0.75 }}>
                    <ListItemText
                      primary={label}
                      secondary={value}
                      slotProps={{
                        primary: { variant: "caption", color: "text.secondary" },
                        secondary: { variant: "body2", color: "text.primary", fontWeight: 500 },
                      }}
                    />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 2 }} />
              <Stack spacing={1.5}>
                <Chip
                  label="Part of JMJ Hyderabad Province"
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Button component={RouterLink} to="/contact" variant="contained" fullWidth>
                  Contact the provincial office
                </Button>
                <Button
                  component={RouterLink}
                  to="/institutions"
                  startIcon={<ArrowBackRoundedIcon />}
                  fullWidth
                >
                  All institutions
                </Button>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
