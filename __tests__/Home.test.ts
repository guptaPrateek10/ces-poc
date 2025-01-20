import { act, render, screen, waitFor } from "@testing-library/react";
import Home from "@/app/page";  // Adjust this import path if needed
import { jest } from "@jest/globals";


global.fetch = jest.fn() as jest.MockedFunction<typeof fetch>;
describe("Home Component", () => {

    test("renders the product list with titles and prices", async () => {
        // Define mock products data
        // axios.get = jest.fn();

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

        render(await Home());

        const product1Title = await screen.findByText(/Fjallraven/i);
        const product1Price = await screen.findByText("$109.95");
        const productDescription = await screen.findByText(/Your perfect pack for everyday use and walks in the forest/i);
        const productCategory = await screen.findByText(/men's clothing/i);

        expect(product1Title).toBeInTheDocument();
        expect(productDescription).toBeInTheDocument();
        expect(productCategory).toBeInTheDocument();
        expect(product1Price).toBeInTheDocument();


    });

});
