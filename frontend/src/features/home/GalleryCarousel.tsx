import { useCallback, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Button, Container, IconButton, Skeleton, Stack, Typography } from "@mui/material";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { Link as RouterLink } from "react-router-dom";
import { fetchGallery } from "@/features/gallery/gallery.service";

/**
 * Horizontal photo rail. Scroll-snap does the work, so it stays swipeable on
 * touch, scrollable with a trackpad and reachable by keyboard — the arrows are
 * an enhancement rather than the only way through.
 */
export function GalleryCarousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const { data, isPending } = useQuery({
    queryKey: ["gallery"],
    queryFn: ({ signal }) => fetchGallery(signal),
  });

  const onScroll = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setAtStart(rail.scrollLeft < 8);
    setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 8);
  }, []);

  const scrollBy = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.round(rail.clientWidth * 0.85), behavior: "smooth" });
  };

  // One photograph per category, so the rail shows the breadth of the work.
  const picks = data
    ? Object.values(
        data.images.reduce<Record<string, (typeof data.images)[number]>>((acc, image) => {
          if (!acc[image.category]) acc[image.category] = image;
          return acc;
        }, {}),
      )
    : [];

  return (
    <Box component="section" sx={{ py: { xs: 7, md: 11 }, bgcolor: "background.default" }}>
      <Container>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "flex-end" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Box sx={{ maxWidth: 620 }}>
            <Typography variant="overline" color="secondary.main" sx={{ display: "block", mb: 1.5 }}>
              Photo gallery
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "1.75rem", md: "2.5rem" }, lineHeight: 1.18 }}>
              Two centuries of work, photographed.
            </Typography>
          </Box>

          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={() => scrollBy(-1)}
              disabled={atStart}
              aria-label="Scroll photographs left"
              sx={{ border: 1, borderColor: "divider" }}
            >
              <ChevronLeftRoundedIcon />
            </IconButton>
            <IconButton
              onClick={() => scrollBy(1)}
              disabled={atEnd}
              aria-label="Scroll photographs right"
              sx={{ border: 1, borderColor: "divider" }}
            >
              <ChevronRightRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Container>

      <Box
        ref={railRef}
        onScroll={onScroll}
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          px: { xs: 2.5, md: 4 },
          pb: 2,
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {isPending
          ? Array.from({ length: 6 }, (_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                sx={{ flexShrink: 0, width: { xs: 260, md: 340 }, height: { xs: 200, md: 250 } }}
              />
            ))
          : picks.map((image) => (
              <Box
                key={image.id}
                component={RouterLink}
                to="/gallery"
                sx={{
                  position: "relative",
                  flexShrink: 0,
                  width: { xs: 260, md: 340 },
                  height: { xs: 200, md: 250 },
                  borderRadius: 3,
                  overflow: "hidden",
                  scrollSnapAlign: "start",
                  textDecoration: "none",
                  bgcolor: "action.hover",
                  "&:hover img": { transform: "scale(1.05)" },
                }}
              >
                <Box
                  component="img"
                  src={image.thumbnail}
                  alt={image.alt}
                  loading="lazy"
                  decoding="async"
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform .6s ease",
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "flex-end",
                    p: 2,
                    background: "linear-gradient(transparent 45%, rgba(4,58,112,.92))",
                  }}
                >
                  <Typography sx={{ color: "common.white", fontWeight: 600, fontSize: "0.9375rem" }}>
                    {image.categoryLabel}
                  </Typography>
                </Box>
              </Box>
            ))}
      </Box>

      <Container sx={{ mt: 3 }}>
        <Button component={RouterLink} to="/gallery" endIcon={<ArrowForwardRoundedIcon />} size="large">
          View all photographs
        </Button>
      </Container>
    </Box>
  );
}
