import ProductList from "./productList";

export default function ProductGroup() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Our Products</h1>
            <ProductList itemType="pulsa" />
            <div className="my-8" />
            <ProductList itemType="data" />
        </div>
    )
}