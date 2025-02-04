"use client";
import React from "react";
import { ProductTypes, TableHeadersProps } from "../types/productTypes";
import TableHeaders from "./table/TableHeaders";
import TableBody from "./table/TableBody";

type productsProps = {
  products: ProductTypes[];
};

const DataTable = (props: productsProps) => {
  const { products } = props;
  const tableProps: TableHeadersProps = [
    "ID",
    "Title",
    "Price",
    "Category",
    "Description",
  ];
  return (
    <table dat-testid="data-table" className="table-auto w-full border-collapse border border-gray-300">
      <TableHeaders tableProps={tableProps} />
      <TableBody products={products} />
    </table>
  );
};

export default DataTable;
