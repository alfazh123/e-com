import { useEffect, useState } from "react";
import type { ProductProps } from "~/type";
import ProductCard from "./productCard";
import { CircularProgress } from "@mui/material";

export default function ProductList({
	itemType,
}: {
	itemType: "pulsa" | "data";
}) {
	const [products, setProducts] = useState<ProductProps[]>([]);

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
	}, []);

	return (
		<div className="relative z-10">
			<h2 className="text-2xl font-bold mb-4 text-white">
				{itemType === "pulsa" ? "Pulsa" : "Data"}
			</h2>
			{products.length === 0 ? (
				<p className="text-gray-300 h-72 w-full flex items-center justify-center">
					<CircularProgress size={100} color="inherit" />
				</p>
			) : (
				<div className="flex overflow-x-scroll gap-4 scrollbar">
					{products
						.filter((product) => product.itemType === itemType)
						.map((product, id) => {
							if (id < 4)
								return <ProductCard key={product.id} product={product} />;
						})}
					<a
						href="/products"
						className="group relative flex flex-col overflow-clip justify-center items-center bg-orange-400 text-white rounded-lg p-4 min-w-64 h-72">
						<div className="absolute top-0 -left-10 bg-orange-100/20 w-46 h-28 rounded-full z-30" />
						<div className="absolute top-20 -left-18 bg-orange-300/30 w-32 h-20 rounded-full z-30" />
						<div className="absolute -bottom-4 -right-14 bg-orange-300/30 w-32 h-20 rounded-full z-30" />
						<p className="text-2xl group-hover:italic font-semibold">More</p>
					</a>
				</div>
			)}
		</div>
	);
}