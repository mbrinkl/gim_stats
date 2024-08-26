import { render, screen } from "@testing-library/react";
import { SearchBar } from "./SearchBar";
import userEvent from "@testing-library/user-event";

const mockOnChange = vi.fn();

afterEach(() => {
  vi.clearAllMocks();
});

it("should dynamically render clear search button", () => {
  const { rerender } = render(<SearchBar value="" onChange={mockOnChange} />);

  let clearButton = screen.queryByRole("button", { name: "clear-search" });
  expect(clearButton).not.toBeInTheDocument();

  rerender(<SearchBar value="search" onChange={mockOnChange} />);

  clearButton = screen.queryByRole("button", { name: "clear-search" });
  expect(clearButton).toBeInTheDocument();
});

it("should call change handler with empty string on clear search button click", async () => {
  const user = userEvent.setup();

  render(<SearchBar value="test" onChange={mockOnChange} />);

  const clearButton = screen.getByRole("button", { name: "clear-search" });
  await user.click(clearButton);

  expect(mockOnChange).toHaveBeenCalledWith("");
});

it("should call change handler on search change", async () => {
  const user = userEvent.setup();

  render(<SearchBar value="" onChange={mockOnChange} />);

  const searchbar = screen.getByPlaceholderText("Search");
  await user.type(searchbar, "s");

  expect(mockOnChange).toHaveBeenCalledWith("s");
});
