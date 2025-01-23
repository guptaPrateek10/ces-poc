import { ProductTypes } from "@/app/types/productTypes";

const TableBody = ({ products }: { products: ProductTypes[] }) => {
  const tableBodyId = "table-body";
  const tableRowsId = "table-rows";
  return (
    <tbody data-testid={tableBodyId}>
      {products.map((product) => (
        <tr key={product.id } data-testid={tableRowsId} >
          <td data-testid="product-id" className="border px-4 py-2 text-center">{product.id}</td>
          <td data-testid="product-title" className="border px-4 py-2">{product.title}</td>
          <td className="border px-4 py-2 text-center">${product.price}</td>
          <td className="border px-4 py-2">{product.category}</td>
          <td className="border px-4 py-2">{product.description}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
