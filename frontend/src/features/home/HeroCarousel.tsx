import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Container, IconButton, Stack, Typography, useMediaQuery } from "@mui/material";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Link as RouterLink } from "react-router-dom";

interface Slide {
  eyebrow: string;
  lines: [string, string];
  body: string;
  image: string;
  /** Empty because the slide text already conveys the meaning. */
  alt: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}

const slides: Slide[] = [
  {
    eyebrow: "Congregation of Jesus Mary Joseph",
    lines: ["One Province,", "thirty-two institutions."],
    body: "Serving across Telangana, Andhra Pradesh and Madhya Pradesh through education, health care, social work and formation.",
    image: "/brand/hero-main.webp",
    alt: "",
    primary: { label: "Find an institution", href: "/institutions" },
    secondary: { label: "About the Province", href: "/who-we-are/province-profile" },
  },
  {
    eyebrow: "Since 1822",
    lines: ["An ever adaptable", "apostolic availability."],
    body: "The charism Fr. Mathias Wolff S.J. gave the sisters in Holland two centuries ago still decides where we go and what we do.",
    image: "/brand/founder.webp",
    alt: "",
    primary: { label: "Our founder", href: "/who-we-are/founder" },
    secondary: { label: "Our history", href: "/who-we-are/history" },
  },
  {
    eyebrow: "In India since 1904",
    lines: ["Schools, wards", "and villages."],
    body: "From a single lower elementary school in Guntur to hospitals, nursing colleges, social service societies and formation houses.",
    image: "/brand/hero-community.webp",
    alt: "",
    primary: { label: "What we do", href: "/ministries/education" },
    secondary: { label: "Convent directory", href: "/contact/convents" },
  },
];

const INTERVAL = 7000;

export function HeroCarousel() {
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback((next: number) => {
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }, []);

  const indexRef = useRef(index);
  indexRef.current = index;

  // Autoplay pauses on hover, on focus within, and whenever motion is reduced.
  useEffect(() => {
    if (!playing || reduceMotion) return;
    const timer = window.setInterval(() => go(indexRef.current + 1), INTERVAL);
    return () => window.clearInterval(timer);
  }, [playing, reduceMotion, go]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  };

  const slide = slides[index]!;

  return (
    <Box
      component="section"
      ref={regionRef}
      aria-roledescription="carousel"
      aria-label="Welcome"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
      onFocusCapture={() => setPlaying(false)}
      onBlurCapture={() => setPlaying(true)}
      sx={{
        position: "relative",
        overflow: "hidden",
        bgcolor: "primary.dark",
        color: "common.white",
        minHeight: { xs: 560, md: 660, lg: 720 },
        display: "grid",
        alignItems: "center",
      }}
    >
      {slides.map((item, slideIndex) => (
        <Box
          key={item.image}
          aria-hidden={slideIndex !== index}
          sx={{
            position: "absolute",
            inset: 0,
            opacity: slideIndex === index ? 1 : 0,
            transition: reduceMotion ? "none" : "opacity 1.1s ease",
            pointerEvents: "none",
          }}
        >
          <Box
            component="img"
            src={item.image}
            alt={item.alt}
            loading={slideIndex === 0 ? "eager" : "lazy"}
            fetchPriority={slideIndex === 0 ? "high" : "auto"}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: slideIndex === index && !reduceMotion ? "scale(1.06)" : "scale(1)",
              transition: reduceMotion ? "none" : "transform 9s ease-out",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(100deg, rgba(4,58,112,.94) 0%, rgba(4,58,112,.82) 42%, rgba(4,58,112,.42) 100%)",
            }}
          />
        </Box>
      ))}

      <Container sx={{ position: "relative", py: { xs: 8, md: 10 } }}>
        {/* Live region announces slide changes without moving focus. */}
        <Box aria-live="polite" aria-atomic="true" sx={{ maxWidth: 780 }}>
          <Typography variant="overline" sx={{ color: "secondary.light", display: "block", mb: 2 }}>
            {slide.eyebrow}
          </Typography>
          <Typography component="h1" sx={{ m: 0 }}>
            {slide.lines.map((line, lineIndex) => (
              <Box
                key={line}
                component="span"
                sx={{
                  display: "block",
                  fontWeight: 600,
                  fontSize: { xs: "2.25rem", sm: "3rem", md: "4rem", lg: "4.75rem" },
                  lineHeight: 1.05,
                  letterSpacing: "-0.03em",
                  color: lineIndex === 0 ? "rgba(255,255,255,.72)" : "common.white",
                }}
              >
                {line}
              </Box>
            ))}
          </Typography>
          <Typography
            sx={{
              mt: 3,
              maxWidth: 560,
              fontSize: { xs: "1.0625rem", md: "1.1875rem" },
              color: "rgba(255,255,255,.85)",
            }}
          >
            {slide.body}
          </Typography>
        </Box>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: { xs: 4, md: 5 } }}>
          <Button
            component={RouterLink}
            to={slide.primary.href}
            variant="contained"
            color="secondary"
            size="large"
            endIcon={<ArrowForwardRoundedIcon />}
          >
            {slide.primary.label}
          </Button>
          <Button
            component={RouterLink}
            to={slide.secondary.href}
            variant="outlined"
            size="large"
            sx={{
              color: "common.white",
              borderColor: "rgba(255,255,255,.5)",
              "&:hover": { borderColor: "common.white", bgcolor: "rgba(255,255,255,.1)" },
            }}
          >
            {slide.secondary.label}
          </Button>
        </Stack>

        {/* Controls */}
        <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mt: { xs: 5, md: 7 } }}>
          <IconButton
            onClick={() => go(index - 1)}
            aria-label="Previous slide"
            sx={{ color: "common.white", border: 1, borderColor: "rgba(255,255,255,.35)" }}
          >
            <ChevronLeftRoundedIcon />
          </IconButton>
          <IconButton
            onClick={() => go(index + 1)}
            aria-label="Next slide"
            sx={{ color: "common.white", border: 1, borderColor: "rgba(255,255,255,.35)" }}
          >
            <ChevronRightRoundedIcon />
          </IconButton>

          <Stack direction="row" spacing={1} sx={{ ml: 1 }}>
            {slides.map((item, slideIndex) => (
              <Box
                key={item.image}
                component="button"
                type="button"
                onClick={() => go(slideIndex)}
                aria-label={`Go to slide ${slideIndex + 1} of ${slides.length}`}
                aria-current={slideIndex === index}
                sx={{
                  width: slideIndex === index ? 40 : 14,
                  height: 6,
                  p: 0,
                  border: 0,
                  borderRadius: 3,
                  cursor: "pointer",
                  bgcolor: slideIndex === index ? "secondary.light" : "rgba(255,255,255,.4)",
                  transition: "width .3s ease, background-color .3s ease",
                }}
              />
            ))}
          </Stack>

          {!reduceMotion && (
            <IconButton
              onClick={() => setPlaying((value) => !value)}
              aria-label={playing ? "Pause slideshow" : "Play slideshow"}
              sx={{ color: "rgba(255,255,255,.75)", ml: "auto" }}
            >
              {playing ? <PauseRoundedIcon /> : <PlayArrowRoundedIcon />}
            </IconButton>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
