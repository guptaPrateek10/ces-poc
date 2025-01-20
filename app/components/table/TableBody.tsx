import { ProductTypes } from "@/app/types/productTypes";

const TableBody = ({ products }: { products: ProductTypes[] }) => {
  return (
    <tbody>
      {products.map((product) => (
        <tr key={product.id}>
          <td className="border px-4 py-2 text-center">{product.id}</td>
          <td className="border px-4 py-2">{product.title}</td>
          <td className="border px-4 py-2 text-center">${product.price}</td>
          <td className="border px-4 py-2">{product.category}</td>
          <td className="border px-4 py-2">{product.description}</td>
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
