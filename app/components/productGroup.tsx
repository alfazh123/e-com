import ProductList from "./productList";

export default function ProductGroup() {
    return (
			<div className="w-full max-w-6xl mx-auto overflow-clip md:p-8 p-4 bg-blue-950 md:rounded-2xl my-20">
				<div className="relative ">
					<div className="bg-blue-500/30 h-96 w-80 absolute -top-60 -left-10 z-0 rounded-full" />
					<div className="bg-blue-200/30 h-62 w-62 absolute top-10 left-10 z-0 rounded-full" />
					<ProductList itemType="pulsa" />
					<div className="my-8" />
					<ProductList itemType="data" />
					<div className="bg-blue-500/30 h-96 w-80 absolute -bottom-40 -right-10 z-0 rounded-full" />
					<div className="bg-blue-200/30 h-62 w-62 absolute bottom-20 right-20 z-0 rounded-full" />
				</div>
			</div>
		);
}