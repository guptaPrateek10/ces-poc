import { render, screen } from "@testing-library/react";
import ProductTable from "../../app/components/ProductTable";
import { ProductTypes } from "../../app/types/productTypes";

jest.mock("../../app/components/DataTable", () => {
  return function MockDataTable({ products }: { products: ProductTypes[] }) {
    return (
      <div data-testid="data-table">
        Mocked DataTable with {products.length} products
      </div>
    );
  };
});
describe("ProductTable Component Testing", () => {
  test("when no data is passed and empty products[]", () => {
    render(<ProductTable products={[]} />);
    const noDataTitle = screen.getByTestId("no-data");
    expect(noDataTitle).toBeInTheDocument();
    expect(noDataTitle).toHaveTextContent("No data found");
  });

  test("render datatable with products", () => {
    const mockData: ProductTypes[] = [
      {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
      },
    ];
    render(<ProductTable products={mockData} />);
    const dataTable = screen.getByTestId("data-table");
    expect(dataTable).toBeInTheDocument();
    expect(dataTable).toHaveTextContent("Mocked DataTable with 1 products");
  
  });
});
