import { ProductTypes } from "../types/productTypes";
import DataTable from "./DataTable";

export default async function ProductTable() {
    let products: ProductTypes[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }


    return (
        <div className="p-6">
            {products.length === 0 ? (
                <p className="text-red-500 text-lg">No data found</p>
            ) : (
               <DataTable products={products} /> 
            )}
        </div>
    );
}


export async function getProducts(): Promise<ProductTypes[]> {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }
    return res.json();
  }