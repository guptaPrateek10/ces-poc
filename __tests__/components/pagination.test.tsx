import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/app/components/Pagination";
import { ARROWS, BUTTON } from "@/app/utils/constants";

describe("Pagination Component", () => {
  it("renders the correct number of page buttons", () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={jest.fn()} />);

    const pageButtons = screen.getAllByRole(BUTTON, { name: /\d+/ });
    expect(pageButtons).toHaveLength(3); // 3 pages
  });

  it("disables the 'Previous' button on the first page", () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={jest.fn()} />);

    const previousButton = screen.getByText(ARROWS.LEFT);
    expect(previousButton).toBeDisabled();
  });

  it("disables the 'Next' button on the last page", () => {
    render(<Pagination currentPage={3} totalPages={3} onPageChange={jest.fn()} />);

    const nextButton = screen.getByText(ARROWS.RIGHT);
    expect(nextButton).toBeDisabled();
  });

  it("calls onPageChange with the correct page number when a page button is clicked", () => {
    const mockOnPageChange = jest.fn();
    render(<Pagination currentPage={1} totalPages={3} onPageChange={mockOnPageChange} />);

    const page2Button = screen.getByText("2");
    fireEvent.click(page2Button);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange when 'Next' or 'Previous' is clicked", () => {
    const mockOnPageChange = jest.fn();
    render(<Pagination currentPage={2} totalPages={3} onPageChange={mockOnPageChange} />);

    const nextButton = screen.getByText(ARROWS.RIGHT);
    const previousButton = screen.getByText(ARROWS.LEFT);

    fireEvent.click(nextButton);
    fireEvent.click(previousButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3); 
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });
});
