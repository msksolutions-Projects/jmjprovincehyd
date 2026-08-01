import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";
import { Button, Container, Typography } from "@mui/material";

interface Props { children: ReactNode }
interface State { hasError: boolean }
export class AppErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(): State { return { hasError: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error("Application error", error, info); }
  render() {
    if (this.state.hasError) return <Container sx={{ py: 12, textAlign: "center" }}><Typography variant="h3">Something went wrong</Typography><Typography color="text.secondary" sx={{ mt: 2 }}>The page could not be displayed. Please reload and try again.</Typography><Button variant="contained" sx={{ mt: 3 }} onClick={() => window.location.reload()}>Reload page</Button></Container>;
    return this.props.children;
  }
}
