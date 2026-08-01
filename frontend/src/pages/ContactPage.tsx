import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import { Link as RouterLink } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { Seo } from "@/components/seo/Seo";
import { organizationSchema } from "@/components/seo/schema";
import { ContactForm } from "@/features/contact/ContactForm";
import { site } from "@/data/site";

const details = [
  { icon: <LocationOnRoundedIcon color="secondary" />, label: "Address", value: site.address },
  {
    icon: <PhoneRoundedIcon color="secondary" />,
    label: "Telephone",
    value: `${site.phone} · ${site.alternatePhone}`,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
  },
  {
    icon: <EmailRoundedIcon color="secondary" />,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: <ScheduleRoundedIcon color="secondary" />,
    label: "Office hours",
    value: "08:00 – 18:00, Monday to Saturday",
  },
];

export function ContactPage() {
  return (
    <>
      <Seo
        title="Contact"
        description="Contact the provincial office of JMJ Hyderabad Province at Jyothinilayam, Somajiguda, Hyderabad."
        path="/contact"
        jsonLd={organizationSchema}
      />
      <PageHeader
        eyebrow="Get in Touch"
        title="Contact the Provincial Office"
        description="For admissions, collaboration, vocation enquiries, or anything concerning a particular institution or community."
      />

      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={4} alignItems="flex-start">
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper sx={{ p: { xs: 2.5, sm: 4 } }}>
              <Typography variant="h2" component="h2" gutterBottom sx={{ fontSize: "1.5rem" }}>
                Send us a message
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Fields marked with an asterisk are required. We reply as soon as the office is able.
              </Typography>
              <ContactForm />
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={3}>
              <Card>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="overline" color="text.secondary" display="block">
                    Provincial house
                  </Typography>
                  <Stack spacing={2} sx={{ mt: 1.5 }}>
                    {details.map((detail) => (
                      <Box key={detail.label} sx={{ display: "flex", gap: 1.5 }}>
                        <Box sx={{ mt: 0.25 }}>{detail.icon}</Box>
                        <Box sx={{ minWidth: 0 }}>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {detail.label}
                          </Typography>
                          {detail.href ? (
                            <Link href={detail.href} variant="body2" sx={{ wordBreak: "break-word" }}>
                              {detail.value}
                            </Link>
                          ) : (
                            <Typography variant="body2">{detail.value}</Typography>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Stack>

                  <Divider sx={{ my: 2.5 }} />

                  <Button
                    component={RouterLink}
                    to="/contact/convents"
                    variant="outlined"
                    fullWidth
                    startIcon={<ApartmentRoundedIcon />}
                  >
                    Browse the convent directory
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <Box
                  component="iframe"
                  title="Map showing the provincial house at Somajiguda, Hyderabad"
                  src="https://www.google.com/maps?q=Somajiguda+Hyderabad&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  sx={{ width: "100%", height: 280, border: 0, display: "block" }}
                />
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
