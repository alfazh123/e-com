import { useEffect, useState } from "react";
import type { ProductType } from "~/type";
import ProductCard from "./productCard";

export default function ProductList({itemType}: {itemType: "pulsa" | "data"}) {
    const [products, setProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/items`);
                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    console.error("Failed to fetch products");
                }
            } catch (error) {
                console.error("An error occurred while fetching products:", error);
            }
        };

        fetchProducts();
        return () => {
            setProducts([]);
        };
    },[])

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">{itemType === "pulsa" ? "Pulsa" : "Data"}</h2>
            <div className="flex overflow-x-scroll gap-4 scrollbar">
                {products.filter((product) => product.itemType === itemType).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    )
}