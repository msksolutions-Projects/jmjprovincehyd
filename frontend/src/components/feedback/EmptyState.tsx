import type { ReactNode } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import InboxRoundedIcon from "@mui/icons-material/InboxRounded";

export interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}

/** Says what is missing in the reader's words and offers the next step. */
export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <Paper variant="outlined" sx={{ px: 3, py: { xs: 5, md: 8 }, textAlign: "center" }}>
      <Stack spacing={2} alignItems="center">
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            bgcolor: "action.hover",
            color: "secondary.main",
          }}
        >
          {icon ?? <InboxRoundedIcon />}
        </Box>
        <Typography variant="h4" component="p">
          {title}
        </Typography>
        {description && (
          <Typography color="text.secondary" sx={{ maxWidth: 460 }}>
            {description}
          </Typography>
        )}
        {action}
      </Stack>
    </Paper>
  );
}
