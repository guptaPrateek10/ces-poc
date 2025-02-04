"use client";
import { useEffect, useState } from "react";
import { ProductTypes } from "../types/productTypes";
import DataTable from "./DataTable";
import Pagination from "./Pagination";
import UsePaginate from "../hooks/UsePaginate";
import SortDropdown from "./SortDropdown";
import { HIGHTOLOW, LOWTOHIGH } from "../utils/constants";
import { Button } from "@/components/ui/button";
import AddProductForm from "./common/AddProductForm";
import ProductDropdown from "./ProductSearch";
export default function ProductTable({
  products,
}: {
  products: ProductTypes[];
}) {
  const [isAddProductFormOpen, setIsAddProductFormOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [title,setTitle] = useState("");
  const [receivedProducts, setReceivedProducts] =
    useState<ProductTypes[]>(products);
  const [renderedProducts, setRenderedProducts] = useState<ProductTypes[]>([]);
  const { paginatedProducts, totalPages } = UsePaginate({
    products: receivedProducts,
    currentPage,
  });

  const handleSortChange = (sortOrder: string) => {
    let sortedData = [...receivedProducts];

    if (sortOrder === HIGHTOLOW) {
      sortedData.sort((a, b) => b.price - a.price); // Sort by price descending
    } else if (sortOrder === LOWTOHIGH) {
      sortedData.sort((a, b) => a.price - b.price); // Sort by price ascending
    } else {
      sortedData = [...products]; // Reset to default
    }

    setReceivedProducts(sortedData);
  };

  useEffect(() => {
    setRenderedProducts(paginatedProducts);

    return () => {
      setRenderedProducts([]);
    };
  }, [currentPage, receivedProducts]);

  const handleAddProduct = (newProduct: ProductTypes) => {
    setReceivedProducts((prev) => [...prev, newProduct]);
  };

  const toggleAddProductForm = () => {
    setIsAddProductFormOpen(!isAddProductFormOpen);
  }

  const handleOnSelect = (product:ProductTypes)=>{
    setReceivedProducts([product]);
  }
  const toggleResetProductList = () => {
    setReceivedProducts([...products]);
  }
  const handleAddNew = async(title:string)=>{
    await setTitle(title);
    setIsAddProductFormOpen(true);
  }
  return (
    <div className="p-6 ">
      {products.length === 0 ? (
        <p data-testid="no-data" className="text-red-500 text-lg">
          No data found
        </p>
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <Button onClick={toggleAddProductForm} data-testid="add-button" className="bg-gray-700 hover:bg-slate-500 p-4">
              Add Product
            </Button>
            <ProductDropdown products={products} onSelect={handleOnSelect} onAddNew={handleAddNew} />
            <SortDropdown onSortChange={handleSortChange} />
            <Button onClick={toggleResetProductList} data-testid="reset-button" className="bg-gray-700 hover:bg-slate-500 p-4">
              Reset Product List
            </Button>
          </div>
          <DataTable products={renderedProducts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
          {isAddProductFormOpen && (
            <AddProductForm
              onSubmit={handleAddProduct}
              onClose={toggleAddProductForm}
              title={title}
            />
          )}
        </>
      )}
    </div>
  );
}
