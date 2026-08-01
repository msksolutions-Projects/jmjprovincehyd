import { useMemo, useState } from "react";
import { Box, Card, CardContent, Chip, Container, Grid, InputAdornment, Link, MenuItem, Stack, TextField, Typography } from "@mui/material";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { PageHeader } from "@/components/common/PageHeader";
import directoryData from "@/data/directory.json";
import type { DirectoryEntry } from "@/types/content";

const entries = directoryData as DirectoryEntry[];

export function DirectoryPage() {
  const [query, setQuery] = useState("");
  const [state, setState] = useState("All");
  const states = useMemo(() => ["All", ...Array.from(new Set(entries.map(item => item.state).filter(Boolean))).sort()], []);
  const filtered = useMemo(() => entries.filter(item => (state === "All" || item.state === state) && `${item.title} ${item.address} ${item.emails.join(" ")}`.toLowerCase().includes(query.toLowerCase())), [query, state]);
  return (
    <>
      <PageHeader eyebrow="Get in Touch" title="Convent Directory" description="Search JMJ communities and institutions by location, state, phone number or email address." />
      <Container sx={{ py: { xs: 4, md: 7 } }}>
        <Grid container spacing={2} sx={{ mb: 4 }}><Grid item xs={12} md={8}><TextField fullWidth label="Search locations" value={query} onChange={(e) => setQuery(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchRoundedIcon /></InputAdornment> }} /></Grid><Grid item xs={12} md={4}><TextField select fullWidth label="State" value={state} onChange={(e) => setState(e.target.value)}>{states.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}</TextField></Grid></Grid>
        <Typography color="text.secondary" sx={{ mb: 2 }}>{filtered.length} locations</Typography>
        <Grid container spacing={3}>
          {filtered.map(item => <Grid item xs={12} md={6} lg={4} key={item.title}><Card sx={{ height: "100%" }}><CardContent sx={{ p: 3 }}><Stack direction="row" justifyContent="space-between" gap={1}><Typography variant="h6">{item.location}</Typography>{item.state && <Chip label={item.state} size="small" color="primary" variant="outlined" />}</Stack><Stack spacing={1.25} sx={{ mt: 2 }}><Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}><LocationOnRoundedIcon color="secondary" fontSize="small" /><Typography variant="body2">{item.address || item.lines[0]}</Typography></Box>{item.phones.map(phone => <Box key={phone} sx={{ display: "flex", gap: 1 }}><PhoneRoundedIcon color="secondary" fontSize="small" /><Typography variant="body2">{phone}</Typography></Box>)}{item.emails.map(email => <Box key={email} sx={{ display: "flex", gap: 1, minWidth: 0 }}><EmailRoundedIcon color="secondary" fontSize="small" /><Link href={`mailto:${email}`} variant="body2" sx={{ wordBreak: "break-word" }}>{email}</Link></Box>)}{item.founded && <Box sx={{ display: "flex", gap: 1 }}><CalendarMonthRoundedIcon color="secondary" fontSize="small" /><Typography variant="body2">Founded: {item.founded}</Typography></Box>}</Stack></CardContent></Card></Grid>)}
        </Grid>
      </Container>
    </>
  );
}
