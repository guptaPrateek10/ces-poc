import { cleanup, render, screen } from "@testing-library/react";
import { jest } from "@jest/globals";
import Home, { getProducts } from "../app/page";


describe("Home  Component Tesing", () => {
  beforeEach(() => {
    //Mock base url
    process.env.NEXT_PUBLIC_BASE_URL = "http://localhost:3000";
    URL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`;
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  it("should handle successful fetch", async () => {
    const mockData = [
      {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
        price: 109.95,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
      },
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockData),
    });

    const result = await getProducts();
    expect(result).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products`,
      { cache: "no-store" }
    );
    expect(global.fetch).toHaveBeenCalledTimes(1);

    render(await Home());

    const noDataTitle = screen.getByTestId("no-data");
    expect(noDataTitle).toBeInTheDocument();
    // const product1Title = await screen.findByText(
    //   "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    //   { exact: true }
    // );
    // const product1Price = await screen.findByText("$109.95", { exact: true });
    // const productDescription = await screen.findByText(
    //   "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    //   { exact: true }
    // );
    // const productCategory = await screen.findByText("men's clothing", {
    //   exact: true,
    // });

    // expect(product1Title).toBeInTheDocument();
    // expect(productDescription).toBeInTheDocument();
    // expect(productCategory).toBeInTheDocument();
    // expect(product1Price).toBeInTheDocument();
  });

  //check failure fetch

  it("should handle fetch failure", async () => {
    // Mock failure response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    await expect(getProducts(URL)).rejects.toThrow("Failed to fetch products");
    expect(global.fetch).toHaveBeenCalledWith(`${URL}`, { cache: "no-store" });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("should handle fetch network error", async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
    });
    await expect(getProducts()).rejects.toThrow("Failed to fetch products");
    expect(global.fetch).toHaveBeenCalledWith(`${URL}`, {
      cache: "no-store",
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("renders the Home component with child Heading ", async () => {
    const component = render(await Home());
    console.log(component);
    // Check if the Heading component renders with the correct title
    const childElementHeading = component.getByText("Product Table", {
      exact: true,
    });
    expect(childElementHeading).toBeInTheDocument();
  });


  it("renders the Home component with child ProductTable", async () => {
    const component = render(await Home());
    console.log(component);
    // Check if the Heading component renders with the correct title
    const childElementHeading = component.getByText("No data found", {
      exact: true,
    });
    expect(childElementHeading).toBeInTheDocument();
  });
});
