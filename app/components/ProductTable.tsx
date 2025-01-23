"use client";
import { useEffect, useState } from "react";
import { ProductTypes } from "../types/productTypes";
import DataTable from "./DataTable";
import Pagination from "./Pagination";

export default function ProductTable({
  products,
}: {
  products: ProductTypes[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const startIndex = (currentPage - 1) * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / recordsPerPage);

  return (
    <div className="p-6">
      {products.length === 0 ? (
        <p data-testid="no-data" className="text-red-500 text-lg">
          No data found
        </p>
      ) : (
        <>
          <DataTable products={paginatedProducts} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
}
