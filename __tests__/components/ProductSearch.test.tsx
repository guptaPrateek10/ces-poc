import ProductSearch from "@/app/components/ProductSearch";
import { ProductTypes } from "@/app/types/productTypes";
import { faker } from "@faker-js/faker";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// create mock list using faker
const mockProductList: ProductTypes[] = [
  {
    id: parseInt(faker.string.ulid()),
    title: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
  },
  {
    id: parseInt(faker.string.ulid()),
    title: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
  },
  {
    id: parseInt(faker.string.ulid()),
    title: faker.commerce.productName(),
    price: parseInt(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
  },
];

describe("Product Search using Dropdown search", () => {
  it("renders the dropdown button", () => {
    render(
      <ProductSearch
        products={mockProductList}
        onSelect={jest.fn()}
        onAddNew={jest.fn()}
      />
    );
    const dropdown = screen.getByTestId("product-dropdown");
    expect(dropdown).toBeInTheDocument();
  });

  it("open the dialog when clicked on button", () => {
    render(
      <ProductSearch
        products={mockProductList}
        onSelect={jest.fn()}
        onAddNew={jest.fn()}
      />
    );

    fireEvent.click(screen.getByTestId("product-dropdown"));
    expect(screen.getByTestId("product-dropdown-list")).toBeInTheDocument();
  });

  it("update input field with typing", () => {
    render(
      <ProductSearch
        products={mockProductList}
        onSelect={jest.fn()}
        onAddNew={jest.fn()}
      />
    );
    fireEvent.click(screen.getByTestId("product-dropdown"));
    const input = screen.getByTestId("product-search-input");
    fireEvent.change(input, { target: { value: "product" } });
    expect(input).toHaveValue("product");
  });

  it("show loader whlie searching", async () => {
    render(
      <ProductSearch
        products={mockProductList}
        onSelect={jest.fn()}
        onAddNew={jest.fn()}
      />
    );
    fireEvent.click(screen.getByTestId("product-dropdown"));
    const input = screen.getByTestId("product-search-input");
    fireEvent.change(input, { target: { value: "product" } });
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("show filtered products", async () => {
    render(
      <ProductSearch
        products={mockProductList}
        onSelect={jest.fn()}
        onAddNew={jest.fn()}
      />
    );
    fireEvent.click(screen.getByTestId("product-dropdown"));
    const input = screen.getByTestId("product-search-input");
    fireEvent.change(input, { target: { value: "productA" } });
    await waitFor(() => {
      expect(input).toHaveValue("productA");
    });
  });
  it("shows 'Add New' button when no product is found", async () => {
    render(<ProductSearch products={mockProductList} onSelect={jest.fn()} onAddNew={jest.fn()} />);

    fireEvent.click(screen.getByTestId("product-dropdown"));
    const input = screen.getByTestId("product-search-input");

    fireEvent.change(input, { target: { value: "Non-Existing Product" } });

    await waitFor(() => {
      expect(screen.getByText("Add New")).toBeInTheDocument();
    });
  });
  
  it("calls onAddNew when 'Add New' button is clicked", async () => {
    const mockOnAddNew = jest.fn();
    
    render(<ProductSearch products={mockProductList} onSelect={jest.fn()} onAddNew={mockOnAddNew} />);
    
    fireEvent.click(screen.getByTestId("product-dropdown"));
    const input = screen.getByTestId("product-search-input");

    fireEvent.change(input, { target: { value: "Non-Existing Product" } });

    await waitFor(() => {
      fireEvent.click(screen.getByText("Add New"));
    });

    expect(mockOnAddNew).toHaveBeenCalledWith("Non-Existing Product");
  });
});
