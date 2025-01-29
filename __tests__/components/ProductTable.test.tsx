import { render,screen } from "@testing-library/react";
import ProductTable from "../../app/components/ProductTable";
import { ProductTypes } from "../../app/types/productTypes";
import { faker } from "@faker-js/faker";

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
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("when no data is passed and empty products[]", () => {
    render(<ProductTable products={[]} />);
    const noDataTitle = screen.getByTestId("no-data");
    expect(noDataTitle).toBeInTheDocument();
    expect(noDataTitle).toHaveTextContent("No data found");
  });

  test("render datatable with products", () => {
    const mockData: ProductTypes[] = [
      {
        id: parseInt(faker.string.ulid()),
        title: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
      },
    ];
    render(<ProductTable products={mockData} />);
    const dataTable = screen.getByTestId("data-table");
    expect(dataTable).toBeInTheDocument();
    expect(dataTable).toHaveTextContent("Mocked DataTable with 1 products");
  });

  test("Sort dropdown is rendered in product table with default values as empty string ", () => {
    const mockData: ProductTypes[] = [
      {
        id: parseInt(faker.string.ulid()),
        title: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
      },
    ];
    render(<ProductTable products={mockData} />);
    const dropdown = screen.getByTestId("sort-dropdown");
    expect(dropdown).toBeInTheDocument();
    expect(dropdown).toHaveValue("");
  });

  test("Sort dropdown is rendered in product table with options", () => {
    const mockData: ProductTypes[] = [
      {
        id: parseInt(faker.string.ulid()),
        title: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
      },
    ];
    render(<ProductTable products={mockData} />);
    const dropdown = screen.getByTestId("sort-dropdown");
    expect(dropdown).toBeInTheDocument();
    expect(screen.getByText("Sort by price")).toBeInTheDocument();
    expect(screen.getByText("Price: High to Low")).toBeInTheDocument();
    expect(screen.getByText("Price: Low to High")).toBeInTheDocument();
    expect(screen.getByText("Reset")).toBeInTheDocument();
  });

  test("Add button is rendered in product table", () => {
    const mockData: ProductTypes[] = [
      {
        id: parseInt(faker.string.ulid()),
        title: faker.commerce.productName(),
        price: parseInt(faker.commerce.price()),
        description: faker.commerce.productDescription(),
        category: faker.commerce.department(),
      },
    ];
    render(<ProductTable products={mockData} />);
    const addButton = screen.getByTestId("add-button");
    expect(addButton).toBeInTheDocument();
    expect(addButton).toHaveTextContent("Add Product");
  });
});
