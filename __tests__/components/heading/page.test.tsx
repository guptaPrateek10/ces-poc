import { render, screen,cleanup } from "@testing-library/react";
import Heading from "../../../app/components/heading/page";

afterAll(cleanup);

describe("Heading Component", () => {
    test("renders the Heading component with the correct title", async () => {
        render(<Heading title="Product Table" />);
    
        const heading = screen.getByText("Product Table", { exact: true });
        expect(heading).toBeInTheDocument();
    });
});