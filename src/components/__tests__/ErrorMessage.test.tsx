import { render, screen } from "@testing-library/react";

import { expect, describe, it } from "vitest";
import { ErrorMessage } from "../ErrorMessage";

describe("ErrorMessage", () => {
  it("renders error message", () => {
    render(<ErrorMessage message="Error message" />);
    expect(screen.getByText("Error message")).toBeInTheDocument();
  });
  it("renders error icon", () => {
    render(<ErrorMessage message="Error message" />);
    expect(screen.getByTestId("error-icon")).toBeInTheDocument();
  });
});
