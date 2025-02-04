"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ProductTypes } from "@/app/types/productTypes";
import { Button } from "@/components/ui/button";

type ProductDropdownProps = {
  products: ProductTypes[];
  onSelect: (product: ProductTypes) => void;
  onAddNew: (title: string) => void;
};

const ProductDropdown = ({
  products,
  onSelect,
  onAddNew,
}: ProductDropdownProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // set isopen to false when clicked outside the listArea
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.target instanceof HTMLElement &&
        !e.target.closest(".listArea") &&
        !e.target.closest("[data-testid=product-dropdown]")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", onClick);

    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setLoading(false);
      setFilteredProducts([]);
      return;
    }

    setLoading(true);
    const debounceTimeout = setTimeout(() => {
      const matches = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(matches);
      setLoading(false);
    }, 500);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery, products]);

  return (
    <div className="relative inline-block ">
      <Button
        data-testid="product-dropdown"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-700 hover:bg-gray-600 w-full p-5"
      >
        Search Product
        <span>&#11163;</span>
      </Button>

      {isOpen && (
        <div
          data-testid="product-dropdown-list"
          className="absolute mt-0 right-0 w-[350px] bg-gray-700 border shadow-lg p-6 rounded z-10 listArea"
        >
          <Input
            data-testid="product-search-input"
            placeholder="Search product by title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          {loading ? (
            <p data-testid="loader" className="text-gray-500 mt-2">
              Loading...
            </p>
          ) : (
            <ul className="mt-2">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    onClick={() => {
                      onSelect(product);
                      setIsOpen(false);
                    }}
                    className="cursor-pointer p-2 hover:bg-gray-500"
                  >
                    {product.title}
                  </li>
                ))
              ) : (
                <div className="flex  justify-end">
                  <Button
                    onClick={() => {
                      onAddNew(searchQuery);
                      setIsOpen(false);
                    }}
                    className="mt-4 bg-blue-500 text-white"
                  >
                    Add New
                  </Button>
                </div>
              )}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDropdown;
