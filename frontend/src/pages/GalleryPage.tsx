import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Chip,
  Container,
  Dialog,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  InputAdornment,
  Skeleton,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import BrokenImageRoundedIcon from "@mui/icons-material/BrokenImageRounded";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { Seo } from "@/components/seo/Seo";
import { fetchGallery, type GalleryImage } from "@/features/gallery/gallery.service";

const PAGE_SIZE = 48;

/** Thumbnail that degrades to a labelled tile rather than a torn-image icon. */
function Thumbnail({ image }: { image: GalleryImage }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <Box
        role="img"
        aria-label={image.alt}
        sx={{
          width: "100%",
          aspectRatio: "4 / 3",
          display: "grid",
          placeItems: "center",
          bgcolor: "action.hover",
          color: "text.secondary",
        }}
      >
        <BrokenImageRoundedIcon />
      </Box>
    );
  }
  return (
    <img
      src={image.thumbnail}
      alt={image.alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
    />
  );
}

export function GalleryPage() {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down("sm"));
  const medium = useMediaQuery(theme.breakpoints.down("md"));

  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(PAGE_SIZE);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["gallery"],
    queryFn: ({ signal }) => fetchGallery(signal),
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    const term = query.trim().toLowerCase();
    return data.images.filter(
      (image) =>
        (category === "all" || image.category === category) &&
        (!term || `${image.title} ${image.categoryLabel}`.toLowerCase().includes(term)),
    );
  }, [data, category, query]);

  const visible = filtered.slice(0, limit);
  const active = activeIndex === null ? null : (filtered[activeIndex] ?? null);

  const step = useCallback(
    (delta: number) => {
      setActiveIndex((current) => {
        if (current === null || filtered.length === 0) return current;
        return (current + delta + filtered.length) % filtered.length;
      });
    },
    [filtered.length],
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex, step]);

  const resetPaging = () => setLimit(PAGE_SIZE);

  return (
    <>
      <Seo
        title="Photo Gallery"
        description="Photographs from formation, ministries, leadership, jubilees, chapters, institutions and community life across JMJ Hyderabad Province."
        path="/gallery"
      />
      <PageHeader
        eyebrow="Media"
        title="Photo Gallery"
        description="Photographs from formation, ministries, leadership, jubilees, chapters and community life."
        breadcrumbs={[{ label: "Media", href: "/gallery" }]}
      />

      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <TextField
          fullWidth
          label="Search photographs"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            resetPaging();
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        {isPending && (
          <Box sx={{ mt: 3 }} aria-busy="true" aria-live="polite" aria-label="Loading photographs">
            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
              {Array.from({ length: 5 }, (_, index) => (
                <Skeleton key={index} variant="rounded" width={120} height={32} />
              ))}
            </Stack>
            <ImageList cols={small ? 1 : medium ? 2 : 4} gap={12}>
              {Array.from({ length: 8 }, (_, index) => (
                <ImageListItem key={index}>
                  <Skeleton variant="rectangular" sx={{ width: "100%", aspectRatio: "4 / 3" }} />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        )}

        {isError && (
          <Box sx={{ mt: 3 }}>
            <ErrorState
              title="The gallery did not load"
              message={(error as Error).message}
              onRetry={() => void refetch()}
            />
          </Box>
        )}

        {data && (
          <>
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ my: 3 }}>
              <Chip
                label={`All (${data.images.length})`}
                onClick={() => {
                  setCategory("all");
                  resetPaging();
                }}
                color={category === "all" ? "primary" : "default"}
                variant={category === "all" ? "filled" : "outlined"}
              />
              {data.categories
                .filter((item) => item.count > 0)
                .map((item) => (
                  <Chip
                    key={item.id}
                    label={`${item.label} (${item.count})`}
                    onClick={() => {
                      setCategory(item.id);
                      resetPaging();
                    }}
                    color={category === item.id ? "primary" : "default"}
                    variant={category === item.id ? "filled" : "outlined"}
                  />
                ))}
            </Stack>

            <Typography color="text.secondary" sx={{ mb: 2 }} role="status" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "photograph" : "photographs"}
            </Typography>

            {filtered.length === 0 ? (
              <EmptyState
                icon={<SearchOffRoundedIcon />}
                title="No photographs match that search"
                description="Try a different category, or clear the search to see the whole archive."
                action={
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setQuery("");
                      setCategory("all");
                      resetPaging();
                    }}
                  >
                    Clear filters
                  </Button>
                }
              />
            ) : (
              <>
                <ImageList cols={small ? 1 : medium ? 2 : 4} gap={12} sx={{ m: 0 }}>
                  {visible.map((image, index) => (
                    <ImageListItem
                      key={image.id}
                      component="button"
                      onClick={() => setActiveIndex(index)}
                      sx={{
                        cursor: "pointer",
                        overflow: "hidden",
                        borderRadius: 2,
                        border: 1,
                        borderColor: "divider",
                        bgcolor: "background.paper",
                        p: 0,
                        aspectRatio: "4 / 3",
                      }}
                    >
                      <Thumbnail image={image} />
                      <ImageListItemBar
                        title={image.title}
                        subtitle={image.categoryLabel}
                        sx={{ background: "linear-gradient(transparent, rgba(6,71,137,.9))" }}
                      />
                    </ImageListItem>
                  ))}
                </ImageList>

                {limit < filtered.length && (
                  <Box sx={{ textAlign: "center", mt: 4 }}>
                    <Button variant="outlined" onClick={() => setLimit((value) => value + PAGE_SIZE)}>
                      Load more photographs ({filtered.length - limit} remaining)
                    </Button>
                  </Box>
                )}
              </>
            )}
          </>
        )}
      </Container>

      <Dialog
        open={active !== null}
        onClose={() => setActiveIndex(null)}
        maxWidth="lg"
        fullWidth
        aria-label="Photograph viewer"
      >
        {active && (
          <Box sx={{ position: "relative", bgcolor: "#0D1B2A" }}>
            <IconButton
              aria-label="Close viewer"
              onClick={() => setActiveIndex(null)}
              sx={{
                position: "absolute",
                right: 12,
                top: 12,
                zIndex: 1,
                bgcolor: "rgba(255,255,255,.92)",
                "&:hover": { bgcolor: "#fff" },
              }}
            >
              <CloseRoundedIcon />
            </IconButton>

            <IconButton
              aria-label="Previous photograph"
              onClick={() => step(-1)}
              sx={{
                position: "absolute",
                left: 12,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                bgcolor: "rgba(255,255,255,.85)",
                "&:hover": { bgcolor: "#fff" },
              }}
            >
              <ChevronLeftRoundedIcon />
            </IconButton>

            <IconButton
              aria-label="Next photograph"
              onClick={() => step(1)}
              sx={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1,
                bgcolor: "rgba(255,255,255,.85)",
                "&:hover": { bgcolor: "#fff" },
              }}
            >
              <ChevronRightRoundedIcon />
            </IconButton>

            <Box
              component="img"
              src={active.src}
              alt={active.alt}
              sx={{ width: "100%", maxHeight: "78vh", objectFit: "contain", display: "block" }}
            />
            <Box sx={{ px: 3, py: 2, bgcolor: "background.paper" }}>
              <Typography variant="h6">{active.title}</Typography>
              <Typography color="text.secondary" variant="body2">
                {active.categoryLabel}
                {activeIndex !== null && ` · ${activeIndex + 1} of ${filtered.length}`}
              </Typography>
            </Box>
          </Box>
        )}
      </Dialog>
    </>
  );
}
