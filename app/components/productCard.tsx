import type { ProductType } from "~/type";

export default function ProductCard({ product}: { product: ProductType }) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0, // Removes .00 if not needed
    });

    return (
			<div className="border flex flex-col justify-between rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow min-w-64 h-72 bg-white">
				<div className="flex flex-col gap-2 mb-3 rounded overflow-hidden">
					<div className="w-full h-40 object-cover bg-gray-200" />
					<h3 className="font-semibold text-lg truncate">{product.itemName}</h3>
				</div>
				<div className="flex justify-between ">
					<span className="font-bold text-orange-600">
						{formatter.format(product.itemPrice)}
					</span>
					<button className="bg-orange-600 text-white px-3 py-1 rounded hover:bg-orange-700">
						Detail
					</button>
				</div>
			</div>
		);
}