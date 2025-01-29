import { fireEvent, render,screen, waitFor } from "@testing-library/react";
import ProductTable from "../../app/components/ProductTable";
import { ProductTypes } from "../../app/types/productTypes";
import { faker, fi } from "@faker-js/faker";

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

});

describe("ProductTable rendered and testing react hook form", () => {
  it("should render the ProductTable component with add product button", () => {
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

  it("test if click on add product button will open the add product form", () => {
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
  fireEvent.click(addButton);

  const formTitle = screen.getByText("Add New Product");
  expect(formTitle).toBeInTheDocument();
  });

  it("validates form field before form submission", () => {
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
    fireEvent.click(screen.getByTestId("add-button"));

    fireEvent.click(screen.getByTestId("submit-button"));
    expect(screen.getByText("Title is required")).toBeInTheDocument();
    expect(screen.getByText("Price is required")).toBeInTheDocument();
    expect(screen.getByText("Description is required")).toBeInTheDocument();
    expect(screen.getByText("Category is required")).toBeInTheDocument();

  });

  it("should submit the form when all fields are filled", async() => {
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
    fireEvent.click(screen.getByTestId("add-button"));

    fireEvent.change(screen.getByLabelText("Title"),{target:{value: "Product C"}});
    fireEvent.change(screen.getByLabelText("Price"), { target: { value: "150" } });
    fireEvent.change(screen.getByLabelText("Description"), { target: { value: "New Product" } });
    fireEvent.change(screen.getByLabelText("Category"), { target: { value: "Category C" } });


    fireEvent.click(screen.getByTestId("submit-button"));
    await waitFor(() => {
      expect(screen.getByText("Product C")).toBeInTheDocument();
    });
  })
});
