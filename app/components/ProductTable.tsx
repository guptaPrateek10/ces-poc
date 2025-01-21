import { ProductTypes } from "../types/productTypes";
import DataTable from "./DataTable";

export default function ProductTable({ products }: { products: ProductTypes[] }) {

    return (
        <div className="p-6">
            {products.length === 0 ? (
                <p data-testid="no-data" className="text-red-500 text-lg">No data found</p>
            ) : (
               <DataTable products={products} /> 
            )}
        </div>
    );
}


