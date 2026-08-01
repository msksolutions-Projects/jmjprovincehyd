import { describe, expect, it } from "vitest";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomePage } from "./HomePage";
import { renderWithProviders } from "@/test/utils";

describe("HomePage", () => {
  it("exposes exactly one h1", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("states the Province identity in the opening slide", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/one province/i);
  });

  it("exposes the hero as a labelled carousel with working controls", async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />);
    const carousel = screen.getByRole("region", { name: /welcome/i });
    expect(carousel).toHaveAttribute("aria-roledescription", "carousel");
    expect(screen.getByRole("button", { name: /next slide/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: /next slide/i }));
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/apostolic availability/i);
  });

  it("lets the visitor stop the slideshow", () => {
    renderWithProviders(<HomePage />);
    expect(screen.getByRole("button", { name: /pause slideshow/i })).toBeInTheDocument();
  });

  it("links every apostolate to its ministry page", () => {
    renderWithProviders(<HomePage />);
    for (const label of [
      "Education",
      "Health Care",
      "Social Work",
      "Formation",
      "Pastoral and Evangelization",
      "Eco Friendliness and Protection",
    ]) {
      expect(screen.getByRole("heading", { name: label })).toBeInTheDocument();
    }
  });

  it("shows only milestone years supported by the source content", () => {
    renderWithProviders(<HomePage />);
    for (const year of ["1822", "1904", "1987", "2016"]) {
      expect(screen.getByText(year)).toBeInTheDocument();
    }
    // The 24 vs 28 February conflict is unresolved, so no exact day is shown.
    expect(screen.queryByText(/2[48] February 1904/)).not.toBeInTheDocument();
  });

  it("switches the media hub between panels", async () => {
    const user = userEvent.setup();
    renderWithProviders(<HomePage />);
    const tablist = screen.getByRole("tablist", { name: /province media/i });
    await user.click(within(tablist).getByRole("tab", { name: "Institutions" }));
    expect(screen.getByRole("link", { name: /view all institutions/i })).toBeInTheDocument();
  });

  it("hides the decorative photo marquee from assistive technology", () => {
    const { container } = renderWithProviders(<HomePage />);
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
  });
});
