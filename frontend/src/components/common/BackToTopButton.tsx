import { useEffect, useState } from "react";
import { Fab, Zoom, useMediaQuery, useTheme } from "@mui/material";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";

export function BackToTopButton() {
  const theme = useTheme();
  const reduceMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setVisible(window.scrollY > 600));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <Zoom in={visible}>
      <Fab
        color="primary"
        size="medium"
        aria-label="Back to top"
        onClick={() =>
          window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })
        }
        sx={{
          position: "fixed",
          right: { xs: 16, md: 28 },
          bottom: { xs: 16, md: 28 },
          zIndex: theme.zIndex.speedDial,
        }}
      >
        <KeyboardArrowUpRoundedIcon />
      </Fab>
    </Zoom>
  );
}
