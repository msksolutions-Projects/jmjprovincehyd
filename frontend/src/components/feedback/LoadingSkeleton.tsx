import { Skeleton, Stack } from "@mui/material";

export interface LoadingSkeletonProps {
  rows?: number;
  height?: number;
}

/** Mirrors the shape of the content it stands in for, so nothing shifts on swap. */
export function LoadingSkeleton({ rows = 4, height = 72 }: LoadingSkeletonProps) {
  return (
    <Stack spacing={1.5} aria-busy="true" aria-live="polite" aria-label="Loading">
      {Array.from({ length: rows }, (_, index) => (
        <Skeleton key={index} variant="rounded" height={height} />
      ))}
    </Stack>
  );
}
