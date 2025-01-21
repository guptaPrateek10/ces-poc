import TableBody from "@/app/components/table/TableBody";
import { ProductTypes } from "@/app/types/productTypes";
import { render, screen } from "@testing-library/react";

describe("Table headers component", () => {
  const products: ProductTypes[] = [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      price: 109.95,
      description:
        "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      category: "men's clothing",
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts ",
      price: 22.3,
      description:
        "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category: "men's clothing",
    },
  ];

  test("render table  rows ", async () => {
    render(<TableBody products={products} />);
    const rows = await screen.getAllByTestId("table-rows");
    expect(rows).toHaveLength(products.length);
  });

  test("render table body content", async () => {
    render(<TableBody products={products} />);
    const tableBody = await screen.getByTestId("table-body");
    expect(tableBody).toBeInTheDocument();

    products.map((product) => {
      expect(tableBody).toHaveTextContent(String(product.id));
      expect(tableBody).toHaveTextContent(product.title);
      expect(tableBody).toHaveTextContent(String(product.price));
      expect(tableBody).toHaveTextContent(product.category);
      expect(tableBody).toHaveTextContent(product.description);
    });
  });

  test("render table boyd with empty [] data", async () => {
    render(<TableBody products={[]} />);
    const rows = await screen.getByTestId("table-body");
    expect(rows).not.toHaveTextContent(String(products[0].id));
  });
});
