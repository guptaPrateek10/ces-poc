import React from 'react'
import { ProductTypes } from '../types/productTypes'

type productsProps = {
    products: ProductTypes[]
}
const DataTable = (props:productsProps) => {
    const { products } = props;
    return (
        <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-700">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Title</th>
                    <th className="border px-4 py-2">Price</th>
                    <th className="border px-4 py-2">Category</th>
                    <th className="border px-4 py-2">Description</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td className="border px-4 py-2 text-center">{product.id}</td>
                        <td className="border px-4 py-2">{product.title}</td>
                        <td className="border px-4 py-2 text-center">${product.price}</td>
                        <td className="border px-4 py-2">{product.category}</td>
                        <td className="border px-4 py-2">{product.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default DataTable
