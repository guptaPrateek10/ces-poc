import { cleanup, render, screen } from "@testing-library/react";
import { jest } from "@jest/globals";
import Home, { getProducts } from "../app/[lang]/page";


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
    const params = { lang: "en" };
   
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

    render(await Home({ params}));

    const noDataTitle = screen.getByTestId("no-data");
    expect(noDataTitle).toBeInTheDocument();
  });

  //check failure fetch

  it("should handle fetch failure", async () => {
    const params = { lang: "en" };
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
    const params = { lang: "en" };

    const component = render(await Home({params}));
    // Check if the Heading component renders with the correct title
    const childElementHeading = component.getByText("Welcome to POC", {
      exact: true,
    });
    expect(childElementHeading).toBeInTheDocument();
  });


  it("renders the Home component with child ProductTable", async () => {
    const params = { lang: "en" };
    const component = render(await Home({params}));
    // Check if the Heading component renders with the correct title
    const childElementHeading = component.getByText("No data found", {
      exact: true,
    });
    expect(childElementHeading).toBeInTheDocument();
  });
});
