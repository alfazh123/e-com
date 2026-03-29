import { useEffect, useState } from "react";
import type { ProductProps } from "~/type";
import ProductCard from "./productCard";
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import { FormControl, InputLabel, MenuItem, NativeSelect } from "@mui/material";

export default function ProductTemplate({ productType }: { productType: string }) {
    const [products, setProducts] = useState<ProductProps[]>([]);
    const [layout, setLayout] = useState<"grid" | "list">("grid");

    const handleLayoutChange = (event: SelectChangeEvent) => {
        setLayout(event.target.value as "grid" | "list");
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`http://localhost:3000/items`);
                if (response.ok) {
                    const data = await response.json();
                    const filteredProducts = data.filter((product: ProductProps) => product.itemType === productType);
                    setProducts(filteredProducts);
                } else {
                    console.error("Failed to fetch products");
                }
            } catch (error) {
                console.error("Error fetching products:", error);

            }
        };

        fetchProducts();

        return () => {
            setProducts([]);
        }
    }, [productType]);

    return (
        <div className="flex flex-col pt-10">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold mb-6">
                    {productType === "pulsa" ? "Pulsa" : "Data"}
                </h1>
                <div>
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Layout</InputLabel>
                        <Select
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                            value={layout}
                            onChange={handleLayoutChange}
                            sx={{
                                margin: 0,
                            }}
                            >
                            <MenuItem value="grid">Grid</MenuItem>
                            <MenuItem value="list">List</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className={`${layout === "list" ? "flex flex-col" : "grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1"} gap-6`}>
                {products.length <= 0 ? (
                    new Array(4).fill(0).map((_, id) => (
                        <div key={id} className={`animate-pulse bg-gray-200 rounded-lg ${layout === "list" ? "h-24" : "h-72"}`}></div>
                    ))
                ) : products.map((product) => (
                    <ProductCard key={product.id} product={product} width="w-full" layout={layout} />
                )) }
            </div>
        </div> 
    )
}