import React from "react";
import { ProductTypes } from "../types/productTypes";
import { RECORDSPERPAGE } from "../utils/constants";
type UsePaginateProps = {
  products: ProductTypes[];
  currentPage: number;
};
const UsePaginate = ({ products, currentPage }: UsePaginateProps) => {
  const startIndex = (currentPage - 1) * RECORDSPERPAGE;
  const endIndex = startIndex + RECORDSPERPAGE;
  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / RECORDSPERPAGE);
  return {
    paginatedProducts,
    totalPages,
  };
};

export default UsePaginate;
