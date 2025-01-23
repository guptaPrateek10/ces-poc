import TableHeaders from "@/app/components/table/TableHeaders";
import { TableHeadersProps } from "@/app/types/productTypes";
import { render, screen } from "@testing-library/react";

describe("Table headers component", () => {
  const tableProps: TableHeadersProps  = [
    "ID",
    "Title",
    "Price",
    "Category",
    "Description",
  ] ;

  test("render all table headers ", async () => {
    render(<TableHeaders tableProps={tableProps} />);
    tableProps.map((header) => {
      const headerElement = screen.getByText(header);
      expect(headerElement).toBeInTheDocument();
      expect(headerElement).toHaveTextContent(header);
    });
    const allHeaders = await screen.getAllByTestId("table-header");
    expect(allHeaders).toHaveLength(tableProps.length);
  });

  test("render table headers with empty [] data", async () => {
    render(<TableHeaders tableProps={[]} />);
    const headers = await screen.queryAllByTestId("table-header");
    expect(headers).toHaveLength(0);
  })
});
