import { render, screen, fireEvent } from "@testing-library/react";
import SortDropdown from "@/app/components/SortDropdown";

describe("SortDropdown Component", () => {
  const mockOnSortChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the dropdown with all options", () => {
    render(<SortDropdown onSortChange={mockOnSortChange} />);

    const dropdown = screen.getByTestId("sort-dropdown");
    expect(dropdown).toBeInTheDocument();

    expect(dropdown).toHaveValue("reset");

    expect(screen.getByText("reset")).toBeInTheDocument();
    expect(screen.getByText("Price: High to Low")).toBeInTheDocument();
    expect(screen.getByText("Price: Low to High")).toBeInTheDocument();
  });

  it("calls onSortChange with the correct value when an option is selected", () => {
    render(<SortDropdown onSortChange={mockOnSortChange} />);

    const dropdown = screen.getByTestId("sort-dropdown");

    fireEvent.change(dropdown, { target: { value: "highToLow" } });
    expect(mockOnSortChange).toHaveBeenCalledWith("highToLow");
    expect(mockOnSortChange).toHaveBeenCalledTimes(1);

    fireEvent.change(dropdown, { target: { value: "lowToHigh" } });
    expect(mockOnSortChange).toHaveBeenCalledWith("lowToHigh");
    expect(mockOnSortChange).toHaveBeenCalledTimes(2); // Second call
  });

  it("does not call onSortChange when the default option is selected again", () => {
    render(<SortDropdown onSortChange={mockOnSortChange} />);

    const dropdown = screen.getByTestId("sort-dropdown");

    fireEvent.change(dropdown, { target: { value: "reset" } });
    expect(mockOnSortChange).toHaveBeenCalledWith("reset");
    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
  });
});
