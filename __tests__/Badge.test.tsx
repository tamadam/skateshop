import Badge from "@/app/components/Badge/Badge";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Badge component", () => {
  it("Renders a badge component with the correct props", () => {
    const badgeText = "Admin";

    render(
      <Badge
        label={badgeText}
        variant="admin"
        size="medium"
        weight="semibold"
      />
    );

    const badgeElement = screen.getByText(badgeText);

    expect(badgeElement).toBeInTheDocument();
    expect(badgeElement).toHaveTextContent(badgeText);
  });
});
