import { useCallback, useEffect, useRef, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { navigation } from "@/data/navigation";
import { navIcons } from "@/components/layout/navIcons";
import { site } from "@/data/site";
import { GlobalSearchDialog } from "@/features/search/GlobalSearchDialog";
import { useSearchShortcut } from "@/features/search/useSearchShortcut";

function ContactStrip() {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        display: { xs: "none", md: "block" },
      }}
    >
      <Container>
        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 0.75 }}
        >
          <Stack direction="row" spacing={2.5} alignItems="center">
            <Typography variant="caption" sx={{ display: "flex", gap: 0.6, alignItems: "center" }}>
              <LocationOnOutlinedIcon sx={{ fontSize: 16 }} /> Somajiguda, Hyderabad
            </Typography>
            <Link
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              color="inherit"
              variant="caption"
              sx={{ display: "flex", gap: 0.6, alignItems: "center", fontWeight: 400 }}
            >
              <PhoneOutlinedIcon sx={{ fontSize: 16 }} /> {site.phone}
            </Link>
            <Link
              href={`mailto:${site.email}`}
              color="inherit"
              variant="caption"
              sx={{ display: "flex", gap: 0.6, alignItems: "center", fontWeight: 400 }}
            >
              <EmailOutlinedIcon sx={{ fontSize: 16 }} /> {site.email}
            </Link>
          </Stack>
          <Typography variant="caption" sx={{ opacity: 0.85 }}>
            Office hours: 08:00&ndash;18:00, Monday to Saturday
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export function SiteHeader() {
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [menuIndex, setMenuIndex] = useState<number | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const menuButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  useSearchShortcut(openSearch);

  // Close every transient surface when the route changes.
  useEffect(() => {
    setDrawerOpen(false);
    setMenuAnchor(null);
    setMenuIndex(null);
  }, [location.pathname, location.search]);

  const closeMenu = () => {
    const index = menuIndex;
    setMenuAnchor(null);
    setMenuIndex(null);
    if (index !== null) menuButtonRefs.current[index]?.focus();
  };

  const isActiveGroup = (group: (typeof navigation)[number]) =>
    (group.items ?? []).some((item) => {
      const base = item.href.split("?")[0] ?? "";
      return base !== "/" && location.pathname.startsWith(base);
    });

  return (
    <>
      <ContactStrip />

      <AppBar
        position="sticky"
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "rgba(255,255,255,.96)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Container>
          <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 }, gap: 2 }}>
            <Link
              component={RouterLink}
              to="/"
              underline="none"
              color="inherit"
              sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}
              aria-label={`${site.name} — home`}
            >
              <Box
                component="img"
                src="/brand/jmj-logo.png"
                alt=""
                sx={{ width: 44, height: 44, objectFit: "contain" }}
              />
              <Box sx={{ minWidth: 0 }}>
                <Typography
                  variant="h6"
                  color="primary.main"
                  noWrap
                  sx={{ lineHeight: 1.15, fontSize: { xs: "1rem", md: "1.0625rem" } }}
                >
                  {site.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  Congregation of Jesus Mary Joseph
                </Typography>
              </Box>
            </Link>

            <Box sx={{ flex: 1 }} />

            <Box
              component="nav"
              aria-label="Main"
              sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center" }}
            >
              {navigation.map((group, index) => {
                const open = menuIndex === index;
                return (
                  <Button
                    key={group.label}
                    ref={(element) => {
                      menuButtonRefs.current[index] = element;
                    }}
                    color="inherit"
                    aria-expanded={open}
                    aria-haspopup="true"
                    aria-controls={open ? `nav-menu-${index}` : undefined}
                    onClick={(event) => {
                      setMenuAnchor(event.currentTarget);
                      setMenuIndex(index);
                    }}
                    endIcon={<ExpandMoreRoundedIcon />}
                    sx={{
                      px: 1.25,
                      whiteSpace: "nowrap",
                      color: isActiveGroup(group) ? "primary.main" : "text.primary",
                      fontWeight: isActiveGroup(group) ? 700 : 600,
                    }}
                  >
                    {group.label}
                  </Button>
                );
              })}
            </Box>

            <Tooltip title="Search (Ctrl + K)">
              <IconButton onClick={openSearch} aria-label="Open search" sx={{ ml: 0.5 }}>
                <SearchRoundedIcon />
              </IconButton>
            </Tooltip>

            <IconButton
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              sx={{ display: { lg: "none" } }}
            >
              <MenuRoundedIcon />
            </IconButton>
          </Toolbar>
        </Container>

        {menuIndex !== null && (
          <Menu
            id={`nav-menu-${menuIndex}`}
            anchorEl={menuAnchor}
            open={Boolean(menuAnchor)}
            onClose={closeMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
            slotProps={{
              paper: {
                sx: {
                  mt: 0.5,
                  p: 1.5,
                  width: { md: 640, lg: 720 },
                  maxWidth: "calc(100vw - 32px)",
                  "& .MuiList-root": {
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                    gap: 0.5,
                  },
                },
              },
            }}
          >
            {(navigation[menuIndex]?.items ?? []).map((item) => {
              const Icon = item.icon ? navIcons[item.icon] : null;
              return (
                <MenuItem
                  key={item.href}
                  component={RouterLink}
                  to={item.href}
                  onClick={closeMenu}
                  selected={location.pathname === item.href}
                  sx={{
                    py: 1.5,
                    px: 1.5,
                    gap: 1.75,
                    borderRadius: 2,
                    alignItems: "flex-start",
                    whiteSpace: "normal",
                    "&:hover .nav-explore": { opacity: 1, transform: "translate(2px,-2px)" },
                  }}
                >
                  {Icon && (
                    <Box
                      sx={{
                        flexShrink: 0,
                        width: 40,
                        height: 40,
                        borderRadius: 1.5,
                        display: "grid",
                        placeItems: "center",
                        bgcolor: "action.selected",
                        color: "primary.main",
                      }}
                    >
                      <Icon fontSize="small" />
                    </Box>
                  )}
                  <ListItemText
                    primary={item.label}
                    secondary={item.description}
                    slotProps={{
                      primary: { fontWeight: 600, variant: "body1" },
                      secondary: { variant: "caption" },
                    }}
                  />
                  <ArrowOutwardRoundedIcon
                    className="nav-explore"
                    fontSize="small"
                    sx={{
                      mt: 0.5,
                      color: "secondary.main",
                      opacity: 0,
                      transition: "opacity .18s ease, transform .18s ease",
                    }}
                  />
                </MenuItem>
              );
            })}
          </Menu>
        )}
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{ paper: { sx: { width: { xs: "100%", sm: 380 } } } }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2 }}>
          <Typography variant="h6" color="primary.main">
            {site.name}
          </Typography>
          <IconButton onClick={() => setDrawerOpen(false)} aria-label="Close navigation menu">
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <Divider />

        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<SearchRoundedIcon />}
            onClick={() => {
              setDrawerOpen(false);
              openSearch();
            }}
          >
            Search this website
          </Button>
        </Box>

        <List component="nav" aria-label="Main" sx={{ px: 1, flex: 1, overflowY: "auto" }}>
          <ListItemButton component={RouterLink} to="/" sx={{ borderRadius: 2, minHeight: 48 }}>
            <ListItemText primary="Home" slotProps={{ primary: { fontWeight: 600 } }} />
          </ListItemButton>

          {navigation.map((group) => {
            const open = openMobileGroup === group.label;
            return (
              <Box key={group.label}>
                <ListItemButton
                  onClick={() => setOpenMobileGroup(open ? null : group.label)}
                  aria-expanded={open}
                  sx={{ borderRadius: 2, minHeight: 48 }}
                >
                  <ListItemText primary={group.label} slotProps={{ primary: { fontWeight: 600 } }} />
                  {open ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
                </ListItemButton>
                <Collapse in={open} unmountOnExit>
                  <List disablePadding sx={{ pl: 1.5 }}>
                    {(group.items ?? []).map((item) => {
                      const Icon = item.icon ? navIcons[item.icon] : null;
                      return (
                        <ListItemButton
                          key={item.href}
                          component={RouterLink}
                          to={item.href}
                          sx={{ borderRadius: 2, minHeight: 48, gap: 1.75 }}
                        >
                          {Icon && (
                            <Box
                              sx={{
                                width: 34,
                                height: 34,
                                borderRadius: 1.5,
                                display: "grid",
                                placeItems: "center",
                                bgcolor: "action.selected",
                                color: "primary.main",
                                flexShrink: 0,
                              }}
                            >
                              <Icon sx={{ fontSize: 18 }} />
                            </Box>
                          )}
                          <ListItemText
                            primary={item.label}
                            slotProps={{ primary: { variant: "body2", fontWeight: 500 } }}
                          />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </Box>
            );
          })}
        </List>

        <Divider />
        <Stack spacing={0.5} sx={{ p: 2 }}>
          <Link href={`tel:${site.phone.replace(/\s/g, "")}`} variant="body2">
            {site.phone}
          </Link>
          <Link href={`mailto:${site.email}`} variant="body2">
            {site.email}
          </Link>
        </Stack>
      </Drawer>

      <GlobalSearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
