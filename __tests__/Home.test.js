import { act, render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";  // Adjust this import path if needed
import { jest } from "@jest/globals";


global.fetch = jest.fn() ;
describe("Home Component", () => {
    afterEach(() => {
        jest.clearAllMocks(); 
      });

    test("renders the product list with titles and prices", async () => {
        const mockProducts = [
            {
                id: 1,
                title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
                price: 109.95,
                description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
                category: "men's clothing",

            },
        ];

        //mock fetch api
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve(mockProducts),
            })
        );

        // (global.fetch).mockResolvedValueOnce({
        //     ok: true,
        //     json: async () => mockProducts,
        //   });

        render(await Home());

        // use exact to check the test
    
        const product1Title = await screen.findByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",{ exact: true});
        const product1Price = await screen.findByText("$109.95",{exact: true});
        const productDescription = await screen.findByText("Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",{exact: true});
        const productCategory = await screen.findByText("men's clothing", {exact: true});

        expect(product1Title).toBeInTheDocument();
        expect(productDescription).toBeInTheDocument();
        expect(productCategory).toBeInTheDocument();
        expect(product1Price).toBeInTheDocument();


    });

    test("displays an error message when the API call fails", async () => {
        // Mock fetch to fail
        (global.fetch).mockResolvedValueOnce({
          ok: false, // Simulate failed API response
        });
    
        // Render the Home component
        render(await Home());
    
        // Check for the error message
        const errorMessage = await screen.findByText("No data found", {
          exact: true,
        });
    
        // Assert the error message is shown
        expect(errorMessage).toBeInTheDocument();
      });

});
