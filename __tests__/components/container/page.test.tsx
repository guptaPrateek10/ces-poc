import { render, screen } from "@testing-library/react";
import Container from "../../../app/components/container/page";

describe("Container Component", () => {
    test("renders children inside the container",()=>{
        render(
            <Container>
                <div data-testid="child">Hello World</div>
            </Container>
        );
        const child = screen.getByTestId("child");
        expect(child).toBeInTheDocument();
        expect(child).toHaveTextContent("Hello World");
    })
});