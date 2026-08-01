import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  InputAdornment,
  Link,
  MenuItem,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import RestartAltRoundedIcon from "@mui/icons-material/RestartAltRounded";
import { Link as RouterLink } from "react-router-dom";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/feedback/EmptyState";
import { Seo } from "@/components/seo/Seo";
import { facets, useInstitutionFilters, type SortKey } from "@/features/institutions/useInstitutions";
import { institutionImage } from "@/features/institutions/institutionImages";

const columns: { key: SortKey | null; label: string; sx?: object }[] = [
  { key: null, label: "", sx: { width: 88, p: 1 } },
  { key: "name", label: "Institution", sx: { minWidth: 240 } },
  { key: "established", label: "Established" },
  { key: "type", label: "Type" },
  { key: null, label: "Courses" },
  { key: null, label: "Medium" },
  { key: null, label: "Intake" },
];

export function InstitutionsPage() {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  const { filters, setFilters, reset, isFiltered, results, total } = useInstitutionFilters();

  return (
    <>
      <Seo
        title="Institution Directory"
        description="All institutions of JMJ Hyderabad Province with establishment year, type, courses, medium and intake."
        path="/institutions"
      />
      <PageHeader
        eyebrow="Our Presence"
        title="Institution Directory"
        description="Every institution of the Province, with establishment year, type, courses, medium and intake as recorded in the Province content."
      />

      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <Paper sx={{ p: { xs: 2, md: 3 }, mb: 3 }} component="search">
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Search institutions"
                value={filters.q}
                onChange={(event) => setFilters({ q: event.target.value })}
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
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2.5 }}>
              <TextField
                select
                fullWidth
                label="Type"
                value={filters.type}
                onChange={(event) => setFilters({ type: event.target.value })}
              >
                {facets.type.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 2 }}>
              <TextField
                select
                fullWidth
                label="Medium"
                value={filters.medium}
                onChange={(event) => setFilters({ medium: event.target.value })}
              >
                {facets.medium.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 1.75 }}>
              <TextField
                select
                fullWidth
                label="Intake"
                value={filters.intake}
                onChange={(event) => setFilters({ intake: event.target.value })}
              >
                {facets.intake.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 1.75 }}>
              <TextField
                select
                fullWidth
                label="Sort by"
                value={filters.sort}
                onChange={(event) => setFilters({ sort: event.target.value as SortKey })}
              >
                <MenuItem value="name">Name</MenuItem>
                <MenuItem value="established">Establishment year</MenuItem>
                <MenuItem value="type">Type</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
            sx={{ mt: 2 }}
          >
            <Typography color="text.secondary" variant="body2" role="status" aria-live="polite">
              Showing {results.length} of {total} institutions
            </Typography>
            {isFiltered && (
              <Button size="small" startIcon={<RestartAltRoundedIcon />} onClick={reset}>
                Reset filters
              </Button>
            )}
          </Stack>
        </Paper>

        {results.length === 0 ? (
          <EmptyState
            icon={<SearchOffRoundedIcon />}
            title="No institutions match those filters"
            description="Try a different type or medium, or clear the search to see all thirty-two."
            action={
              <Button variant="outlined" startIcon={<RestartAltRoundedIcon />} onClick={reset}>
                Reset filters
              </Button>
            }
          />
        ) : mobile ? (
          <Stack spacing={2} component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
            {results.map((item) => (
              <Card key={item.id} component="li" sx={{ overflow: "hidden" }}>
                <Box
                  component="img"
                  src={institutionImage(item.id, item.type)}
                  alt=""
                  loading="lazy"
                  sx={{ width: "100%", height: 180, objectFit: "cover", display: "block", bgcolor: "action.hover" }}
                />
                <CardContent>
                  <Link
                    component={RouterLink}
                    to={`/institutions/${item.id}`}
                    variant="h5"
                    underline="hover"
                  >
                    {item.institution}
                  </Link>
                  <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: 1.5 }}>
                    <Chip size="small" label={item.type} variant="outlined" color="primary" />
                    <Chip size="small" label={`Established ${item.established}`} />
                  </Stack>
                  <Grid container spacing={1.5} sx={{ mt: 1 }}>
                    {(
                      [
                        ["Courses", item.courses],
                        ["Medium", item.medium],
                        ["Intake", item.intake],
                      ] as const
                    ).map(([label, value]) =>
                      value && value !== "—" ? (
                        <Grid size={6} key={label}>
                          <Typography variant="caption" color="text.secondary" component="div">
                            {label}
                          </Typography>
                          <Typography variant="body2">{value}</Typography>
                        </Grid>
                      ) : null,
                    )}
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Stack>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
            <Table stickyHeader aria-label="JMJ institutions">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.label}
                      sx={column.sx}
                      sortDirection={column.key && filters.sort === column.key ? "asc" : false}
                    >
                      {column.key ? (
                        <TableSortLabel
                          active={filters.sort === column.key}
                          direction="asc"
                          onClick={() => setFilters({ sort: column.key as SortKey })}
                        >
                          {column.label}
                        </TableSortLabel>
                      ) : (
                        column.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {results.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell sx={{ p: 1 }}>
                      <Box
                        component="img"
                        src={institutionImage(item.id, item.type)}
                        alt=""
                        loading="lazy"
                        sx={{
                          width: 72,
                          height: 54,
                          objectFit: "cover",
                          borderRadius: 1.5,
                          display: "block",
                          bgcolor: "action.hover",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>
                      <Link component={RouterLink} to={`/institutions/${item.id}`} underline="hover">
                        {item.institution}
                      </Link>
                    </TableCell>
                    <TableCell>{item.established}</TableCell>
                    <TableCell>
                      <Chip size="small" label={item.type} variant="outlined" />
                    </TableCell>
                    <TableCell>{item.courses}</TableCell>
                    <TableCell>{item.medium}</TableCell>
                    <TableCell>{item.intake}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Box sx={{ mt: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Establishment years are shown as recorded in the Province content. Where sources
            conflict, the fact is listed in the content verification register and is not presented
            as settled.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
