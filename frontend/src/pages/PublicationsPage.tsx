import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import SearchOffRoundedIcon from "@mui/icons-material/SearchOffRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { LoadingSkeleton } from "@/components/feedback/LoadingSkeleton";
import { Seo } from "@/components/seo/Seo";
import { fetchPublications, formatBytes } from "@/features/publications/publications.service";

export function PublicationsPage() {
  const [query, setQuery] = useState("");

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["publications"],
    queryFn: ({ signal }) => fetchPublications(signal),
  });

  const filtered = useMemo(() => {
    if (!data) return [];
    const term = query.trim().toLowerCase();
    return term ? data.filter((item) => item.title.toLowerCase().includes(term)) : data;
  }, [data, query]);

  return (
    <>
      <Seo
        title="Publications"
        description="News Strings, reflections and spirituality resources published by JMJ Hyderabad Province."
        path="/publications"
      />
      <PageHeader
        eyebrow="Media"
        title="Publications"
        description="News Strings, reflections and spirituality resources from the Province archive."
        breadcrumbs={[{ label: "Media", href: "/gallery" }]}
      />

      <Container sx={{ py: { xs: 4, md: 6 } }}>
        <TextField
          fullWidth
          label="Search publications"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
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
          <Stack sx={{ mt: 3 }}>
            <LoadingSkeleton rows={6} height={140} />
          </Stack>
        )}

        {isError && (
          <Stack sx={{ mt: 3 }}>
            <ErrorState
              title="Publications did not load"
              message={(error as Error).message}
              onRetry={() => void refetch()}
            />
          </Stack>
        )}

        {data && (
          <>
            <Typography color="text.secondary" sx={{ my: 2.5 }} role="status" aria-live="polite">
              {filtered.length} {filtered.length === 1 ? "publication" : "publications"}
            </Typography>

            {filtered.length === 0 ? (
              <EmptyState
                icon={<SearchOffRoundedIcon />}
                title="No publications match that search"
                description="Try a shorter term, or clear the search to see everything in the archive."
                action={
                  <Button variant="outlined" onClick={() => setQuery("")}>
                    Clear search
                  </Button>
                }
              />
            ) : (
              <Grid container spacing={3} component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                {filtered.map((item) => (
                  <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={item.file} component="li">
                    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
                      <CardContent sx={{ p: 3, flex: 1 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                          <PictureAsPdfRoundedIcon color="secondary" sx={{ fontSize: 38 }} />
                          <Typography variant="caption" color="text.secondary">
                            PDF · {formatBytes(item.bytes)}
                          </Typography>
                        </Stack>
                        <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
                          {item.title}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ px: 3, pb: 3, gap: 1 }}>
                        <Button
                          component="a"
                          href={item.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="contained"
                          size="small"
                          endIcon={<OpenInNewRoundedIcon />}
                        >
                          View
                        </Button>
                        <Button
                          component="a"
                          href={item.file}
                          download
                          size="small"
                          startIcon={<DownloadRoundedIcon />}
                        >
                          Download
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </>
        )}
      </Container>
    </>
  );
}
