import type { ReactNode } from "react";
import { Box, Divider, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function textFromChildren(children: ReactNode): string {
  if (typeof children === "string" || typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join("");
  return "";
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function ContentMarkdown({ markdown }: { markdown: string }) {
  return (
    <Box sx={{ maxWidth: 860 }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => {
            const label = textFromChildren(children);
            return <Typography id={slugify(label)} variant="h4" component="h2" sx={{ mt: 6, mb: 2, scrollMarginTop: 120 }}>{children}</Typography>;
          },
          h3: ({ children }) => {
            const label = textFromChildren(children);
            return <Typography id={slugify(label)} variant="h5" component="h3" sx={{ mt: 4, mb: 1.5, scrollMarginTop: 120 }}>{children}</Typography>;
          },
          p: ({ children }) => <Typography variant="body1" sx={{ mb: 2.25, color: "text.primary" }}>{children}</Typography>,
          strong: ({ children }) => <Box component="strong" sx={{ fontWeight: 700 }}>{children}</Box>,
          em: ({ children }) => <Box component="em" sx={{ color: "text.secondary" }}>{children}</Box>,
          a: ({ href, children }) => <Link href={href} target={href?.startsWith("http") ? "_blank" : undefined} rel="noreferrer" underline="hover">{children}</Link>,
          ul: ({ children }) => <Box component="ul" sx={{ pl: 3, mt: 1, mb: 2.5, "& li": { mb: 1, pl: .5 } }}>{children}</Box>,
          ol: ({ children }) => <Box component="ol" sx={{ pl: 3, mt: 1, mb: 2.5, "& li": { mb: 1, pl: .5 } }}>{children}</Box>,
          li: ({ children }) => <Typography component="li" variant="body1">{children}</Typography>,
          blockquote: ({ children }) => (
            <Paper variant="outlined" sx={{ my: 3, px: 3, py: 2.5, borderLeft: 5, borderLeftColor: "secondary.main", bgcolor: "rgba(66,122,161,.06)" }}>
              {children}
            </Paper>
          ),
          hr: () => <Divider sx={{ my: 4 }} />,
          table: ({ children }) => <TableContainer component={Paper} variant="outlined" sx={{ my: 3, maxWidth: "100%" }}><Table size="small">{children}</Table></TableContainer>,
          thead: ({ children }) => <TableHead>{children}</TableHead>,
          tbody: ({ children }) => <TableBody>{children}</TableBody>,
          tr: ({ children }) => <TableRow>{children}</TableRow>,
          th: ({ children }) => <TableCell>{children}</TableCell>,
          td: ({ children }) => <TableCell sx={{ verticalAlign: "top", minWidth: 120 }}>{children}</TableCell>,
        }}
      >
        {markdown}
      </ReactMarkdown>
    </Box>
  );
}
