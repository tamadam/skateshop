import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

import Button from "@/app/components/Button/Button";
import { MdFace } from "react-icons/md";

describe("Button component", () => {
  it("Renders a button with the correct props", () => {
    render(
      <Button
        type="submit"
        variant="primary"
        disabled
        className="custom-className"
        Icon={MdFace}
        iconFirst
        colorInvert
      >
        Click me
      </Button>
    );

    const buttonElement = screen.getByRole("button", { name: /Click me/i });

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("custom-className");
    expect(buttonElement).toHaveAttribute("type", "submit");
    expect(buttonElement).toBeDisabled();
  });

  it("Renders a button and simulate an onClick event", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled={false}>
        Click me
      </Button>
    );

    const buttonElement = screen.getByRole("button", { name: /Click me/i });

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalled();
    expect(buttonElement).not.toBeDisabled();
  });
});
