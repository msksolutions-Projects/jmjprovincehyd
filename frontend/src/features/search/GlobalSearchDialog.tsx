import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import { groupHits, search, type SearchHit } from "./searchIndex";

export interface GlobalSearchDialogProps {
  open: boolean;
  onClose: () => void;
}

/** Wraps each occurrence of the query in a <mark> so matches are visible. */
function Highlight({ text, query }: { text: string; query: string }) {
  const q = query.trim();
  if (q.length < 2) return <>{text}</>;
  const index = text.toLowerCase().indexOf(q.toLowerCase());
  if (index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <Box component="mark" sx={{ bgcolor: "action.selected", color: "inherit", px: 0.25 }}>
        {text.slice(index, index + q.length)}
      </Box>
      {text.slice(index + q.length)}
    </>
  );
}

export function GlobalSearchDialog({ open, onClose }: GlobalSearchDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const hits = useMemo(() => search(query), [query]);
  const groups = useMemo(() => groupHits(hits), [hits]);
  const flat = useMemo(() => groups.flatMap((g) => g.items), [groups]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  const go = (hit: SearchHit) => {
    onClose();
    navigate(hit.href);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (flat.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => (i + 1) % flat.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => (i - 1 + flat.length) % flat.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      const hit = flat[activeIndex];
      if (hit) go(hit);
    }
  };

  const showEmpty = query.trim().length >= 2 && flat.length === 0;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      fullWidth
      maxWidth="sm"
      aria-labelledby="global-search-title"
      slotProps={{ paper: { sx: { alignSelf: fullScreen ? undefined : "flex-start", mt: fullScreen ? 0 : 8 } } }}
      TransitionProps={{ onEntered: () => inputRef.current?.focus() }}
    >
      <Typography id="global-search-title" variant="h6" sx={{ position: "absolute", left: -9999 }}>
        Site search
      </Typography>

      <Box sx={{ p: 2, pb: 1.5 }}>
        <TextField
          inputRef={inputRef}
          fullWidth
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search pages, ministries, institutions, convents…"
          autoComplete="off"
          slotProps={{
            htmlInput: {
              "aria-label": "Search this website",
              "aria-describedby": "global-search-status",
            },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon color="action" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Divider />

      <DialogContent sx={{ p: 0, maxHeight: { sm: 460 } }}>
        <Typography
          id="global-search-status"
          role="status"
          aria-live="polite"
          sx={{ position: "absolute", left: -9999 }}
        >
          {query.trim().length < 2
            ? "Type at least two characters to search."
            : `${flat.length} ${flat.length === 1 ? "result" : "results"} found.`}
        </Typography>

        {query.trim().length < 2 && (
          <Stack spacing={1} sx={{ px: 3, py: 5, textAlign: "center" }}>
            <Typography color="text.secondary" variant="body2">
              Search across pages, ministries, all 32 institutions and the convent directory.
            </Typography>
          </Stack>
        )}

        {showEmpty && (
          <Stack spacing={1.5} alignItems="center" sx={{ px: 3, py: 5, textAlign: "center" }}>
            <SearchOffRoundedIcon sx={{ fontSize: 36, color: "text.secondary", opacity: 0.6 }} />
            <Typography variant="subtitle1">No matches for “{query.trim()}”</Typography>
            <Typography variant="body2" color="text.secondary">
              Try a place name, an institution, or a ministry such as “education”.
            </Typography>
          </Stack>
        )}

        {groups.map((group) => (
          <Box key={group.group}>
            <Typography
              variant="overline"
              component="h2"
              sx={{ px: 2.5, pt: 2, pb: 0.5, display: "block", color: "text.secondary" }}
            >
              {group.group}
            </Typography>
            <List dense disablePadding>
              {group.items.map((hit) => {
                const index = flat.indexOf(hit);
                return (
                  <ListItemButton
                    key={hit.id}
                    selected={index === activeIndex}
                    onClick={() => go(hit)}
                    onMouseEnter={() => setActiveIndex(index)}
                    sx={{ px: 2.5, py: 1 }}
                  >
                    <ListItemText
                      primary={<Highlight text={hit.title} query={query} />}
                      secondary={hit.detail}
                      slotProps={{
                        primary: { fontWeight: 600 },
                        secondary: { noWrap: true, variant: "caption" },
                      }}
                    />
                  </ListItemButton>
                );
              })}
            </List>
          </Box>
        ))}
      </DialogContent>

      <Divider />
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{ px: 2, py: 1.25, display: { xs: "none", sm: "flex" } }}
      >
        <Chip size="small" variant="outlined" label="↑ ↓ to navigate" />
        <Chip size="small" variant="outlined" label="Enter to open" />
        <Chip size="small" variant="outlined" label="Esc to close" />
      </Stack>
    </Dialog>
  );
}
