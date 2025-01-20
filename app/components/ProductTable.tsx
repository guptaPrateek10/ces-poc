"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ProductTypes } from "../types/productTypes";
import DataTable from "./DataTable";

export default function ProductTable() {
    const [products, setProducts] = useState<ProductTypes[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProducts = useCallback(async () => {
        try {
            const res = await fetch("/api/products");
            const data = await res.json();
            setProducts(data);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) {
        return <div className="p-4">Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Product List</h1>
            {products.length === 0 ? (
                <p className="text-red-500 text-lg">No data found</p>
            ) : (
               <DataTable products={products} /> 
            )}
        </div>
    );
}
