import { useQuery } from "@tanstack/react-query";
import {
  Box, Container, Typography, Card, CardContent, Chip, Stack,
  CircularProgress, Alert,
} from "@mui/material";
import { PageHeader } from "@/components/common/PageHeader";
import { Seo } from "@/components/seo/Seo";
import { fetchPublishedNews } from "@/features/news/news.service";

export function NewsPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["public-news"],
    queryFn: fetchPublishedNews,
  });

  return (
    <>
      <Seo title="News & Updates" description="Latest news from JMJ Hyderabad Province" />
      <PageHeader
        eyebrow="Media"
        title="News & Updates"
        description="The latest happenings across our province and institutions."
      />
      <Container sx={{ py: 5 }}>
        {isLoading && (
          <Box sx={{ textAlign: "center", py: 6 }}>
            <CircularProgress />
          </Box>
        )}

        {isError && (
          <Alert severity="error">
            Unable to load news right now. Please try again later.
          </Alert>
        )}

        {data && data.length === 0 && (
          <Typography color="text.secondary" textAlign="center" sx={{ py: 6 }}>
            No news articles have been published yet.
          </Typography>
        )}

        <Stack spacing={3}>
          {data?.map((article) => (
            <Card key={article._id} variant="outlined">
              <CardContent>
                <Stack direction="row" spacing={1} sx={{ mb: 1 }} alignItems="center">
                  <Chip label={article.category} size="small" color="primary" />
                  <Typography variant="caption" color="text.secondary">
                    {new Date(article.publishedAt || article.createdAt).toLocaleDateString(undefined, {
                      year: "numeric", month: "long", day: "numeric",
                    })}
                  </Typography>
                </Stack>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  {article.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                  {article.excerpt}
                </Typography>
                <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                  {article.content}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </>
  );
}