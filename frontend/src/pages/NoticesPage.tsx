import { useQuery } from "@tanstack/react-query";
import {
  Box, Container, Typography, Card, CardContent, Chip, Stack,
  CircularProgress, Alert,
} from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { Seo } from "@/components/seo/Seo";
import { fetchPublishedNotices } from "@/features/notices/notices.service";

const urgencyColor = (u: string) =>
  u === "critical" ? "error" : u === "high" ? "warning" : u === "medium" ? "info" : "default";

export function NoticesPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["public-notices"],
    queryFn: fetchPublishedNotices,
  });

  return (
    <>
      <Seo title="Notices" description="Announcements and notices from JMJ Hyderabad Province" />
      <PageHeader
        eyebrow="Media"
        title="Notices"
        description="Important announcements from the province."
      />
      <Container sx={{ py: 5 }}>
        {isLoading && (
          <Box sx={{ textAlign: "center", py: 6 }}><CircularProgress /></Box>
        )}

        {isError && (
          <Alert severity="error">Unable to load notices right now.</Alert>
        )}

        {data && data.length === 0 && (
          <Typography color="text.secondary" textAlign="center" sx={{ py: 6 }}>
            No notices have been posted yet.
          </Typography>
        )}

        <Stack spacing={3}>
          {data?.map((notice) => (
            <Card key={notice._id} variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }} alignItems="center">
                  <Chip label={notice.urgency} size="small" color={urgencyColor(notice.urgency) as any} />
                  <Chip label={notice.category} size="small" variant="outlined" />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(notice.publishedAt || notice.createdAt).toLocaleDateString(undefined, {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </Typography>
                </Stack>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  {notice.title}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: "pre-wrap" }}>
                  {notice.content}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </>
  );
}