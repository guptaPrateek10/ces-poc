import Image from "next/image";
import Container from "./components/container/page";
import Heading from "./components/heading/page";
import ProductTable from "./components/ProductTable";
import { ProductTypes } from "./types/productTypes";

export default async function Home () {
  let products: ProductTypes[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  return (
    <Container>
      <Heading title={"Product Table"} />
      <ProductTable products={products}/>
    </Container>
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