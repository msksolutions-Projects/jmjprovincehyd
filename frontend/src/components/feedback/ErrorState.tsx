import { Alert, AlertTitle, Button, Stack } from "@mui/material";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = "This did not load",
  message = "Something went wrong on our side. Please try again in a moment.",
  onRetry,
}: ErrorStateProps) {
  return (
    <Alert severity="error" role="alert">
      <AlertTitle>{title}</AlertTitle>
      <Stack spacing={1.5} alignItems="flex-start">
        <span>{message}</span>
        {onRetry && (
          <Button size="small" variant="outlined" startIcon={<RefreshRoundedIcon />} onClick={onRetry}>
            Try again
          </Button>
        )}
      </Stack>
    </Alert>
  );
}
