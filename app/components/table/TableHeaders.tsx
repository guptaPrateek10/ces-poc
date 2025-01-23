import { TableHeadersProps } from "@/app/types/productTypes";

const TableHeaders = ({ tableProps }: { tableProps: TableHeadersProps }) => {
  const dataTestID = "table-header";
  return (
    <thead>
      <tr className="bg-gray-700">
        {Array.isArray(tableProps) &&
          tableProps.map((header, index) => (
            <th
              data-testid={dataTestID}
              key={index}
              className="border px-4 py-2"
            >
              {header}
            </th>
          ))}
      </tr>
    </thead>
  );
};

export default TableHeaders;
