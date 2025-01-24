import Image from "next/image";
import Container from "../components/container/page";
import Heading from "../components/heading/page";
import ProductTable from "../components/ProductTable";
import { ProductTypes } from "../types/productTypes";
import { getDictionary } from "./dictionaries";
import Link from "next/link";

export default async function Home({
  params 
}: {
  params: Promise<{ lang: "en" | "nl" }>;
}) {
  let products: ProductTypes[] = [];

  try {
    products = await getProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
  }
  const languange = (await params).lang;
  const dictionary = await getDictionary(languange); // en

  return (
    <Container>
      {/* create button dropdown for serever side rendering */}
      <nav className="flex justify-between items-center gap-4 py-4">
        <Link href="/en">English</Link>
        <Link href="/nl">Dutch</Link>
      </nav>
      <h1 className="text-4xl font-bold text-center my-8">
      {dictionary.Home.title}
      </h1>
      <Heading title={dictionary.Heading.title} lang={languange}  />
      <ProductTable products={products} />
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
