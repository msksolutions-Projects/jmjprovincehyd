import { Box, Button, Container, Divider, Link, Stack, Typography } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PrintOutlinedIcon from "@mui/icons-material/PrintOutlined";
import { Link as RouterLink } from "react-router-dom";
import { navigation } from "@/data/navigation";
import { site } from "@/data/site";

const contactRows = [
  { icon: LocationOnOutlinedIcon, text: site.address },
  { icon: PhoneOutlinedIcon, text: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  {
    icon: PhoneOutlinedIcon,
    text: site.alternatePhone,
    href: `tel:${site.alternatePhone.replace(/\s/g, "")}`,
  },
  { icon: PrintOutlinedIcon, text: site.fax },
  { icon: EmailOutlinedIcon, text: site.email, href: `mailto:${site.email}` },
];

export function SiteFooter() {
  return (
    <Box component="footer" sx={{ bgcolor: "primary.dark", color: "common.white", mt: 0 }}>
      {/* Closing invitation, sitting above the link columns. */}
      <Box sx={{ borderBottom: 1, borderColor: "rgba(255,255,255,.14)" }}>
        <Container sx={{ py: { xs: 6, md: 8 } }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", md: "center" }}
          >
            <Box>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "1.5rem", md: "2rem" }, lineHeight: 1.2, maxWidth: 620 }}
              >
                Wherever the need is greatest, we are ready to go.
              </Typography>
              <Typography sx={{ mt: 1.5, color: "rgba(255,255,255,.72)" }}>
                {site.fullName}
              </Typography>
            </Box>
            <Button
              component={RouterLink}
              to="/contact"
              variant="contained"
              color="secondary"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{ flexShrink: 0 }}
            >
              Contact us
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container sx={{ py: { xs: 6, md: 8 } }}>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 5, md: 4 },
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              lg: "1.4fr repeat(3, 1fr) 1.3fr",
            },
          }}
        >
          {/* Stacked brand block */}
          <Box>
            <Stack spacing={2} alignItems="flex-start">
              <Box
                component="img"
                src="/brand/jmj-logo.png"
                alt="JMJ Hyderabad Province"
                sx={{ width: 72, height: 72, bgcolor: "common.white", borderRadius: 2, p: 0.75 }}
              />
              <Box>
                <Typography variant="h5">{site.name}</Typography>
                <Typography variant="body2" sx={{ color: "rgba(255,255,255,.7)", mt: 0.5 }}>
                  Congregation of Jesus Mary Joseph
                </Typography>
              </Box>
              <Typography
                sx={{ color: "rgba(255,255,255,.68)", fontStyle: "italic", maxWidth: 300, mt: 1 }}
              >
                “An ever adaptable apostolic availability”
              </Typography>
            </Stack>
          </Box>

          {/* Link columns, generated from the same IA the header uses */}
          {navigation
            .filter((group) => group.label !== "Contact")
            .slice(0, 3)
            .map((group) => (
              <Box key={group.label} component="nav" aria-label={group.label}>
                <Typography variant="overline" sx={{ color: "rgba(255,255,255,.6)", display: "block" }}>
                  {group.label}
                </Typography>
                <Stack spacing={1.25} sx={{ mt: 2 }}>
                  {(group.items ?? []).map((item) => (
                    <Link
                      key={item.href}
                      component={RouterLink}
                      to={item.href}
                      color="inherit"
                      underline="hover"
                      sx={{ color: "rgba(255,255,255,.82)", fontWeight: 400, fontSize: "0.9375rem" }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </Stack>
              </Box>
            ))}

          {/* Contact column */}
          <Box>
            <Typography variant="overline" sx={{ color: "rgba(255,255,255,.6)", display: "block" }}>
              Provincial House
            </Typography>
            <Stack spacing={1.5} sx={{ mt: 2 }} component="address" fontStyle="normal">
              {contactRows.map(({ icon: Icon, text, href }) => (
                <Stack direction="row" spacing={1.25} key={text} alignItems="flex-start">
                  <Icon sx={{ fontSize: 18, mt: 0.25, color: "secondary.light", flexShrink: 0 }} />
                  {href ? (
                    <Link
                      href={href}
                      color="inherit"
                      underline="hover"
                      sx={{ color: "rgba(255,255,255,.82)", fontWeight: 400, fontSize: "0.9375rem" }}
                    >
                      {text}
                    </Link>
                  ) : (
                    <Typography sx={{ color: "rgba(255,255,255,.82)", fontSize: "0.9375rem" }}>
                      {text}
                    </Typography>
                  )}
                </Stack>
              ))}
            </Stack>
          </Box>
        </Box>

        <Divider sx={{ my: { xs: 4, md: 5 }, borderColor: "rgba(255,255,255,.14)" }} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Typography variant="body2" sx={{ color: "rgba(255,255,255,.6)" }}>
            © {new Date().getFullYear()} {site.fullName}. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            <Link
              component={RouterLink}
              to="/contact/convents"
              color="inherit"
              underline="hover"
              variant="body2"
              sx={{ color: "rgba(255,255,255,.6)", fontWeight: 400 }}
            >
              Convent Directory
            </Link>
            <Link
              component={RouterLink}
              to="/institutions"
              color="inherit"
              underline="hover"
              variant="body2"
              sx={{ color: "rgba(255,255,255,.6)", fontWeight: 400 }}
            >
              Institutions
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
