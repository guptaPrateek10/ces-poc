import { render, screen, fireEvent } from "@testing-library/react";
import SortDropdown from "@/app/components/SortDropdown";
import { HIGHTOLOW, LOWTOHIGH, RESET } from "@/app/utils/constants";

describe("SortDropdown Component", () => {
  const mockOnSortChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the dropdown with all options", () => {
    render(<SortDropdown onSortChange={mockOnSortChange} />);

    const dropdown = screen.getByTestId("sort-dropdown");
    expect(dropdown).toBeInTheDocument();

    expect(screen.getByText("Reset")).toBeInTheDocument();
    expect(screen.getByText("Price: High to Low")).toBeInTheDocument();
    expect(screen.getByText("Price: Low to High")).toBeInTheDocument();
  });

  it("calls onSortChange with the correct value when an option is selected", () => {
    render(<SortDropdown onSortChange={mockOnSortChange} />);

    const dropdown = screen.getByTestId("sort-dropdown");

    fireEvent.change(dropdown, { target: { value: HIGHTOLOW } });
    expect(mockOnSortChange).toHaveBeenCalledWith(HIGHTOLOW);
    expect(mockOnSortChange).toHaveBeenCalledTimes(1);

    fireEvent.change(dropdown, { target: { value: LOWTOHIGH } });
    expect(mockOnSortChange).toHaveBeenCalledWith(LOWTOHIGH);
    expect(mockOnSortChange).toHaveBeenCalledTimes(2); // Second call
  });

  it("does not call onSortChange when the default option is selected again", () => {
    render(<SortDropdown onSortChange={mockOnSortChange} />);

    const dropdown = screen.getByTestId("sort-dropdown");

    fireEvent.change(dropdown, { target: { value: RESET } });
    expect(mockOnSortChange).toHaveBeenCalledWith(RESET);
    expect(mockOnSortChange).toHaveBeenCalledTimes(1);
  });
});
