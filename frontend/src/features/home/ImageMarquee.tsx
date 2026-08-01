import { useEffect, useMemo, useState } from "react";
import { Box } from "@mui/material";
import { fetchGallery, type GalleryImage } from "@/features/gallery/gallery.service";

/**
 * Two counter-scrolling bands of photographs from the Province archive.
 * Purely decorative — hidden from assistive technology, and frozen entirely
 * when the visitor prefers reduced motion.
 */
function Row({
  images,
  reverse = false,
  duration = 90,
}: {
  images: GalleryImage[];
  reverse?: boolean;
  duration?: number;
}) {
  // Duplicated once so the translate loop has no visible seam.
  const strip = [...images, ...images];

  return (
    <Box sx={{ overflow: "hidden", py: 0.75 }}>
      <Box
        sx={{
          display: "flex",
          gap: 1.5,
          width: "max-content",
          animation: `${reverse ? "jmj-marquee-reverse" : "jmj-marquee"} ${duration}s linear infinite`,
          "@keyframes jmj-marquee": {
            from: { transform: "translateX(0)" },
            to: { transform: "translateX(-50%)" },
          },
          "@keyframes jmj-marquee-reverse": {
            from: { transform: "translateX(-50%)" },
            to: { transform: "translateX(0)" },
          },
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      >
        {strip.map((image, index) => (
          <Box
            key={`${image.id}-${index}`}
            component="img"
            src={image.thumbnail}
            alt=""
            loading="lazy"
            decoding="async"
            sx={{
              height: { xs: 116, sm: 150, md: 186 },
              width: "auto",
              maxWidth: 300,
              objectFit: "cover",
              borderRadius: 2,
              flexShrink: 0,
              bgcolor: "action.hover",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

export function ImageMarquee() {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetchGallery(controller.signal)
      .then((data) => setImages(data.images))
      .catch(() => setImages([]));
    return () => controller.abort();
  }, []);

  // A spread across categories reads better than 24 photos of one event.
  const picks = useMemo(() => {
    if (images.length === 0) return { top: [], bottom: [] };
    const byCategory = new Map<string, GalleryImage[]>();
    for (const image of images) {
      const bucket = byCategory.get(image.category) ?? [];
      if (bucket.length < 4) bucket.push(image);
      byCategory.set(image.category, bucket);
    }
    const spread = [...byCategory.values()].flat();
    return { top: spread.slice(0, 14), bottom: spread.slice(14, 28) };
  }, [images]);

  if (picks.top.length === 0) return null;

  return (
    <Box aria-hidden="true" sx={{ bgcolor: "background.default", py: { xs: 3, md: 5 } }}>
      <Row images={picks.top} duration={95} />
      {picks.bottom.length > 0 && <Row images={picks.bottom} reverse duration={110} />}
    </Box>
  );
}
