import type { ProductProps } from "~/type";

export default function ProductCard({
	product,
	width,
	layout,
}: {
	product: ProductProps;
	width?: string;
	layout?: "grid" | "list";
}) {
	const formatter = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0, // Removes .00 if not needed
	});

	return (
		<div>
			<a
				href={`/products/${product.id}`}
				className={`border cursor-pointer flex ${layout === "list" ? "flex-row" : "flex-col"} justify-between rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow ${width || "min-w-60"} ${layout === "list" ? "h-fit" : "h-72"} bg-white`}>
				<div
					className={`flex flex-col gap-2 rounded overflow-hidden ${layout === "list" ? "justify-center" : "mb-3 "} `}>
					<div
						className={`relative ${layout === "list" ? "hidden" : "flex"} w-full h-40 object-cover ${product.itemType === "pulsa" ? "bg-blue-100" : "bg-sky-200"} items-end justify-end text-right`}>
						<div className="absolute w-32 h-32 bg-amber-200/20 -top-10 -left-20 rounded-4xl" />
						<div className="absolute w-32 h-32 bg-amber-200/20 -top-10 -left-10 rounded-4xl" />
						<div>
							<h3 className="font-semibold text-xl truncate">
								{product.itemName}
							</h3>
							<p className="text-gray-600 truncate">{product.duration}</p>
						</div>
					</div>
				</div>
				<div
					className={`flex justify-between ${layout === "list" ? "items-center" : ""}`}>
					<span className="font-bold text-orange-600">
						{formatter.format(product.itemPrice)}
					</span>
					{/* <button
						className={`${layout === "list" ? "hidden" : "flex"} bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700`}>
						Detail
					</button> */}
				</div>
			</a>
		</div>
	);
}
