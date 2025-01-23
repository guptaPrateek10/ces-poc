import { render, screen } from "@testing-library/react";
import DataTable from "@/app/components/DataTable";
import { ProductTypes, TableHeadersProps } from "@/app/types/productTypes";

jest.mock("../../app/components/table/TableHeaders", () => {
  return function MockTableHeaders({
    tableProps,
  }: {
    tableProps: TableHeadersProps[];
  }) {
    return (
      <thead data-testid="table-headers">
        <tr>
          {tableProps.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
    );
  };
});

jest.mock("../../app/components/table/TableBody", () => {
  return function MockTableBody({ products }: { products: ProductTypes[] }) {
    return (
      <tbody data-testid="table-body">
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>{product.category}</td>
            <td>{product.description}</td>
          </tr>
        ))}
      </tbody>
    );
  };
});

describe("DataTable Component", () => {
  const mockProducts: ProductTypes[] = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
    },
  ];

  it("renders TableHeaders with the correct headers", () => {
    render(<DataTable products={mockProducts} />);

    const tableHeaders = screen.getByTestId("table-headers");
    expect(tableHeaders).toBeInTheDocument();
    expect(tableHeaders).toHaveTextContent("ID");
    expect(tableHeaders).toHaveTextContent("Title");
    expect(tableHeaders).toHaveTextContent("Price");
    expect(tableHeaders).toHaveTextContent("Category");
    expect(tableHeaders).toHaveTextContent("Description");
  });

  it("renders TableBody with the correct product data", () => {
    render(<DataTable products={mockProducts} />);

    const tableBody = screen.getByTestId("table-body");
    expect(tableBody).toBeInTheDocument();

    // Verify products are rendered
    mockProducts.forEach((product) => {
      expect(tableBody).toHaveTextContent(String(product.id));
      expect(tableBody).toHaveTextContent(product.title);
      expect(tableBody).toHaveTextContent(String(product.price));
      expect(tableBody).toHaveTextContent(product.category);
      expect(tableBody).toHaveTextContent(product.description);
    });
  });
});
