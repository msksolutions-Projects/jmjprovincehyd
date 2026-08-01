import { describe, expect, it } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SiteHeader } from "./SiteHeader";
import { renderWithProviders } from "@/test/utils";

describe("SiteHeader", () => {
  it("renders the main navigation landmark", () => {
    renderWithProviders(<SiteHeader />);
    expect(screen.getAllByRole("navigation", { name: /main/i }).length).toBeGreaterThan(0);
  });

  it("marks menu buttons as collapsed until opened", () => {
    renderWithProviders(<SiteHeader />);
    const button = screen.getByRole("button", { name: "Who We Are" });
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("opens a submenu and exposes its items", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: "Who We Are" }));
    await waitFor(() => expect(screen.getByRole("menuitem", { name: /our founder/i })).toBeVisible());
  });

  it("opens the search dialog from the toolbar button", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: /open search/i }));
    await waitFor(() => expect(screen.getByLabelText(/search this website/i)).toBeInTheDocument());
  });

  it("opens the mobile drawer with grouped navigation", async () => {
    const user = userEvent.setup();
    renderWithProviders(<SiteHeader />);
    await user.click(screen.getByRole("button", { name: /open navigation menu/i }));
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /close navigation menu/i })).toBeInTheDocument(),
    );
  });
});
